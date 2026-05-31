// Enhanced Portfolio Animations & Effects
class PortfolioAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupHeaderScroll();
        this.setupScrollAnimations();
        this.setupStaggerAnimations();
        this.setupParallaxEffects();
        this.setupSkillBars();
        this.setupTimelineAnimations();
        this.setupStatCounters();
    }

    setupHeaderScroll() {
        const header = document.querySelector('header');
        if (!header) return;

        const onScroll = () => {
            header.classList.toggle('header-scrolled', window.scrollY > 40);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Animations au scroll
    setupScrollAnimations() {
        const selectors = [
            '.scroll-animate',
            '.scroll-animate-left',
            '.scroll-animate-right',
            '.fade-up'
        ].join(', ');

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.12
        };

        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        document.querySelectorAll(selectors).forEach(el => {
            this.scrollObserver.observe(el);
        });
    }

    observeScrollElements(container) {
        if (!this.scrollObserver || !container) return;
        container.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .fade-up').forEach(el => {
            this.scrollObserver.observe(el);
        });
    }

    setupStaggerAnimations() {
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-children');
                }
            });
        }, { rootMargin: '0px 0px -60px 0px', threshold: 0.15 });

        document.querySelectorAll('.stagger-children').forEach(el => {
            staggerObserver.observe(el);
        });
    }

    setupStatCounters() {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting || entry.target.dataset.counted) return;
                entry.target.dataset.counted = 'true';
                const el = entry.target;
                const target = parseInt(el.dataset.count, 10);
                const suffix = el.dataset.suffix || '';
                if (Number.isNaN(target)) return;

                const duration = 1400;
                const start = performance.now();

                const tick = (now) => {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.round(target * eased) + suffix;
                    if (progress < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('[data-count]').forEach(el => {
            counterObserver.observe(el);
        });
    }

    // Effet parallax
    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax-section');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Barres de compétences animées
    setupSkillBars() {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
                    skillBars.forEach(bar => {
                        const width = bar.dataset.width;
                        bar.style.setProperty('--skill-width', width + '%');
                        setTimeout(() => {
                            bar.classList.add('animate');
                        }, 200);
                    });
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.skill-category').forEach(category => {
            skillObserver.observe(category);
        });
    }

    // Timeline des compétences
    setupTimelineAnimations() {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timelineItems = entry.target.querySelectorAll('.timeline-item');
                    timelineItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.skills-timeline').forEach(timeline => {
            timelineObserver.observe(timeline);
        });
    }
}

// Enhanced Services Data
const enhancedServices = {
    fr: [
        {
            icon: '💻',
            title: 'Développement Web',
            description: 'Sites web modernes avec React, Vue.js, Next.js',
            price: 'À partir de 2000€',
            features: ['Responsive Design', 'SEO Optimisé', 'Performance', 'Sécurité']
        },
        {
            icon: '📱',
            title: 'Applications Mobiles',
            description: 'Apps natives et cross-platform avec React Native',
            price: 'À partir de 3000€',
            features: ['iOS & Android', 'Performance', 'UI/UX', 'App Store']
        },
        {
            icon: '🤖',
            title: 'Intégration IA & Chatbots',
            description: 'Chatbots intelligents et solutions IA personnalisées',
            price: 'À partir de 1500€',
            features: ['Chatbot Multilingue', 'IA Conversationnelle', 'Machine Learning', 'API Integration']
        },
        {
            icon: '☁️',
            title: 'Solutions Cloud & DevOps',
            description: 'Déploiement et gestion d\'infrastructures cloud',
            price: 'À partir de 2500€',
            features: ['AWS/Azure', 'Docker', 'CI/CD', 'Monitoring']
        },
        {
            icon: '🛒',
            title: 'E-commerce Avancé',
            description: 'Boutiques en ligne avec paiements sécurisés',
            price: 'À partir de 4000€',
            features: ['Paiements Sécurisés', 'Gestion Stock', 'Analytics', 'Mobile-First']
        },
        {
            icon: '📊',
            title: 'Analytics & Data',
            description: 'Tableaux de bord et analyse de données',
            price: 'À partir de 1800€',
            features: ['Dashboard', 'Reporting', 'Data Visualization', 'KPI Tracking']
        },
        {
            icon: '🔗',
            title: 'Blockchain & Web3',
            description: 'Applications décentralisées et smart contracts',
            price: 'À partir de 5000€',
            features: ['Smart Contracts', 'DApps', 'NFT', 'DeFi']
        },
        {
            icon: '🥽',
            title: 'AR/VR & Métavers',
            description: 'Expériences immersives et réalité augmentée',
            price: 'À partir de 6000€',
            features: ['AR/VR', '3D Modeling', 'Unity', 'WebXR']
        }
    ],
    en: [
        {
            icon: '💻',
            title: 'Web Development',
            description: 'Modern websites with React, Vue.js, Next.js',
            price: 'Starting from $2000',
            features: ['Responsive Design', 'SEO Optimized', 'Performance', 'Security']
        },
        {
            icon: '📱',
            title: 'Mobile Applications',
            description: 'Native and cross-platform apps with React Native',
            price: 'Starting from $3000',
            features: ['iOS & Android', 'Performance', 'UI/UX', 'App Store']
        },
        {
            icon: '🤖',
            title: 'AI & Chatbots Integration',
            description: 'Smart chatbots and custom AI solutions',
            price: 'Starting from $1500',
            features: ['Multilingual Chatbot', 'Conversational AI', 'Machine Learning', 'API Integration']
        },
        {
            icon: '☁️',
            title: 'Cloud & DevOps Solutions',
            description: 'Cloud infrastructure deployment and management',
            price: 'Starting from $2500',
            features: ['AWS/Azure', 'Docker', 'CI/CD', 'Monitoring']
        },
        {
            icon: '🛒',
            title: 'Advanced E-commerce',
            description: 'Online stores with secure payments',
            price: 'Starting from $4000',
            features: ['Secure Payments', 'Stock Management', 'Analytics', 'Mobile-First']
        },
        {
            icon: '📊',
            title: 'Analytics & Data',
            description: 'Dashboards and data analysis',
            price: 'Starting from $1800',
            features: ['Dashboard', 'Reporting', 'Data Visualization', 'KPI Tracking']
        },
        {
            icon: '🔗',
            title: 'Blockchain & Web3',
            description: 'Decentralized applications and smart contracts',
            price: 'Starting from $5000',
            features: ['Smart Contracts', 'DApps', 'NFT', 'DeFi']
        },
        {
            icon: '🥽',
            title: 'AR/VR & Metaverse',
            description: 'Immersive experiences and augmented reality',
            price: 'Starting from $6000',
            features: ['AR/VR', '3D Modeling', 'Unity', 'WebXR']
        }
    ]
};

// Enhanced Skills Data
const enhancedSkills = {
    fr: [
        {
            year: '2025',
            title: 'Intelligence Artificielle & Machine Learning',
            description: 'Intégration d\'IA, chatbots intelligents, et solutions ML personnalisées',
            skills: ['OpenAI API', 'TensorFlow', 'PyTorch', 'LangChain', 'ChatGPT Integration']
        },
        {
            year: '2024',
            title: 'Cloud & DevOps Avancé',
            description: 'Maîtrise des infrastructures cloud et des pratiques DevOps modernes',
            skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD']
        },
        {
            year: '2023',
            title: 'Frameworks Modernes & PWA',
            description: 'Expertise dans les frameworks JavaScript modernes et applications progressives',
            skills: ['React 18', 'Next.js 14', 'Vue.js 3', 'Nuxt.js', 'PWA', 'Web Components']
        },
        {
            year: '2022',
            title: 'Mobile & Cross-Platform',
            description: 'Développement d\'applications mobiles natives et cross-platform',
            skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo', 'Firebase']
        },
        {
            year: '2021',
            title: 'Backend & APIs',
            description: 'Architecture backend robuste et développement d\'APIs performantes',
            skills: ['Node.js', 'Python', 'GraphQL', 'REST APIs', 'Microservices', 'PostgreSQL']
        },
        {
            year: '2020',
            title: 'Frontend & UI/UX',
            description: 'Création d\'interfaces utilisateur modernes et expériences utilisateur optimales',
            skills: ['JavaScript ES6+', 'TypeScript', 'CSS3', 'SASS', 'Figma', 'Adobe XD']
        }
    ],
    en: [
        {
            year: '2025',
            title: 'Artificial Intelligence & Machine Learning',
            description: 'AI integration, smart chatbots, and custom ML solutions',
            skills: ['OpenAI API', 'TensorFlow', 'PyTorch', 'LangChain', 'ChatGPT Integration']
        },
        {
            year: '2024',
            title: 'Advanced Cloud & DevOps',
            description: 'Mastery of cloud infrastructures and modern DevOps practices',
            skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD']
        },
        {
            year: '2023',
            title: 'Modern Frameworks & PWA',
            description: 'Expertise in modern JavaScript frameworks and progressive applications',
            skills: ['React 18', 'Next.js 14', 'Vue.js 3', 'Nuxt.js', 'PWA', 'Web Components']
        },
        {
            year: '2022',
            title: 'Mobile & Cross-Platform',
            description: 'Native and cross-platform mobile application development',
            skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo', 'Firebase']
        },
        {
            year: '2021',
            title: 'Backend & APIs',
            description: 'Robust backend architecture and high-performance API development',
            skills: ['Node.js', 'Python', 'GraphQL', 'REST APIs', 'Microservices', 'PostgreSQL']
        },
        {
            year: '2020',
            title: 'Frontend & UI/UX',
            description: 'Creating modern user interfaces and optimal user experiences',
            skills: ['JavaScript ES6+', 'TypeScript', 'CSS3', 'SASS', 'Figma', 'Adobe XD']
        }
    ]
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioAnimations = new PortfolioAnimations();
});

// Export data for use in HTML
window.enhancedServices = enhancedServices;
window.enhancedSkills = enhancedSkills;
