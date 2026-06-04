/**
 * Données démo — module campagnes e-mail
 */
window.PORTFOLIO_MAIL_DEMO = true;

(function () {
    const now = Date.now();
    const daysAgo = (n) => new Date(now - n * 86400000).toISOString();

    window.DEMO_MAIL_CAMPAIGNS = [
        {
            id: 'mc1',
            created_at: daysAgo(5),
            name: 'CAMPAGNE V1 PROSPECTION',
            description: 'Réduction de la charge administrative et relance des contacts portfolio',
            subject: 'Découvrez nos services 2026',
            body_html: '<p>{{salutation}},</p><p>Merci pour votre intérêt…</p>',
            audience: 'all',
            status: 'completed',
            total: '12',
            sent: '12',
            failed: '0',
            opens: '5',
            clicks: '2'
        },
        {
            id: 'mc2',
            created_at: daysAgo(12),
            name: 'Relance leads chatbot',
            description: 'Ciblage leads chatbot non traités',
            subject: 'Votre projet digital — suite à votre demande',
            audience: 'chatbot',
            status: 'completed',
            total: '6',
            sent: '6',
            failed: '0',
            opens: '3',
            clicks: '1'
        },
        {
            id: 'mc3',
            created_at: daysAgo(1),
            name: 'Newsletter portfolio Q2',
            description: 'Brouillon — pas encore envoyé',
            subject: 'Nouveautés sur daoudayinde.com',
            audience: 'nouveau',
            status: 'draft',
            total: '4',
            sent: '0',
            failed: '0',
            opens: '0',
            clicks: '0'
        }
    ];

    window.DEMO_MAIL_RECIPIENTS = {
        mc1: [
            { id: 'r1', campaign_id: 'mc1', email: 'sophie.martin@exemple.fr', name: 'Sophie Martin', company: 'Université Paris', status: 'opened', sent_at: daysAgo(4), opened_at: daysAgo(3), open_count: '2', click_count: '1', error: '' },
            { id: 'r2', campaign_id: 'mc1', email: 'jkouassi@startup.com', name: 'Jean Kouassi', company: 'TurboTech Partner', status: 'opened', sent_at: daysAgo(4), opened_at: daysAgo(4), open_count: '1', click_count: '0', error: '' },
            { id: 'r3', campaign_id: 'mc1', email: 'amina.d@consult.sn', name: 'Amina Diallo', company: 'Gloriam Dakar', status: 'sent', sent_at: daysAgo(4), opened_at: '', open_count: '0', click_count: '0', error: '' },
            { id: 'r4', campaign_id: 'mc1', email: 'l.bernard@cloud.io', name: 'Lucas Bernard', company: '', status: 'opened', sent_at: daysAgo(4), opened_at: daysAgo(2), open_count: '1', click_count: '1', error: '' }
        ],
        mc2: [
            { id: 'r5', campaign_id: 'mc2', email: 'fatou.ndiaye@startup.sn', name: 'Fatou Ndiaye', company: 'Incubateur', status: 'opened', sent_at: daysAgo(10), opened_at: daysAgo(9), open_count: '1', click_count: '0', error: '' }
        ],
        mc3: [
            { id: 'r6', campaign_id: 'mc3', email: 'demo.client@exemple.fr', name: 'DAOUDA A.', company: 'HEXAHUB Gabon', status: 'pending', sent_at: '', opened_at: '', open_count: '0', click_count: '0', error: '' }
        ]
    };

    window.DEMO_MAIL_CONTACTS = window.DEMO_CONTACTS || [];
})();
