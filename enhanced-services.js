// Enhanced Services Data with Pricing
const enhancedServicesData = {
    fr: [
        {
            icon: '💻',
            title: 'Développement Web',
            description: 'Sites web modernes avec React, Vue.js, Next.js',
            price: 'À partir de 2000€',
            features: ['Responsive Design', 'SEO Optimisé', 'Performance', 'Sécurité'],
            category: 'web'
        },
        {
            icon: '📱',
            title: 'Applications Mobiles',
            description: 'Apps natives et cross-platform avec React Native',
            price: 'À partir de 3000€',
            features: ['iOS & Android', 'Performance', 'UI/UX', 'App Store'],
            category: 'mobile'
        },
        {
            icon: '🤖',
            title: 'Intégration IA & Chatbots',
            description: 'Chatbots intelligents et solutions IA personnalisées',
            price: 'À partir de 1500€',
            features: ['Chatbot Multilingue', 'IA Conversationnelle', 'Machine Learning', 'API Integration'],
            category: 'ai'
        },
        {
            icon: '☁️',
            title: 'Solutions Cloud & DevOps',
            description: 'Déploiement et gestion d\'infrastructures cloud',
            price: 'À partir de 2500€',
            features: ['AWS/Azure', 'Docker', 'CI/CD', 'Monitoring'],
            category: 'cloud'
        },
        {
            icon: '🛒',
            title: 'E-commerce Avancé',
            description: 'Boutiques en ligne avec paiements sécurisés',
            price: 'À partir de 4000€',
            features: ['Paiements Sécurisés', 'Gestion Stock', 'Analytics', 'Mobile-First'],
            category: 'ecommerce'
        },
        {
            icon: '📊',
            title: 'Analytics & Data',
            description: 'Tableaux de bord et analyse de données',
            price: 'À partir de 1800€',
            features: ['Dashboard', 'Reporting', 'Data Visualization', 'KPI Tracking'],
            category: 'analytics'
        },
        {
            icon: '🔗',
            title: 'Blockchain & Web3',
            description: 'Applications décentralisées et smart contracts',
            price: 'À partir de 5000€',
            features: ['Smart Contracts', 'DApps', 'NFT', 'DeFi'],
            category: 'blockchain'
        },
        {
            icon: '🥽',
            title: 'AR/VR & Métavers',
            description: 'Expériences immersives et réalité augmentée',
            price: 'À partir de 6000€',
            features: ['AR/VR', '3D Modeling', 'Unity', 'WebXR'],
            category: 'ar'
        },
        {
            icon: '🔧',
            title: 'Développement d\'APIs',
            description: 'APIs RESTful, GraphQL et microservices',
            price: 'À partir de 2200€',
            features: ['REST APIs', 'GraphQL', 'Microservices', 'Documentation'],
            category: 'api'
        },
        {
            icon: '🎨',
            title: 'Design UI/UX',
            description: 'Création d\'interfaces utilisateur modernes',
            price: 'À partir de 1200€',
            features: ['Prototypage', 'Design System', 'User Research', 'Accessibility'],
            category: 'design'
        },
        {
            icon: '🔒',
            title: 'Sécurité Web',
            description: 'Protection et sécurisation des applications',
            price: 'À partir de 2800€',
            features: ['Audit Sécurité', 'RGPD', 'HTTPS', 'Firewall'],
            category: 'security'
        },
        {
            icon: '🔍',
            title: 'Optimisation SEO',
            description: 'Amélioration de la visibilité web',
            price: 'À partir de 800€',
            features: ['Audit SEO', 'Optimisation', 'Content Strategy', 'Local SEO'],
            category: 'seo'
        }
    ],
    en: [
        {
            icon: '💻',
            title: 'Web Development',
            description: 'Modern websites with React, Vue.js, Next.js',
            price: 'Starting from $2000',
            features: ['Responsive Design', 'SEO Optimized', 'Performance', 'Security'],
            category: 'web'
        },
        {
            icon: '📱',
            title: 'Mobile Applications',
            description: 'Native and cross-platform apps with React Native',
            price: 'Starting from $3000',
            features: ['iOS & Android', 'Performance', 'UI/UX', 'App Store'],
            category: 'mobile'
        },
        {
            icon: '🤖',
            title: 'AI & Chatbots Integration',
            description: 'Smart chatbots and custom AI solutions',
            price: 'Starting from $1500',
            features: ['Multilingual Chatbot', 'Conversational AI', 'Machine Learning', 'API Integration'],
            category: 'ai'
        },
        {
            icon: '☁️',
            title: 'Cloud & DevOps Solutions',
            description: 'Cloud infrastructure deployment and management',
            price: 'Starting from $2500',
            features: ['AWS/Azure', 'Docker', 'CI/CD', 'Monitoring'],
            category: 'cloud'
        },
        {
            icon: '🛒',
            title: 'Advanced E-commerce',
            description: 'Online stores with secure payments',
            price: 'Starting from $4000',
            features: ['Secure Payments', 'Stock Management', 'Analytics', 'Mobile-First'],
            category: 'ecommerce'
        },
        {
            icon: '📊',
            title: 'Analytics & Data',
            description: 'Dashboards and data analysis',
            price: 'Starting from $1800',
            features: ['Dashboard', 'Reporting', 'Data Visualization', 'KPI Tracking'],
            category: 'analytics'
        },
        {
            icon: '🔗',
            title: 'Blockchain & Web3',
            description: 'Decentralized applications and smart contracts',
            price: 'Starting from $5000',
            features: ['Smart Contracts', 'DApps', 'NFT', 'DeFi'],
            category: 'blockchain'
        },
        {
            icon: '🥽',
            title: 'AR/VR & Metaverse',
            description: 'Immersive experiences and augmented reality',
            price: 'Starting from $6000',
            features: ['AR/VR', '3D Modeling', 'Unity', 'WebXR'],
            category: 'ar'
        },
        {
            icon: '🔧',
            title: 'API Development',
            description: 'RESTful APIs, GraphQL and microservices',
            price: 'Starting from $2200',
            features: ['REST APIs', 'GraphQL', 'Microservices', 'Documentation'],
            category: 'api'
        },
        {
            icon: '🎨',
            title: 'UI/UX Design',
            description: 'Creating modern user interfaces',
            price: 'Starting from $1200',
            features: ['Prototyping', 'Design System', 'User Research', 'Accessibility'],
            category: 'design'
        },
        {
            icon: '🔒',
            title: 'Web Security',
            description: 'Application protection and security',
            price: 'Starting from $2800',
            features: ['Security Audit', 'GDPR', 'HTTPS', 'Firewall'],
            category: 'security'
        },
        {
            icon: '🔍',
            title: 'SEO Optimization',
            description: 'Web visibility improvement',
            price: 'Starting from $800',
            features: ['SEO Audit', 'Optimization', 'Content Strategy', 'Local SEO'],
            category: 'seo'
        }
    ]
};

// Export for use in HTML
window.enhancedServicesData = enhancedServicesData;
