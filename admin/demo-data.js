/**
 * Données fictives — dashboard démo (aucune connexion requise)
 */
window.PORTFOLIO_ADMIN_DEMO = true;

(function () {
    const now = Date.now();
    const daysAgo = (n) => new Date(now - n * 86400000).toISOString();

    window.DEMO_CONTACTS = [
        {
            id: 'demo-1',
            created_at: daysAgo(2),
            source: 'form',
            name: 'Sophie Martin',
            email: 'sophie.martin@exemple.fr',
            phone: '+33 6 12 34 56 78',
            company: 'Master Cybersécurité — Université Paris',
            subject: 'Projet site vitrine',
            message: 'Bonjour, je souhaite un devis pour un site portfolio professionnel.',
            status: 'nouveau'
        },
        {
            id: 'demo-2',
            created_at: daysAgo(5),
            source: 'chatbot',
            name: 'Jean Kouassi',
            email: 'jkouassi@startup-africa.com',
            phone: '+229 01 40 00 00 00',
            company: 'Startup Africa Hub',
            message: 'Lead chatbot — service développement web, budget medium, délai normal.',
            service: 'web_dev',
            budget: 'medium',
            timeline: 'normal',
            location: 'Cotonou',
            status: 'lu'
        },
        {
            id: 'demo-3',
            created_at: daysAgo(12),
            source: 'chatbot',
            name: 'Amina Diallo',
            email: 'amina.d@consulting.sn',
            company: 'École Supérieure de Commerce Dakar',
            message: 'Demande formation & conseil IT pour équipe de 8 personnes.',
            service: 'training',
            budget: 'high',
            timeline: 'flexible',
            status: 'nouveau'
        },
        {
            id: 'demo-4',
            created_at: daysAgo(28),
            source: 'form',
            name: 'Lucas Bernard',
            email: 'l.bernard@freelance.io',
            phone: '',
            company: '',
            subject: 'Partenariat technique',
            message: 'Intéressé par une collaboration sur des missions cloud.',
            status: 'traite'
        }
    ];

    const sessions = ['s_demo_1', 's_demo_2', 's_demo_3', 's_demo_4', 's_demo_5'];
    window.DEMO_VISITS = [
        { created_at: daysAgo(1), session_id: sessions[0], page_path: '/index.html', referrer_channel: 'direct' },
        { created_at: daysAgo(1), session_id: sessions[0], page_path: '/projets.html', referrer_channel: 'direct' },
        { created_at: daysAgo(2), session_id: sessions[1], page_path: '/index.html', referrer_channel: 'google' },
        { created_at: daysAgo(3), session_id: sessions[2], page_path: '/contact.html', referrer_channel: 'linkedin' },
        { created_at: daysAgo(4), session_id: sessions[3], page_path: '/competences.html', referrer_channel: 'direct' },
        { created_at: daysAgo(6), session_id: sessions[4], page_path: '/index.html', referrer_channel: 'google' },
        { created_at: daysAgo(8), session_id: sessions[1], page_path: '/pro.html', referrer_channel: 'google' },
        { created_at: daysAgo(10), session_id: sessions[2], page_path: '/index.html', referrer_channel: 'facebook' },
        { created_at: daysAgo(15), session_id: sessions[3], page_path: '/projets.html', referrer_channel: 'direct' },
        { created_at: daysAgo(20), session_id: sessions[4], page_path: '/contact.html', referrer_channel: 'referral' }
    ];
})();
