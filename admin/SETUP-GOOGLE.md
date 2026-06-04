# Dashboard admin sans Supabase (Google Sheets)

Le portfolio enregistre contacts et visites dans **Google Sheets** via un petit script gratuit. Aucun compte Supabase requis.

## Étapes (≈ 15 min)

### 1. Créer la feuille

1. [Google Sheets](https://sheets.google.com) → nouvelle feuille « Portfolio Admin »
2. **Extensions → Apps Script**
3. Supprimer le code par défaut et coller le contenu de `admin/google-apps-script/PortfolioAPI.gs`
4. Enregistrer le projet

### 2. Initialiser les onglets

1. Dans Apps Script : exécuter la fonction **`setupSheets`** (autoriser l’accès à la feuille)
2. Vérifier que les onglets **Contacts** et **Visits** existent avec les en-têtes

### 3. Mot de passe admin

1. Apps Script → **Paramètres du projet** (engrenage) → **Propriétés du script**
2. Ajouter : nom `ADMIN_PASSWORD`, valeur = votre mot de passe (ex. phrase longue)

### 4. Déployer l’API web

1. **Déployer → Nouveau déploiement → Application web**
2. Exécuter en tant que : **Moi**
3. Qui a accès : **Tout le monde**
4. Copier l’URL se terminant par `/exec`

### 5. Configurer le site

Dans `js/portfolio-api-config.js` :

```javascript
window.PORTFOLIO_API = {
    baseUrl: 'https://script.google.com/macros/s/VOTRE_ID/exec'
};
```

Commit + push → le dashboard et le tracking fonctionnent.

## Utilisation

- **Dashboard** : `https://www.daoudayinde.com/admin/dashboard.html` → mot de passe défini à l’étape 3
- **Données brutes** : directement dans la feuille Google (export CSV possible)
- **Emails** : le formulaire contact envoie toujours un mail via FormSubmit

## Sans configuration Google

Si `baseUrl` est vide :

- Le site et les emails FormSubmit marchent normalement
- Le dashboard affiche un message de configuration
- Aucune erreur pour les visiteurs
