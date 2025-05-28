const translations = {
    fr: {
        // Navigation
        'nav.home': 'Accueil',
        'nav.projects': 'Projets',
        'nav.services': 'Services',
        'nav.contact': 'Contact',
        
        // Hero Section
        'hero.title': 'Développeur Full Stack',
        'hero.subtitle': 'Créateur de solutions web innovantes',
        'hero.cta': 'Découvrir mes services',
        'hero.cv': 'Télécharger mon CV',
        'hero.description': 'Ingénieur passionné créant des solutions innovantes et partipants à des projets décisifs',
        'hero.projects': 'Voir Mes projets',
        'hero.services': 'Découvrir Mes services',
        
        // Services
        'services.title': 'Mes Services',
        'services.web': 'Développement Web',
        'services.web.desc': 'Création de sites web modernes et responsifs',
        'services.mobile': 'Applications Mobiles',
        'services.mobile.desc': 'Développement d\'applications iOS et Android',
        'services.backend': 'Solutions Backend',
        'services.backend.desc': 'Développement d\'APIs et de bases de données',
        'services.maintenance': 'Maintenance et Support',
        'services.maintenance.desc': 'Assistance technique et maintenance évolutive',
        'services.seo': 'Optimisation SEO',
        'services.seo.desc': 'Amélioration de la visibilité web',
        'services.training': 'Formation et Conseil',
        'services.training.desc': 'Accompagnement et formation technique',
        'services.uiux': 'Design UI/UX',
        'services.uiux.desc': 'Création d\'interfaces utilisateur modernes',
        'services.security': 'Sécurité Web',
        'services.security.desc': 'Protection et sécurisation des applications',
        'services.integration': 'Intégration de Systèmes',
        'services.integration.desc': 'Connexion et synchronisation de services',
        'services.wordpress': 'Migration vers WordPress',
        'services.wordpress.desc': 'Conversion de sites existants en WordPress',
        
        // Contact
        'contact.title': 'Contactez-moi',
        'contact.name': 'Nom',
        'contact.email': 'Email',
        'contact.subject': 'Sujet',
        'contact.message': 'Message',
        'contact.send': 'Envoyer',
        'contact.success': 'Message envoyé avec succès !',
        'contact.error': 'Une erreur est survenue. Veuillez réessayer.',
        
        // Contact Success Popup
        'contact.success.title': 'Message envoyé !',
        'contact.success.message': 'Je vous répondrai dans les plus brefs délais.',
        'contact.success.close': 'Fermer',
        
        // Contact Section
        'contact.talk': 'Parlons de votre projet',
        'contact.description': 'N\'hésitez pas à me contacter pour discuter de vos projets ou besoin de formation ou pour toute question.',
        'contact.download.cv': 'Télécharger mon CV',
        
        // Footer
        'footer.rights': 'Tous droits réservés.',
        
        // Language Switch
        'lang.switch': 'Switch to English',
        
        // Politique de confidentialité
        'privacy.title': 'Politique de Confidentialité',
        'privacy.intro': 'Cette politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos informations personnelles.',
        'privacy.collection': 'Collecte des informations',
        'privacy.collection.text': 'Nous collectons les informations que vous nous fournissez directement via le formulaire de contact, notamment votre nom et votre adresse e-mail.',
        'privacy.use': 'Utilisation des informations',
        'privacy.use.text': 'Les informations collectées sont utilisées pour répondre à vos demandes de contact et améliorer nos services.',
        'privacy.protection': 'Protection des informations',
        'privacy.protection.text': 'Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles.',
        'privacy.cookies': 'Cookies',
        'privacy.cookies.text': 'Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.',
        'privacy.rights': 'Vos droits',
        'privacy.rights.text': 'Vous disposez du droit d\'accéder, de rectifier et de supprimer vos données personnelles. Pour exercer ces droits, contactez-nous.',
        'privacy.contact': 'Nous contacter',
        'privacy.contact.text': 'Pour toute question concernant cette politique de confidentialité, contactez-nous à l\'adresse suivante :',
        'privacy.lastUpdate': 'Dernière mise à jour :',
        
        // About Section
        'about.title': 'À propos de moi',
        'about.journey': 'Mon Parcours',
        'about.journey.text': 'Ingénieur en Informatique passionné par le développement et l\'innovation technologique. Je suis issue d\'une formation de 5 ans d\'ingénieur en informatique et télécommunications à L\'ESIGETEL. J\'ai 10 ans d\'expérience professionnelles ou j\'ai eu l\'occasion de travailler sur des projets d\'envergures avec des clients comme : La Banque Postale, la BNP Paribas (au sein de l\'entité BP2S), Axa assurances, Total Energies etc...',
        'about.journey.goal': 'Sur tous les projets auxquels j\'ai participé, mon but était de créer des solutions qui font la différence.',
        'about.education': 'Formation',
        'about.education.certification': 'Certification product owner à International Scrum Institute',
        'about.education.certification.desc': 'Spécialisation en Srum et méthodes agiles',
        'about.education.engineer': 'Diplôme d\'Ingénieur en Informatique à l\'ESIGETEL',
        'about.education.engineer.desc': 'Spécialisation en cloud computing, développement web et applications',
        'about.education.montreal': 'Semestre d\'étude à l\'ETS de Montréal',
        'about.education.montreal.desc': 'Génie logiciel',
        'about.education.staffordshire': 'Semestre d\'étude à l\'Université de Staffordshire',
        'about.education.staffordshire.desc': 'Spécialisation en réseaux et télécommunications',
        'about.education.engineer2': 'Diplôme d\'Ingénieur en Informatique',
        'about.education.engineer2.desc': 'Spécialisation en développement web et applications',
        'about.goals': 'Objectifs',
        'about.goals.short': 'Court terme',
        'about.goals.short.desc': 'Développer mes compétences en développement web et mobile',
        'about.goals.medium': 'Moyen terme',
        'about.goals.medium.desc': 'Créer des solutions innovantes pour résoudre des problèmes concrets',
        'about.goals.long': 'Long terme',
        'about.goals.long.desc': 'Devenir un expert reconnu dans le domaine du développement',
        'about.skills': 'Compétences',
        
        // Cookie Consent
        'cookie.message': 'Ce site utilise des cookies pour améliorer votre expérience.',
        'cookie.dismiss': 'Accepter',
        'cookie.link': 'En savoir plus',

        "projects.online": "Projets en ligne 🌐",
        "projects.experience": "Expériences Professionnelles 💼",
        "projects.view": "Voir le site",
        "projects.source": "Code source",
        "projects.tech": "Environnement Technique",
        "projects.ohmyfood.desc": "Vous permet selon votre localisation d'obtenir les meilleurs restaurants dans votre ville et de réserver une table. Vous pouvez également consulter les menus de chaque restaurant.",
        "projects.portfolio.desc": "Dossier numérique ou physique qui rassemble et présente de manière structurée ses compétences techniques, réalisations, projets, et parfois certifications ou expériences professionnelles.",
        "projects.cloudnote.desc": "Projet pense-bête ou agenda en ligne. Vous pouvez ajouter, modifier, supprimer des rendez-vous. Vous pouvez également partager vos rendez-vous avec d'autres utilisateurs.",
        "projects.lbp.desc": "Au sein du département DREG/PEA/MRE, j'ai intégré l'équipe Moteur de règles pour participer au projet ODM et mettre en place l'application clé en main autour des outils POP. Mes principales tâches sur cette mission étaient : - Recueil et analyse des besoins clients et Définition de la solution adéquate avec le métier - Planification des différentes tâches à accomplir et Packaging de la nouvelle version d'ODM - Test de la nouvelle version d'ODM en DEV avec les équipes IT et Développement des tests - Déploiement des nouvelles versions D'ODM sur les différents environnements de DEV et hors-prod (ASSE, TFON, R7EX). Coordination entre les équipes métiers, REA, Réseaux en PROD - Développement d'un job Spark en Python afin d'appliquer les règles métier et le déployer sur Jenkins. - Migration des scénarios de conformité afin d'optimiser la qualité des alertes par une méthode intelligente Machine Learning. - Conception des tables et la solution à appliquer (les tables référentiels, tables agrégations …). - Mise en place et réalisation du projet clé en main pour le déploiement de règles via les outils/ POP, Gitlab, DLU, XLDeploy, XLRelease). - Quête des feedbacks des utilisateurs (Acteurs et Métiers).",
        "projects.bp2s.desc": "J'ai intégré l'équipe TICS de BP2S dans le cadre de la gestion des flux de données entres applications. Mes principales tâches sur cette mission étaient : - Recueil et analyse des besoins clients - Définition de la solution adéquate avec le métier et le support applicatif - Planification des différentes tâches à accomplir - Coordination pour le codage des flux et les ouvertures firewalls en suivants les protocoles de BPSS - Mise en place des tests de validations avec les clients - Coordination de la partie résolutions des bugs liés aux codages - Coordination et planifications de changement d'environnent chez BNP et ses clients - Gestion de l'impact des changements d'infrastructure chez le client - Gestions des incidents liés aux transfert de fichiers - Préparation de la stratégie et des livrables de la campagne - Diagnostic et analyse des problèmes rencontrés : Outils, Scripts et Matériels - Reporting quotidien à la MOA - Management d'une équipe de cinq personnes (analystes et testeurs) - Répondre aux sollicitations des Clients et métiers BP2S - Suivi du cycle de vie de chaque anomalie créée - Transfert de compétences à la MOA, et aux nouveaux collaborateurs",
        "projects.axa.desc": "J'ai intégré l'équipe d'AXA Group Solutions autour du projet Aura qui est un questionnaire en ligne destiné aux entités d'Axa proposant des services d'assurances en ligne. Mes tâches étaient : - Intégration de logiciels d'assurance au sein des entités AXA à l'international (Italie, Japon, Espagne, Singapour) - Définition du périmètre et intégration dans l'architecture réseau des entités - Adaptation du logiciel aux besoins des entités - Gestion du déploiement et gestions des versions - Définition des besoins vis-à-vis de l'éditeur de logiciel, afin de garder la même base commune à toutes les entités AXA, tout en adaptant les possibilités de configuration - Mise en place de processus de gestion et de livraison des paquets afin d'assurer la qualité du projet dans le temps et lors de l'augmentation du volume avec l'entrée de nouvelles entités dans le projet - Décrire chaque fonctionnalité retenue sous forme d'une User Story suffisamment petite pour être implémentée en 1 seule itération - Prioriser toutes les Story identifiées et écrites au sein du Product Backlog. - Maintenir le Product Backlog et chercher en permanence à maximiser la valeur métier pour les utilisateurs. - Gestion d'équipes de développements d'outils annexes (reporting, statistiques ...) afin de compléter l'offre aux entités - Analyse des problèmes de sécurité et de performance - Quête des feedbacks des utilisateurs (Acteurs et Métiers). - Mise à jour du Guide d'implémentation.",
        "projects.total.desc": "J'ai intégré la brillante équipe TTED de la DSI de TOTAL dans le cadre du projet ISI. Mes différentes tâches sur ce projet innovant sont à savoir : - Former les équipes assurant le support, - Mises en place et suivi des procédures de traitement des demandes, - Coordination des projets de delivery (planning, priorisation des activités), - Gestion du respect du périmètre Opérationnel, - Test et débogage de code C#, - Décompilation d'applications C# pour obtenir le code source, - Ajout de nouvelles fonctionnalités sur le code existant, - Développement d'outils d'applications en C#, - Scripting pour automatiser des actions côtés serveur et côté client, - Participation à la rédaction et mise à jour du PRA, - Gestion et suivi des changements / préparations des comités changements (CAB) - Participation aux différentes réunions avec les différents acteurs du projet ISIS avec divers acteurs comme la CA, client, … (réunions et Compte rendu en Anglais), - Installation et documentation de l'applicatif sur les serveurs (productions et intégrations) - Mise en place du serveur de production et du serveur d'intégration, - Mise en production d'un outil de gestion de clients (3000 POS) et (1000 TPI), - Mise en place de Flux (PushPrix, Changement de prix automatique), - Gestion et suivi des déploiements applicatifs sur le périmètre cible, - Reporting sur tous processus médiacontact, - Maintenance sur les flux de données métiers, - Formation de la nouvelle équipe sur mes tâches",

        // Contact Form Placeholders
        'contact.form.name': 'Votre nom',
        'contact.form.email': 'Votre email',
        'contact.form.subject': 'Sujet',
        'contact.form.message': 'Votre message',
    },
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.projects': 'Projects',
        'nav.services': 'Services',
        'nav.contact': 'Contact',
        
        // Hero Section
        'hero.title': 'Full Stack Developer',
        'hero.subtitle': 'Creator of innovative web solutions',
        'hero.cta': 'Discover my services',
        'hero.cv': 'Download my CV',
        'hero.description': 'Passionate engineer creating innovative solutions and participating in decisive projects',
        'hero.projects': 'View My Projects',
        'hero.services': 'Discover My Services',
        
        // Services
        'services.title': 'My Services',
        'services.web': 'Web Development',
        'services.web.desc': 'Creation of modern and responsive websites',
        'services.mobile': 'Mobile Applications',
        'services.mobile.desc': 'iOS and Android app development',
        'services.backend': 'Backend Solutions',
        'services.backend.desc': 'API and database development',
        'services.maintenance': 'Maintenance and Support',
        'services.maintenance.desc': 'Technical assistance and maintenance',
        'services.seo': 'SEO Optimization',
        'services.seo.desc': 'Web visibility improvement',
        'services.training': 'Training and Consulting',
        'services.training.desc': 'Technical training and guidance',
        'services.uiux': 'UI/UX Design',
        'services.uiux.desc': 'Modern user interface creation',
        'services.security': 'Web Security',
        'services.security.desc': 'Application protection and security',
        'services.integration': 'System Integration',
        'services.integration.desc': 'Service connection and synchronization',
        'services.wordpress': 'WordPress Migration',
        'services.wordpress.desc': 'Convert existing sites to WordPress',
        
        // Contact
        'contact.title': 'Contact Me',
        'contact.name': 'Name',
        'contact.email': 'Email',
        'contact.subject': 'Subject',
        'contact.message': 'Message',
        'contact.send': 'Send',
        'contact.success': 'Message sent successfully!',
        'contact.error': 'An error occurred. Please try again.',
        
        // Contact Success Popup
        'contact.success.title': 'Message sent!',
        'contact.success.message': 'I will get back to you as soon as possible.',
        'contact.success.close': 'Close',
        
        // Contact Section
        'contact.talk': 'Let\'s talk about your project',
        'contact.description': 'Feel free to contact me to discuss your projects, training needs, or any questions.',
        'contact.download.cv': 'Download my CV',
        
        // Footer
        'footer.rights': 'All rights reserved.',
        
        // Language Switch
        'lang.switch': 'Passer en Français',
        
        // Privacy Policy
        'privacy.title': 'Privacy Policy',
        'privacy.intro': 'This privacy policy describes how we collect, use, and protect your personal information.',
        'privacy.collection': 'Information Collection',
        'privacy.collection.text': 'We collect information that you provide directly through the contact form, including your name and email address.',
        'privacy.use': 'Use of Information',
        'privacy.use.text': 'The collected information is used to respond to your contact requests and improve our services.',
        'privacy.protection': 'Information Protection',
        'privacy.protection.text': 'We implement appropriate security measures to protect your personal information.',
        'privacy.cookies': 'Cookies',
        'privacy.cookies.text': 'Our website uses cookies to enhance your browsing experience. You can disable cookies in your browser settings.',
        'privacy.rights': 'Your Rights',
        'privacy.rights.text': 'You have the right to access, correct, and delete your personal data. To exercise these rights, please contact us.',
        'privacy.contact': 'Contact Us',
        'privacy.contact.text': 'For any questions regarding this privacy policy, please contact us at:',
        'privacy.lastUpdate': 'Last updated:',
        
        // About Section
        'about.title': 'About Me',
        'about.journey': 'My Journey',
        'about.journey.text': 'Computer Engineer passionate about development and technological innovation. I graduated from ESIGETEL with a 5-year degree in Computer Science and Telecommunications. I have 10 years of professional experience where I had the opportunity to work on major projects with clients such as: La Banque Postale, BNP Paribas (within BP2S), Axa Insurance, Total Energies etc...',
        'about.journey.goal': 'On all the projects I have participated in, my goal was to create solutions that make a difference.',
        'about.education': 'Education',
        'about.education.certification': 'Product Owner Certification at International Scrum Institute',
        'about.education.certification.desc': 'Specialization in Scrum and Agile methodologies',
        'about.education.engineer': 'Computer Engineering Degree from ESIGETEL',
        'about.education.engineer.desc': 'Specialization in cloud computing, web development and applications',
        'about.education.montreal': 'Study Semester at ETS Montreal',
        'about.education.montreal.desc': 'Software Engineering',
        'about.education.staffordshire': 'Study Semester at Staffordshire University',
        'about.education.staffordshire.desc': 'Specialization in networks and telecommunications',
        'about.education.engineer2': 'Computer Engineering Degree',
        'about.education.engineer2.desc': 'Specialization in web development and applications',
        'about.goals': 'Goals',
        'about.goals.short': 'Short term',
        'about.goals.short.desc': 'Develop my skills in web and mobile development',
        'about.goals.medium': 'Medium term',
        'about.goals.medium.desc': 'Create innovative solutions to solve concrete problems',
        'about.goals.long': 'Long term',
        'about.goals.long.desc': 'Become a recognized expert in the development field',
        'about.skills': 'Skills',
        
        // Cookie Consent
        'cookie.message': 'This site uses cookies to improve your experience.',
        'cookie.dismiss': 'Accept',
        'cookie.link': 'Learn more',

        "projects.online": "Online Projects 🌐",
        "projects.experience": "Professional Experience 💼",
        "projects.view": "View site",
        "projects.source": "Source code",
        "projects.tech": "Technical Environment",
        "projects.ohmyfood.desc": "Allows you to find the best restaurants in your city and book a table based on your location. You can also view the menu of each restaurant.",
        "projects.portfolio.desc": "Digital or physical portfolio that gathers and presents in a structured way technical skills, achievements, projects, and sometimes certifications or professional experiences.",
        "projects.cloudnote.desc": "Online reminder or agenda project. You can add, modify, delete appointments. You can also share your appointments with other users.",
        "projects.lbp.desc": "Within the DREG/PEA/MRE department, I joined the Rules Engine team to participate in the ODM project and set up the turnkey application around POP tools. My main tasks on this mission were: - Collection and analysis of client needs and Definition of the appropriate solution with the business - Planning of different tasks to accomplish and Packaging of the new ODM version - Testing the new ODM version in DEV with IT teams and Test development - Deployment of new ODM versions on different DEV and non-prod environments (ASSE, TFON, R7EX). Coordination between business teams, REA, Networks in PROD - Development of a Spark job in Python to apply business rules and deploy it on Jenkins. - Migration of compliance scenarios to optimize alert quality through an intelligent Machine Learning method. - Design of tables and the solution to apply (reference tables, aggregation tables...). - Implementation and realization of the turnkey project for rule deployment via tools/ POP, Gitlab, DLU, XLDeploy, XLRelease). - Gathering feedback from users (Actors and Business).",
        "projects.bp2s.desc": "I joined the BP2S TICS team as part of data flow management between applications. My main tasks on this mission were: - Collection and analysis of client needs - Definition of the appropriate solution with the business and application support - Planning of different tasks to accomplish - Coordination for flow coding and firewall openings following BPSS protocols - Setting up validation tests with clients - Coordination of bug resolution related to coding - Coordination and planning of environment changes at BNP and its clients - Management of infrastructure change impact at the client - Management of incidents related to file transfers - Preparation of campaign strategy and deliverables - Diagnosis and analysis of encountered problems: Tools, Scripts and Materials - Daily reporting to MOA - Management of a team of five people (analysts and testers) - Responding to BP2S Clients and business requests - Follow-up of each created anomaly lifecycle - Knowledge transfer to MOA, and new collaborators",
        "projects.axa.desc": "I joined the AXA Group Solutions team around the Aura project, which is an online questionnaire intended for Axa entities offering online insurance services. My tasks were: - Integration of insurance software within AXA entities internationally (Italy, Japan, Spain, Singapore) - Definition of scope and integration into entity network architecture - Software adaptation to entity needs - Deployment management and version management - Definition of needs vis-à-vis the software publisher, to maintain the same common base for all AXA entities, while adapting configuration possibilities - Implementation of management and package delivery processes to ensure project quality over time and during volume increase with new entities entering the project - Describe each retained functionality in the form of a User Story small enough to be implemented in 1 iteration - Prioritize all identified and written Stories within the Product Backlog. - Maintain the Product Backlog and constantly seek to maximize business value for users. - Management of development teams for ancillary tools (reporting, statistics...) to complete the offer to entities - Analysis of security and performance issues - Gathering feedback from users (Actors and Business). - Update of the Implementation Guide.",
        "projects.total.desc": "I joined the brilliant TTED team of TOTAL's IT department as part of the ISI project. My various tasks on this innovative project are: - Train support teams, - Set up and monitor request processing procedures, - Coordinate delivery projects (planning, activity prioritization), - Manage operational scope compliance, - Test and debug C# code, - Decompile C# applications to obtain source code, - Add new features to existing code, - Develop C# application tools, - Scripting to automate server and client-side actions, - Participate in writing and updating the PRA, - Manage and monitor changes / prepare change committees (CAB) - Participate in various meetings with different actors of the ISIS project with various actors such as CA, client, ... (meetings and Minutes in English), - Install and document the application on servers (production and integration) - Set up the production server and integration server, - Put into production a client management tool (3000 POS) and (1000 TPI), - Set up Flows (PushPrice, Automatic price change), - Manage and monitor application deployments on the target scope, - Reporting on all mediacontact processes, - Maintenance on business data flows, - Train the new team on my tasks",

        // Contact Form Placeholders
        'contact.form.name': 'Your name',
        'contact.form.email': 'Your email',
        'contact.form.subject': 'Subject',
        'contact.form.message': 'Your message',
    }
}; 