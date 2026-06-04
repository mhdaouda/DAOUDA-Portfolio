/**
 * Données fictives enrichies — dashboard démo
 */
window.PORTFOLIO_ADMIN_DEMO = true;

(function () {
    const now = Date.now();
    const daysAgo = (n, hour = 10) => {
        const d = new Date(now - n * 86400000);
        d.setHours(hour, 30, 0, 0);
        return d.toISOString();
    };
    const monthsAgo = (m, day = 12) => {
        const d = new Date();
        d.setMonth(d.getMonth() - m);
        d.setDate(day);
        d.setHours(14, 0, 0, 0);
        return d.toISOString();
    };

    window.DEMO_CONTACTS = [
        { id: 'd1', created_at: daysAgo(1), source: 'form', name: 'DAOUDA A.', email: 'demo.client@hexahub-style.fr', phone: '+33 6 00 00 00 01', company: 'Université Collège De Paris Supérieur Gabon', subject: 'Stage réseau & cybersécurité', message: 'Demande de stage en réseau et cybersécurité — disponible dès septembre.', status: 'nouveau' },
        { id: 'd2', created_at: daysAgo(2), source: 'form', name: 'Sophie Martin', email: 'sophie.martin@exemple.fr', phone: '+33 6 12 34 56 78', company: 'Master Cybersécurité — Sorbonne', subject: 'Site vitrine cabinet', message: 'Bonjour, je souhaite un devis pour un site portfolio professionnel avec blog.', status: 'nouveau' },
        { id: 'd3', created_at: daysAgo(4), source: 'chatbot', name: 'Jean Kouassi', email: 'jkouassi@turbotech-style.com', phone: '+229 01 40 00 00 00', company: 'TurboTech Partner Bénin', message: 'Lead chatbot — développement web, budget 1000–5000€, délai 1–2 mois.', service: 'web_dev', budget: 'medium', timeline: 'normal', location: 'Cotonou', status: 'lu' },
        { id: 'd4', created_at: daysAgo(6), source: 'chatbot', name: 'Amina Diallo', email: 'amina.d@gloriam-style.sn', company: 'Gloriam Consulting — filiale Dakar', message: 'Formation & conseil IT pour équipe commerciale (8 personnes).', service: 'training', budget: 'high', timeline: 'flexible', location: 'Dakar', status: 'nouveau' },
        { id: 'd5', created_at: daysAgo(8), source: 'form', name: 'Lucas Bernard', email: 'l.bernard@cloud.io', phone: '+33 7 45 22 11 09', company: '', subject: 'Mission cloud AWS', message: 'Intéressé par une collaboration sur des missions cloud et DevOps.', status: 'traite' },
        { id: 'd6', created_at: daysAgo(11), source: 'chatbot', name: 'Fatou Ndiaye', email: 'fatou.ndiaye@startup.sn', phone: '+221 77 000 00 00', company: 'Incubateur Haskè', message: 'Application mobile + backend API pour MVP fintech.', service: 'mobile_app', budget: 'medium', timeline: 'urgent', status: 'lu' },
        { id: 'd7', created_at: daysAgo(14), source: 'form', name: 'Thomas Weber', email: 't.weber@consulting.de', phone: '+49 170 1234567', company: 'FH Berlin — Alternance', subject: 'Alternance développeur', message: 'Recherche alternance développeur full-stack, 12 mois.', status: 'nouveau' },
        { id: 'd8', created_at: daysAgo(18), source: 'chatbot', name: 'Chloé Dupont', email: 'chloe.dupont@pmo.fr', company: 'PMO Digital Lyon', message: 'Migration WordPress vers stack moderne.', service: 'wordpress', budget: 'low', timeline: 'normal', status: 'traite' },
        { id: 'd9', created_at: daysAgo(22), source: 'form', name: 'Ibrahim Touré', email: 'ibrahim.toure@edu.ga', phone: '+241 06 00 00 00', company: 'École nationale supérieure Libreville', subject: 'Projet étudiant', message: 'Accompagnement projet fin d’études — plateforme e-learning.', status: 'lu' },
        { id: 'd10', created_at: daysAgo(25), source: 'chatbot', name: 'Marie Lefèvre', email: 'marie.lefevre@retail.com', company: 'Retail Pro France', message: 'SEO + refonte UX site e-commerce.', service: 'seo', budget: 'high', timeline: 'flexible', status: 'archive' },
        { id: 'd11', created_at: monthsAgo(1, 8), source: 'chatbot', name: 'Yao Mensah', email: 'yao.m@benin-tech.bj', company: 'Benin Tech Hub', message: 'Maintenance & support site existant.', service: 'maintenance', budget: 'low', timeline: 'normal', status: 'traite' },
        { id: 'd12', created_at: monthsAgo(1, 20), source: 'form', name: 'Nadia El Amrani', email: 'nadia@agency.ma', phone: '+212 6 11 22 33 44', company: 'Agence Casablanca Digital', subject: 'Design UI/UX', message: 'Besoin maquettes Figma + intégration pour landing page.', status: 'lu' },
        { id: 'd13', created_at: monthsAgo(2, 5), source: 'chatbot', name: 'Paul Okonkwo', email: 'p.okonkwo@lagos.ng', message: 'Intégration ERP + site vitrine.', service: 'integration', budget: 'high', timeline: 'normal', status: 'traite' },
        { id: 'd14', created_at: monthsAgo(2, 18), source: 'form', name: 'Émilie Rousseau', email: 'emilie.r@asso.fr', company: 'Association Solidarité Numérique', subject: 'Site associatif', message: 'Site vitrine associatif avec dons en ligne.', status: 'archive' },
        { id: 'd15', created_at: monthsAgo(3, 10), source: 'chatbot', name: 'Karim Benali', email: 'karim.b@cyber.dz', company: 'Institut Cybersécurité Alger', message: 'Audit sécurité web application cliente.', service: 'security', budget: 'medium', timeline: 'urgent', status: 'traite' },
        { id: 'd16', created_at: monthsAgo(4, 6), source: 'form', name: 'Laura Gomes', email: 'laura@gomes.pt', phone: '+351 912 000 000', company: 'Universidade de Lisboa', subject: 'Portfolio académique', message: 'Création portfolio pour soutenance master.', status: 'archive' },
        { id: 'd17', created_at: monthsAgo(4, 22), source: 'chatbot', name: 'Samuel N.', email: 'samuel@devshop.cm', message: 'Backend Node.js + PostgreSQL.', service: 'backend', budget: 'medium', timeline: 'normal', status: 'traite' },
        { id: 'd18', created_at: monthsAgo(5, 14), source: 'form', name: 'TOHON K.', email: 'tohon.k@client.demo', phone: '+229 01 52 26 94 00', company: 'HEXAHUB Gabon', subject: 'TEST', message: 'COUCOU TEST — message de démonstration interface.', status: 'lu' },
        { id: 'd19', created_at: monthsAgo(5, 28), source: 'chatbot', name: 'Grace Mbaye', email: 'grace@consult.sn', company: 'Cabinet conseil Dakar', message: 'UI/UX application mobile santé.', service: 'uiux', budget: 'high', timeline: 'flexible', status: 'archive' },
        { id: 'd20', created_at: monthsAgo(6, 3), source: 'form', name: 'Marc Dubois', email: 'marc.dubois@early.demo', company: 'Startup Paris', subject: 'Premier contact', message: 'Premier message historique — genèse du dashboard.', status: 'archive' }
    ];

    const pages = [
        '/index.html',
        '/projets.html',
        '/contact.html',
        '/competences.html',
        '/pro.html',
        '/index.html',
        '/contact.html'
    ];
    const channelWeights = [
        ['direct', 94],
        ['google', 9],
        ['linkedin', 6],
        ['facebook', 2],
        ['twitter', 2],
        ['referral', 4]
    ];

    const visits = [];
    let sessionCounter = 0;
    const sessionPool = [];

    function newSession() {
        const id = `s_demo_${++sessionCounter}`;
        sessionPool.push(id);
        return id;
    }

    channelWeights.forEach(([ch, count]) => {
        for (let i = 0; i < count; i++) {
            const day = (i % 28) + 1;
            const sid = i % 3 === 0 ? newSession() : sessionPool[Math.floor(i / 3) % sessionPool.length] || newSession();
            visits.push({
                created_at: daysAgo(day, 8 + (i % 10)),
                session_id: sid,
                page_path: pages[i % pages.length],
                page_title: 'Portfolio démo',
                referrer_channel: ch
            });
        }
    });

    window.DEMO_VISITS = visits;

    window.DEMO_CAMPAIGNS = [
        { date: daysAgo(3), subject: 'Bienvenue — merci pour votre message', audience: 'nouveau', sent: 5, failed: 0 },
        { date: daysAgo(18), subject: 'Actualités portfolio & nouveaux services', audience: 'all', sent: 14, failed: 1 },
        { date: daysAgo(35), subject: 'Rappel — devis en attente', audience: 'form', sent: 6, failed: 0 }
    ];

    window.DEMO_CAMPAIGN_PREFILL = {
        subject: 'Découvrez nos nouveautés 2026',
        message: 'Bonjour,\n\nMerci pour l’intérêt porté à nos services. Nous revenons vers vous avec nos dernières réalisations (portfolio, TurboTech, Gloriam).\n\nRestant à votre disposition,\nMohamed DAOUDA'
    };
})();
