/**
 * Dashboard admin portfolio
 */
(function () {
    'use strict';

    const DAYS = 30;
    let sb = null;
    let contacts = [];
    let visits = [];

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    function formatDate(iso) {
        if (!iso) return '—';
        const d = new Date(iso);
        return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    }

    function withinDays(iso, days) {
        const t = new Date(iso).getTime();
        return t >= Date.now() - days * 86400000;
    }

    function statusBadge(status) {
        const labels = { nouveau: 'nouveau', lu: 'lu', traite: 'traité', archive: 'archivé' };
        const cls = status === 'lu' ? 'admin-badge--lu' : status === 'traite' ? 'admin-badge--traite' : '';
        return `<span class="admin-badge ${cls}">${labels[status] || status}</span>`;
    }

    function channelLabel(ch) {
        const map = {
            direct: 'Direct',
            google: 'Google',
            bing: 'Bing',
            facebook: 'Facebook',
            linkedin: 'LinkedIn',
            twitter: 'Twitter/X',
            instagram: 'Instagram',
            referral: 'Autre site'
        };
        return map[ch] || ch;
    }

    async function initSupabase() {
        const cfg = window.PORTFOLIO_SUPABASE;
        if (!cfg?.url || !cfg?.anonKey || !window.supabase) return null;
        return window.supabase.createClient(cfg.url, cfg.anonKey);
    }

    function showLogin() {
        $('#admin-app')?.classList.add('admin-hidden');
        $('#admin-login')?.classList.remove('admin-hidden');
    }

    function showApp() {
        $('#admin-login')?.classList.add('admin-hidden');
        $('#admin-app')?.classList.remove('admin-hidden');
    }

    async function loadData() {
        $('#admin-loading')?.classList.remove('admin-hidden');
        const [cRes, vRes] = await Promise.all([
            sb.from('portfolio_contacts').select('*').order('created_at', { ascending: false }).limit(500),
            sb.from('portfolio_visits').select('*').order('created_at', { ascending: false }).limit(5000)
        ]);
        $('#admin-loading')?.classList.add('admin-hidden');

        if (cRes.error) throw new Error(cRes.error.message);
        if (vRes.error) throw new Error(vRes.error.message);

        contacts = cRes.data || [];
        visits = vRes.data || [];
        renderAll();
    }

    function getStats() {
        const recentVisits = visits.filter((v) => withinDays(v.created_at, DAYS));
        const sessions = new Set(recentVisits.map((v) => v.session_id));
        const channels = {};
        recentVisits.forEach((v) => {
            const ch = v.referrer_channel || 'direct';
            if (!channels[ch]) channels[ch] = { visitors: new Set(), visits: 0 };
            channels[ch].visitors.add(v.session_id);
            channels[ch].visits += 1;
        });

        const channelList = Object.entries(channels)
            .map(([key, val]) => ({
                key,
                visitors: val.visitors.size,
                visits: val.visits
            }))
            .sort((a, b) => b.visits - a.visits);

        const pages = {};
        recentVisits.forEach((v) => {
            pages[v.page_path] = (pages[v.page_path] || 0) + 1;
        });
        const topPages = Object.entries(pages).sort((a, b) => b[1] - a[1]).slice(0, 8);

        const singlePageSessions = {};
        recentVisits.forEach((v) => {
            singlePageSessions[v.session_id] = (singlePageSessions[v.session_id] || 0) + 1;
        });
        const bounceSessions = Object.values(singlePageSessions).filter((n) => n === 1).length;
        const bounceRate = sessions.size ? Math.round((bounceSessions / sessions.size) * 100) : 0;

        return {
            messages: contacts.length,
            newMessages: contacts.filter((c) => c.status === 'nouveau').length,
            chatbot: contacts.filter((c) => c.source === 'chatbot').length,
            form: contacts.filter((c) => c.source === 'form').length,
            totalVisits: recentVisits.length,
            uniqueVisitors: sessions.size,
            bounceRate,
            channelList,
            topPages
        };
    }

    function renderChannelList(containerId, channelList) {
        const el = $(containerId);
        if (!el) return;
        const maxVisits = channelList[0]?.visits || 1;
        el.innerHTML = channelList.length
            ? channelList.map((ch) => `
                <li class="admin-channel-item">
                    <span>${channelLabel(ch.key)} — ${ch.visitors} visiteurs, ${ch.visits} pages</span>
                    <div class="admin-channel-bar"><span style="width:${Math.round((ch.visits / maxVisits) * 100)}%"></span></div>
                </li>`).join('')
            : '<li>Aucune visite enregistrée.</li>';
    }

    function renderOverview() {
        const s = getStats();
        $('#stat-messages').textContent = s.messages;
        $('#stat-new').textContent = s.newMessages;
        $('#stat-chatbot').textContent = s.chatbot;
        $('#stat-visitors').textContent = s.uniqueVisitors;

        const recent = contacts.slice(0, 6);
        $('#overview-contacts').innerHTML = recent.length
            ? recent.map((c) => `
                <div class="admin-list-item">
                    <strong>${PortfolioSupabase.escapeHtml(c.name)}</strong>
                    <small>${PortfolioSupabase.escapeHtml(c.email)} · ${formatDate(c.created_at)} · ${statusBadge(c.status)}</small>
                </div>`).join('')
            : '<p class="admin-muted">Aucun message pour le moment.</p>';

        renderChannelList('#channels-list-overview', s.channelList);
    }

    function renderContacts() {
        $('#contacts-count').textContent = contacts.length;
        const tbody = $('#contacts-table-body');
        if (!tbody) return;

        tbody.innerHTML = contacts.map((c) => `
            <tr data-id="${c.id}">
                <td>${PortfolioSupabase.escapeHtml(c.name)}</td>
                <td>${PortfolioSupabase.escapeHtml(c.email)}</td>
                <td>${PortfolioSupabase.escapeHtml(c.phone || '—')}</td>
                <td>${PortfolioSupabase.escapeHtml(c.company || '—')}</td>
                <td><span class="admin-msg-preview">${PortfolioSupabase.escapeHtml(c.message)}</span></td>
                <td>${formatDate(c.created_at).split(' ')[0]}</td>
                <td>${statusBadge(c.status)}</td>
                <td><button type="button" class="admin-btn admin-btn--ghost admin-view-btn" data-id="${c.id}">Voir</button></td>
            </tr>
        `).join('');

        tbody.querySelectorAll('.admin-view-btn').forEach((btn) => {
            btn.addEventListener('click', () => openContactModal(btn.dataset.id));
        });
    }

    function renderVisitors() {
        const s = getStats();
        $('#vis-total').textContent = s.totalVisits;
        $('#vis-unique').textContent = s.uniqueVisitors;
        $('#vis-bounce').textContent = `${s.bounceRate}%`;

        renderChannelList('#channels-list', s.channelList);

        $('#top-pages').innerHTML = s.topPages.length
            ? s.topPages.map(([path, count]) => `
                <div class="admin-list-item">
                    <strong>${PortfolioSupabase.escapeHtml(path)}</strong>
                    <small>${count} vues (${DAYS} j)</small>
                </div>`).join('')
            : '<p class="admin-muted">—</p>';
    }

    function renderAll() {
        renderOverview();
        renderContacts();
        renderVisitors();
    }

    function openContactModal(id) {
        const c = contacts.find((x) => x.id === id);
        if (!c) return;

        const html = `
            <div class="admin-detail-row"><strong>Source</strong>${c.source === 'chatbot' ? 'Chatbot' : 'Formulaire'}</div>
            <div class="admin-detail-row"><strong>Nom</strong>${PortfolioSupabase.escapeHtml(c.name)}</div>
            <div class="admin-detail-row"><strong>Email</strong>${PortfolioSupabase.escapeHtml(c.email)}</div>
            <div class="admin-detail-row"><strong>Téléphone</strong>${PortfolioSupabase.escapeHtml(c.phone || '—')}</div>
            <div class="admin-detail-row"><strong>Formation / Entreprise</strong>${PortfolioSupabase.escapeHtml(c.company || '—')}</div>
            <div class="admin-detail-row"><strong>Localisation</strong>${PortfolioSupabase.escapeHtml(c.location || '—')}</div>
            <div class="admin-detail-row"><strong>Sujet</strong>${PortfolioSupabase.escapeHtml(c.subject || '—')}</div>
            ${c.service ? `<div class="admin-detail-row"><strong>Service</strong>${PortfolioSupabase.escapeHtml(c.service)}</div>` : ''}
            ${c.budget ? `<div class="admin-detail-row"><strong>Budget</strong>${PortfolioSupabase.escapeHtml(c.budget)}</div>` : ''}
            ${c.timeline ? `<div class="admin-detail-row"><strong>Délai</strong>${PortfolioSupabase.escapeHtml(c.timeline)}</div>` : ''}
            <div class="admin-detail-row"><strong>Message</strong><div class="admin-detail-message">${PortfolioSupabase.escapeHtml(c.message)}</div></div>
            ${c.project_details ? `<div class="admin-detail-row"><strong>Détails projet</strong><div class="admin-detail-message">${PortfolioSupabase.escapeHtml(c.project_details)}</div></div>` : ''}
            <div class="admin-detail-row"><strong>Date</strong>${formatDate(c.created_at)}</div>
            <div style="display:flex;gap:0.5rem;margin-top:1rem;flex-wrap:wrap">
                <button type="button" class="admin-btn admin-btn--ghost" data-status="lu" data-id="${c.id}">Marquer lu</button>
                <button type="button" class="admin-btn" data-status="traite" data-id="${c.id}">Marquer traité</button>
                <button type="button" class="admin-btn admin-btn--danger admin-modal-close">Fermer</button>
            </div>
        `;

        $('#modal-body').innerHTML = html;
        $('#admin-modal').classList.add('is-open');

        $('#modal-body').querySelectorAll('[data-status]').forEach((btn) => {
            btn.addEventListener('click', async () => {
                await updateStatus(btn.dataset.id, btn.dataset.status);
                closeModal();
            });
        });
        $('#modal-body').querySelector('.admin-modal-close')?.addEventListener('click', closeModal);

        if (c.status === 'nouveau') {
            updateStatus(c.id, 'lu', false);
        }
    }

    function closeModal() {
        $('#admin-modal')?.classList.remove('is-open');
    }

    async function updateStatus(id, status, reload = true) {
        const { error } = await sb.from('portfolio_contacts').update({ status }).eq('id', id);
        if (error) {
            alert(error.message);
            return;
        }
        const row = contacts.find((c) => c.id === id);
        if (row) row.status = status;
        if (reload) renderAll();
    }

    function switchTab(tabId) {
        $$('.admin-tab').forEach((t) => t.classList.toggle('is-active', t.dataset.tab === tabId));
        $$('.admin-panel').forEach((p) => p.classList.toggle('is-active', p.id === `panel-${tabId}`));
    }

    async function handleLogin(e) {
        e.preventDefault();
        const email = $('#login-email').value.trim();
        const password = $('#login-password').value;
        const errEl = $('#login-error');
        errEl.classList.remove('is-visible');

        const { data, error } = await sb.auth.signInWithPassword({ email, password });
        if (error) {
            errEl.textContent = error.message;
            errEl.classList.add('is-visible');
            return;
        }
        if (data.session) {
            showApp();
            await loadData();
        }
    }

    async function handleLogout() {
        await sb.auth.signOut();
        showLogin();
    }

    async function init() {
        sb = await initSupabase();
        if (!sb) {
            $('#login-error').textContent = 'Supabase non chargé. Vérifiez la configuration.';
            $('#login-error').classList.add('is-visible');
            return;
        }

        const { data: { session } } = await sb.auth.getSession();
        if (session) {
            showApp();
            try {
                await loadData();
            } catch (err) {
                alert('Erreur chargement: ' + err.message);
            }
        } else {
            showLogin();
        }

        $('#login-form')?.addEventListener('submit', handleLogin);
        $('#btn-logout')?.addEventListener('click', handleLogout);
        $('#btn-refresh')?.addEventListener('click', () => loadData().catch((e) => alert(e.message)));

        $$('.admin-tab').forEach((tab) => {
            tab.addEventListener('click', () => switchTab(tab.dataset.tab));
        });

        $('#admin-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'admin-modal') closeModal();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
