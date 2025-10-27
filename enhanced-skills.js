// Enhanced Skills Data with Modern Technologies
const enhancedSkillsData = {
    fr: [
        {
            category: "frontend",
            title: "Frontend & UI/UX",
            icon: "🎨",
            skills: [
                { name: "React 18", level: 95 },
                { name: "Next.js 14", level: 90 },
                { name: "Vue.js 3", level: 85 },
                { name: "TypeScript", level: 92 },
                { name: "Tailwind CSS", level: 88 },
                { name: "Figma", level: 80 },
                { name: "Web Components", level: 75 },
                { name: "PWA", level: 85 }
            ]
        },
        {
            category: "backend",
            title: "Backend & APIs",
            icon: "⚙️",
            skills: [
                { name: "Node.js", level: 90 },
                { name: "Python", level: 85 },
                { name: "GraphQL", level: 80 },
                { name: "REST APIs", level: 95 },
                { name: "Microservices", level: 75 },
                { name: "PostgreSQL", level: 88 },
                { name: "MongoDB", level: 82 },
                { name: "Redis", level: 78 }
            ]
        },
        {
            category: "mobile",
            title: "Mobile & PWA",
            icon: "📱",
            skills: [
                { name: "React Native", level: 88 },
                { name: "Flutter", level: 75 },
                { name: "Swift", level: 70 },
                { name: "Kotlin", level: 72 },
                { name: "Expo", level: 85 },
                { name: "Firebase", level: 90 },
                { name: "App Store", level: 80 },
                { name: "Google Play", level: 80 }
            ]
        },
        {
            category: "ai",
            title: "Intelligence Artificielle",
            icon: "🤖",
            skills: [
                { name: "OpenAI API", level: 85 },
                { name: "TensorFlow", level: 70 },
                { name: "PyTorch", level: 65 },
                { name: "LangChain", level: 80 },
                { name: "ChatGPT Integration", level: 90 },
                { name: "Machine Learning", level: 75 },
                { name: "NLP", level: 70 },
                { name: "Computer Vision", level: 65 }
            ]
        },
        {
            category: "cloud",
            title: "Cloud & DevOps",
            icon: "☁️",
            skills: [
                { name: "AWS", level: 85 },
                { name: "Azure", level: 80 },
                { name: "Docker", level: 90 },
                { name: "Kubernetes", level: 75 },
                { name: "Terraform", level: 70 },
                { name: "CI/CD", level: 88 },
                { name: "GitHub Actions", level: 85 },
                { name: "Monitoring", level: 82 }
            ]
        },
        {
            category: "security",
            title: "Sécurité & Performance",
            icon: "🔒",
            skills: [
                { name: "Web Security", level: 85 },
                { name: "HTTPS/SSL", level: 90 },
                { name: "OAuth 2.0", level: 80 },
                { name: "JWT", level: 88 },
                { name: "Performance", level: 92 },
                { name: "SEO", level: 85 },
                { name: "Analytics", level: 78 },
                { name: "GDPR", level: 82 }
            ]
        },
        {
            category: "blockchain",
            title: "Blockchain & Web3",
            icon: "🔗",
            skills: [
                { name: "Solidity", level: 70 },
                { name: "Web3.js", level: 75 },
                { name: "Ethereum", level: 72 },
                { name: "Smart Contracts", level: 68 },
                { name: "NFT", level: 65 },
                { name: "DeFi", level: 60 },
                { name: "MetaMask", level: 80 },
                { name: "IPFS", level: 70 }
            ]
        },
        {
            category: "tools",
            title: "Outils & Technologies",
            icon: "🛠️",
            skills: [
                { name: "Git", level: 95 },
                { name: "VS Code", level: 92 },
                { name: "Linux", level: 85 },
                { name: "Bash", level: 80 },
                { name: "Webpack", level: 75 },
                { name: "Vite", level: 88 },
                { name: "Jest", level: 82 },
                { name: "Cypress", level: 78 }
            ]
        }
    ],
    en: [
        {
            category: "frontend",
            title: "Frontend & UI/UX",
            icon: "🎨",
            skills: [
                { name: "React 18", level: 95 },
                { name: "Next.js 14", level: 90 },
                { name: "Vue.js 3", level: 85 },
                { name: "TypeScript", level: 92 },
                { name: "Tailwind CSS", level: 88 },
                { name: "Figma", level: 80 },
                { name: "Web Components", level: 75 },
                { name: "PWA", level: 85 }
            ]
        },
        {
            category: "backend",
            title: "Backend & APIs",
            icon: "⚙️",
            skills: [
                { name: "Node.js", level: 90 },
                { name: "Python", level: 85 },
                { name: "GraphQL", level: 80 },
                { name: "REST APIs", level: 95 },
                { name: "Microservices", level: 75 },
                { name: "PostgreSQL", level: 88 },
                { name: "MongoDB", level: 82 },
                { name: "Redis", level: 78 }
            ]
        },
        {
            category: "mobile",
            title: "Mobile & PWA",
            icon: "📱",
            skills: [
                { name: "React Native", level: 88 },
                { name: "Flutter", level: 75 },
                { name: "Swift", level: 70 },
                { name: "Kotlin", level: 72 },
                { name: "Expo", level: 85 },
                { name: "Firebase", level: 90 },
                { name: "App Store", level: 80 },
                { name: "Google Play", level: 80 }
            ]
        },
        {
            category: "ai",
            title: "Artificial Intelligence",
            icon: "🤖",
            skills: [
                { name: "OpenAI API", level: 85 },
                { name: "TensorFlow", level: 70 },
                { name: "PyTorch", level: 65 },
                { name: "LangChain", level: 80 },
                { name: "ChatGPT Integration", level: 90 },
                { name: "Machine Learning", level: 75 },
                { name: "NLP", level: 70 },
                { name: "Computer Vision", level: 65 }
            ]
        },
        {
            category: "cloud",
            title: "Cloud & DevOps",
            icon: "☁️",
            skills: [
                { name: "AWS", level: 85 },
                { name: "Azure", level: 80 },
                { name: "Docker", level: 90 },
                { name: "Kubernetes", level: 75 },
                { name: "Terraform", level: 70 },
                { name: "CI/CD", level: 88 },
                { name: "GitHub Actions", level: 85 },
                { name: "Monitoring", level: 82 }
            ]
        },
        {
            category: "security",
            title: "Security & Performance",
            icon: "🔒",
            skills: [
                { name: "Web Security", level: 85 },
                { name: "HTTPS/SSL", level: 90 },
                { name: "OAuth 2.0", level: 80 },
                { name: "JWT", level: 88 },
                { name: "Performance", level: 92 },
                { name: "SEO", level: 85 },
                { name: "Analytics", level: 78 },
                { name: "GDPR", level: 82 }
            ]
        },
        {
            category: "blockchain",
            title: "Blockchain & Web3",
            icon: "🔗",
            skills: [
                { name: "Solidity", level: 70 },
                { name: "Web3.js", level: 75 },
                { name: "Ethereum", level: 72 },
                { name: "Smart Contracts", level: 68 },
                { name: "NFT", level: 65 },
                { name: "DeFi", level: 60 },
                { name: "MetaMask", level: 80 },
                { name: "IPFS", level: 70 }
            ]
        },
        {
            category: "tools",
            title: "Tools & Technologies",
            icon: "🛠️",
            skills: [
                { name: "Git", level: 95 },
                { name: "VS Code", level: 92 },
                { name: "Linux", level: 85 },
                { name: "Bash", level: 80 },
                { name: "Webpack", level: 75 },
                { name: "Vite", level: 88 },
                { name: "Jest", level: 82 },
                { name: "Cypress", level: 78 }
            ]
        }
    ]
};

// Export for use in HTML
window.enhancedSkillsData = enhancedSkillsData;
