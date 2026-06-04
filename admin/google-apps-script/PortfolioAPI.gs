/**
 * Portfolio Admin API — Google Sheets
 * 1. Créer une feuille Google + ce script (Extensions → Apps Script OU script.google.com)
 * 2. Propriété SPREADSHEET_ID = id de la feuille (si script ouvert hors Extensions)
 * 3. Exécuter setupSheets une fois
 * 4. Propriétés du script : ADMIN_PASSWORD = votre mot de passe admin
 * 4. Déployer → Application web → Exécuter en tant que moi → Accès : Tout le monde
 * 5. Copier l'URL dans js/portfolio-api-config.js → baseUrl
 */

var SHEET_CONTACTS = 'Contacts';
var SHEET_VISITS = 'Visits';
var TOKEN_TTL = 86400;

/** Feuille liée au script OU ouverte via SPREADSHEET_ID (propriété du script). */
function getSpreadsheet_() {
  var id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (id) {
    return SpreadsheetApp.openById(id);
  }
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error('Aucune feuille active. Ajoutez SPREADSHEET_ID dans les propriétés du script (voir SETUP-GOOGLE.md).');
  }
  return ss;
}

function setupSheets() {
  var ss = getSpreadsheet_();
  ensureSheet_(ss, SHEET_CONTACTS, [
    'id', 'created_at', 'source', 'name', 'email', 'phone', 'company',
    'subject', 'message', 'location', 'service', 'budget', 'timeline',
    'project_details', 'status'
  ]);
  ensureSheet_(ss, SHEET_VISITS, [
    'id', 'created_at', 'session_id', 'page_path', 'page_title',
    'referrer', 'referrer_channel', 'user_agent', 'language'
  ]);
}

function ensureSheet_(ss, name, headers) {
  var sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  if (sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, headers.length).setValues([headers]);
    sh.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
}

function doGet(e) {
  return handleRequest_(e);
}

function doPost(e) {
  return handleRequest_(e);
}

function handleRequest_(e) {
  try {
    var body = {};
    if (e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    } else if (e.parameter && e.parameter.action) {
      body = e.parameter;
    }
    var action = body.action;
    var result;

    switch (action) {
      case 'login':
        result = actionLogin_(body.password);
        break;
      case 'contact':
        result = actionContact_(body);
        break;
      case 'visit':
        result = actionVisit_(body);
        break;
      case 'data':
        result = actionData_(body.token);
        break;
      case 'updateStatus':
        result = actionUpdateStatus_(body.token, body.id, body.status);
        break;
      case 'logout':
        result = actionLogout_(body.token);
        break;
      case 'sendCampaign':
        result = actionSendCampaign_(body.token, body);
        break;
      default:
        result = { error: 'Action inconnue' };
    }

    return jsonResponse_(result);
  } catch (err) {
    return jsonResponse_({ error: String(err.message || err) });
  }
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function actionLogin_(password) {
  var expected = PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD');
  if (!expected) {
    return { error: 'ADMIN_PASSWORD non défini dans les propriétés du script' };
  }
  if (!password || password !== expected) {
    return { error: 'Mot de passe incorrect' };
  }
  var token = Utilities.getUuid();
  CacheService.getScriptCache().put('tok_' + token, '1', TOKEN_TTL);
  return { ok: true, token: token };
}

function isValidToken_(token) {
  if (!token) return false;
  return CacheService.getScriptCache().get('tok_' + token) === '1';
}

function actionContact_(body) {
  var ss = getSpreadsheet_();
  var sh = ss.getSheetByName(SHEET_CONTACTS);
  if (!sh) setupSheets();
  sh = ss.getSheetByName(SHEET_CONTACTS);

  var id = Utilities.getUuid();
  var now = new Date().toISOString();
  sh.appendRow([
    id, now,
    sanitize_(body.source, 20) || 'form',
    sanitize_(body.name, 200),
    sanitize_(body.email, 200),
    sanitize_(body.phone, 50),
    sanitize_(body.company, 300),
    sanitize_(body.subject, 300),
    sanitize_(body.message, 8000),
    sanitize_(body.location, 200),
    sanitize_(body.service, 80),
    sanitize_(body.budget, 40),
    sanitize_(body.timeline, 40),
    sanitize_(body.project_details, 8000),
    'nouveau'
  ]);
  return { ok: true, id: id };
}

function actionVisit_(body) {
  var ss = getSpreadsheet_();
  var sh = ss.getSheetByName(SHEET_VISITS);
  if (!sh) setupSheets();
  sh = ss.getSheetByName(SHEET_VISITS);

  sh.appendRow([
    Utilities.getUuid(),
    new Date().toISOString(),
    sanitize_(body.session_id, 80),
    sanitize_(body.page_path, 500),
    sanitize_(body.page_title, 300),
    sanitize_(body.referrer, 500),
    sanitize_(body.referrer_channel, 40),
    sanitize_(body.user_agent, 500),
    sanitize_(body.language, 20)
  ]);
  return { ok: true };
}

function actionData_(token) {
  if (!isValidToken_(token)) {
    return { error: 'Session expirée — reconnectez-vous' };
  }
  return {
    ok: true,
    contacts: readSheetAsObjects_(SHEET_CONTACTS),
    visits: readSheetAsObjects_(SHEET_VISITS)
  };
}

function actionLogout_(token) {
  if (token) {
    CacheService.getScriptCache().remove('tok_' + token);
  }
  return { ok: true };
}

function actionSendCampaign_(token, body) {
  if (!isValidToken_(token)) {
    return { error: 'Session expirée — reconnectez-vous' };
  }

  var subject = sanitize_(body.subject, 200);
  var message = sanitize_(body.message, 50000);
  var audience = sanitize_(body.audience, 30) || 'all';
  var testOnly = body.testOnly === true || body.testOnly === 'true';

  if (!subject || !message) {
    return { error: 'Sujet et message requis' };
  }

  var contacts = readSheetAsObjects_(SHEET_CONTACTS);
  var recipients = filterCampaignRecipients_(contacts, audience);

  if (testOnly) {
    var testEmail = PropertiesService.getScriptProperties().getProperty('CAMPAIGN_TEST_EMAIL');
    if (!testEmail) {
      testEmail = Session.getActiveUser().getEmail();
    }
    if (!testEmail) {
      return { error: 'E-mail de test introuvable (ajoutez CAMPAIGN_TEST_EMAIL dans les propriétés du script)' };
    }
    MailApp.sendEmail({
      to: testEmail,
      subject: '[TEST] ' + subject,
      body: personalizeCampaign_(message, { name: 'Test', email: testEmail, company: 'Test' })
    });
    return { ok: true, sent: 1, failed: 0, total: 1, test: true };
  }

  if (!recipients.length) {
    return { error: 'Aucun destinataire pour cette sélection' };
  }

  var fromName = PropertiesService.getScriptProperties().getProperty('MAIL_FROM_NAME') || 'Mohamed DAOUDA - Portfolio';
  var sent = 0;
  var failed = 0;

  for (var i = 0; i < recipients.length; i++) {
    try {
      MailApp.sendEmail({
        to: recipients[i].email,
        subject: subject,
        body: personalizeCampaign_(message, recipients[i]),
        name: fromName
      });
      sent++;
      Utilities.sleep(300);
    } catch (err) {
      failed++;
    }
  }

  logCampaign_(subject, audience, sent, failed);
  return { ok: true, sent: sent, failed: failed, total: recipients.length };
}

function filterCampaignRecipients_(contacts, audience) {
  var seen = {};
  var list = [];

  for (var i = 0; i < contacts.length; i++) {
    var c = contacts[i];
    var email = String(c.email || '').trim().toLowerCase();
    if (!email || email.indexOf('@') < 1) continue;

    if (audience === 'nouveau' && c.status !== 'nouveau') continue;
    if (audience === 'form' && c.source !== 'form') continue;
    if (audience === 'chatbot' && c.source !== 'chatbot') continue;

    if (seen[email]) continue;
    seen[email] = true;
    list.push({
      name: c.name || '',
      email: email,
      company: c.company || ''
    });
  }
  return list;
}

function personalizeCampaign_(template, contact) {
  return template
    .replace(/\{\{name\}\}/gi, contact.name || '')
    .replace(/\{\{email\}\}/gi, contact.email || '')
    .replace(/\{\{company\}\}/gi, contact.company || '');
}

function logCampaign_(subject, audience, sent, failed) {
  var ss = getSpreadsheet_();
  var sh = ss.getSheetByName('Campaigns');
  if (!sh) {
    sh = ss.insertSheet('Campaigns');
    sh.appendRow(['created_at', 'subject', 'audience', 'sent', 'failed']);
    sh.getRange(1, 1, 1, 5).setFontWeight('bold');
  }
  sh.appendRow([new Date().toISOString(), subject, audience, sent, failed]);
}

function actionUpdateStatus_(token, id, status) {
  if (!isValidToken_(token)) {
    return { error: 'Session expirée' };
  }
  var allowed = { nouveau: 1, lu: 1, traite: 1, archive: 1 };
  if (!allowed[status]) {
    return { error: 'Statut invalide' };
  }
  var ss = getSpreadsheet_();
  var sh = ss.getSheetByName(SHEET_CONTACTS);
  var data = sh.getDataRange().getValues();
  var headers = data[0];
  var idCol = headers.indexOf('id');
  var statusCol = headers.indexOf('status');
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][idCol]) === String(id)) {
      sh.getRange(i + 1, statusCol + 1).setValue(status);
      return { ok: true };
    }
  }
  return { error: 'Contact introuvable' };
}

function readSheetAsObjects_(sheetName) {
  var sh = getSpreadsheet_().getSheetByName(sheetName);
  if (!sh || sh.getLastRow() < 2) return [];
  var values = sh.getDataRange().getValues();
  var headers = values[0];
  var rows = [];
  for (var i = 1; i < values.length; i++) {
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = values[i][j] != null ? String(values[i][j]) : '';
    }
    rows.push(obj);
  }
  rows.sort(function (a, b) {
    return new Date(b.created_at) - new Date(a.created_at);
  });
  return rows;
}

function sanitize_(val, maxLen) {
  if (val == null) return '';
  var s = String(val).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');
  return s.length > maxLen ? s.substring(0, maxLen) : s;
}
