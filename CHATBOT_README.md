# Chatbot Portfolio - Guide d'utilisation

## 🚀 Fonctionnalités du Chatbot

Le chatbot de votre portfolio est un assistant IA multilingue (français/anglais) qui permet de :

### ✅ Collecte d'informations
- **Type de projet** : Développement web, mobile, backend, etc.
- **Budget** : Fourchettes de prix adaptées
- **Délais** : Urgent, normal, flexible
- **Informations de contact** : Nom, email, téléphone, localisation
- **Détails du projet** : Description personnalisée

### ✅ Suggestions intelligentes
- **Solutions personnalisées** basées sur les besoins
- **Fourchettes de prix** calculées dynamiquement
- **Recommandations** adaptées au budget et délais

### ✅ Gestion des leads
- **Sauvegarde locale** des données
- **Envoi automatique** vers votre système de gestion
- **Export CSV** pour analyse
- **Statistiques** des leads collectés

## 🛠️ Configuration

### 1. Configuration de l'API (Optionnel)
Pour recevoir les leads par email, configurez votre endpoint dans `chatbot-data.js` :

```javascript
// Remplacez par votre endpoint Formspree ou autre service
this.apiEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';
```

### 2. Personnalisation des prix
Modifiez les prix de base dans `chatbot.js` :

```javascript
// Base prices by service
switch(service) {
    case 'web_dev': basePrice = 2000; break;
    case 'mobile_app': basePrice = 3000; break;
    // ... autres services
}
```

### 3. Ajout de nouveaux services
1. Ajoutez la traduction dans `translations.js`
2. Ajoutez l'option dans `chatbot.js` (méthode `showServiceOptions`)
3. Définissez le prix de base dans `getPriceRange`

## 📊 Gestion des données

### Accès aux leads
```javascript
// Obtenir tous les leads
const leads = window.chatbotDataManager.getLeads();

// Obtenir les statistiques
const stats = window.chatbotDataManager.getLeadStats();

// Exporter en CSV
window.chatbotDataManager.exportLeadsToCSV();
```

### Structure des données
```javascript
{
    id: "timestamp",
    timestamp: "2025-01-XX...",
    service: "web_dev",
    budget: "medium",
    timeline: "normal",
    contact: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+33123456789",
        location: "Paris, France",
        company: "Ma Société",
        projectDetails: "Description du projet"
    }
}
```

## 🎨 Personnalisation de l'apparence

### Styles CSS
Le chatbot utilise les variables CSS existantes de votre portfolio :
- `--primary-color` : Couleur principale
- `--secondary-color` : Couleur secondaire
- `--text-color` : Couleur du texte

### Responsive Design
Le chatbot s'adapte automatiquement :
- **Desktop** : Fenêtre flottante 350x500px
- **Mobile** : Plein écran avec marges

## 🔧 Maintenance

### Mise à jour des traductions
1. Modifiez `translations.js`
2. Ajoutez les nouvelles clés dans les sections `fr` et `en`
3. Utilisez le format : `'chatbot.nouvelle_cle': 'Traduction'`

### Ajout de nouvelles fonctionnalités
1. Étendez la classe `Chatbot` dans `chatbot.js`
2. Ajoutez les traductions correspondantes
3. Testez sur toutes les pages

## 📈 Analytics et suivi

### Métriques disponibles
- Nombre total de leads
- Leads par service
- Répartition par budget
- Leads récents (7 derniers jours)

### Intégration Google Analytics
Le chatbot envoie automatiquement des événements :
- `chatbot_opened` : Ouverture du chatbot
- `chatbot_lead_collected` : Lead collecté
- `chatbot_solution_provided` : Solution fournie

## 🚨 Dépannage

### Problèmes courants

1. **Chatbot ne s'affiche pas**
   - Vérifiez que `chatbot.js` est chargé
   - Vérifiez la console pour les erreurs

2. **Traductions manquantes**
   - Vérifiez `translations.js`
   - Assurez-vous que la langue est définie

3. **Données non sauvegardées**
   - Vérifiez `chatbot-data.js`
   - Testez la sauvegarde locale

### Debug
```javascript
// Activer le mode debug
localStorage.setItem('chatbot_debug', 'true');

// Voir les leads
console.log(window.chatbotDataManager.getLeads());

// Voir les statistiques
console.log(window.chatbotDataManager.getLeadStats());
```

## 🔒 Sécurité et confidentialité

### Données collectées
- Informations de contact (nom, email, téléphone)
- Localisation
- Détails du projet
- Préférences de budget et délais

### Protection des données
- Sauvegarde locale uniquement
- Pas de données sensibles stockées
- Conformité RGPD avec consentement

## 🚀 Améliorations futures

### Fonctionnalités suggérées
- [ ] Intégration calendrier pour rendez-vous
- [ ] Chat en temps réel avec support
- [ ] Analyse de sentiment des messages
- [ ] Intégration CRM (HubSpot, Salesforce)
- [ ] Notifications push pour nouveaux leads
- [ ] Dashboard d'administration
- [ ] Intégration WhatsApp Business
- [ ] Support multilingue étendu

### Optimisations techniques
- [ ] Cache des traductions
- [ ] Compression des données
- [ ] Offline support
- [ ] Progressive Web App features

---

**Note** : Ce chatbot est conçu pour être léger, rapide et facilement personnalisable. Il s'intègre parfaitement avec votre portfolio existant et respecte les standards web modernes.
