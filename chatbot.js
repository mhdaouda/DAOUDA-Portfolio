// Chatbot Logic
class Chatbot {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'fr';
        this.conversationState = 'welcome';
        this.userData = {};
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.bindEvents();
        this.startConversation();
    }

    createChatbotHTML() {
        // Create chatbot toggle button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'chatbot-toggle';
        toggleButton.innerHTML = '💬';
        toggleButton.id = 'chatbot-toggle';
        document.body.appendChild(toggleButton);

        // Create chatbot container
        const chatbotContainer = document.createElement('div');
        chatbotContainer.className = 'chatbot-container';
        chatbotContainer.id = 'chatbot-container';
        chatbotContainer.innerHTML = `
            <div class="chatbot-header">
                <h3 data-translate="chatbot.title">Assistant IA</h3>
                <button class="chatbot-close" id="chatbot-close">×</button>
            </div>
            <div class="chatbot-messages" id="chatbot-messages"></div>
            <div class="chatbot-input-container">
                <input type="text" class="chatbot-input" id="chatbot-input" placeholder="Tapez votre message...">
                <button class="chatbot-send" id="chatbot-send">➤</button>
            </div>
        `;
        document.body.appendChild(chatbotContainer);
    }

    bindEvents() {
        const toggle = document.getElementById('chatbot-toggle');
        const close = document.getElementById('chatbot-close');
        const input = document.getElementById('chatbot-input');
        const send = document.getElementById('chatbot-send');

        toggle.addEventListener('click', () => this.toggleChatbot());
        close.addEventListener('click', () => this.closeChatbot());
        send.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    toggleChatbot() {
        const container = document.getElementById('chatbot-container');
        const toggle = document.getElementById('chatbot-toggle');
        
        if (this.isOpen) {
            this.closeChatbot();
        } else {
            container.style.display = 'flex';
            this.isOpen = true;
            toggle.classList.add('active');
            document.getElementById('chatbot-input').focus();
        }
    }

    closeChatbot() {
        const container = document.getElementById('chatbot-container');
        const toggle = document.getElementById('chatbot-toggle');
        
        container.style.display = 'none';
        this.isOpen = false;
        toggle.classList.remove('active');
    }

    startConversation() {
        this.addBotMessage(translations[this.currentLang]['chatbot.welcome']);
        this.showServiceOptions();
    }

    showServiceOptions() {
        const services = [
            { key: 'chatbot.web_dev', value: 'web_dev' },
            { key: 'chatbot.mobile_app', value: 'mobile_app' },
            { key: 'chatbot.backend', value: 'backend' },
            { key: 'chatbot.maintenance', value: 'maintenance' },
            { key: 'chatbot.seo', value: 'seo' },
            { key: 'chatbot.training', value: 'training' },
            { key: 'chatbot.uiux', value: 'uiux' },
            { key: 'chatbot.security', value: 'security' },
            { key: 'chatbot.integration', value: 'integration' },
            { key: 'chatbot.wordpress', value: 'wordpress' }
        ];

        this.addBotMessage(translations[this.currentLang]['chatbot.need_help']);
        this.showOptions(services, 'service');
    }

    askBudget() {
        const budgetOptions = [
            { key: 'chatbot.budget.low', value: 'low' },
            { key: 'chatbot.budget.medium', value: 'medium' },
            { key: 'chatbot.budget.high', value: 'high' }
        ];

        this.addBotMessage(translations[this.currentLang]['chatbot.budget']);
        this.showOptions(budgetOptions, 'budget');
    }

    askTimeline() {
        const timelineOptions = [
            { key: 'chatbot.timeline.urgent', value: 'urgent' },
            { key: 'chatbot.timeline.normal', value: 'normal' },
            { key: 'chatbot.timeline.flexible', value: 'flexible' }
        ];

        this.addBotMessage(translations[this.currentLang]['chatbot.timeline']);
        this.showOptions(timelineOptions, 'timeline');
    }

    askContactInfo() {
        this.addBotMessage(translations[this.currentLang]['chatbot.contact_info']);
        this.showContactForm();
    }

    showContactForm() {
        const formHTML = `
            <div class="chatbot-contact-form">
                <input type="text" id="chatbot-name" placeholder="${translations[this.currentLang]['chatbot.name']}" required>
                <input type="email" id="chatbot-email" placeholder="${translations[this.currentLang]['chatbot.email']}" required>
                <input type="tel" id="chatbot-phone" placeholder="${translations[this.currentLang]['chatbot.phone']}">
                <input type="text" id="chatbot-location" placeholder="${translations[this.currentLang]['chatbot.location']}" required>
                <input type="text" id="chatbot-company" placeholder="${translations[this.currentLang]['chatbot.company']}">
                <textarea id="chatbot-project-details" placeholder="${translations[this.currentLang]['chatbot.project_details']}" rows="3"></textarea>
                <button onclick="chatbot.submitContactForm()">${translations[this.currentLang]['chatbot.submit']}</button>
            </div>
        `;
        
        this.addMessage(formHTML, 'bot');
    }

    async submitContactForm() {
        const name = document.getElementById('chatbot-name').value;
        const email = document.getElementById('chatbot-email').value;
        const phone = document.getElementById('chatbot-phone').value;
        const location = document.getElementById('chatbot-location').value;
        const company = document.getElementById('chatbot-company').value;
        const projectDetails = document.getElementById('chatbot-project-details').value;

        if (!name || !email || !location) {
            this.addBotMessage(translations[this.currentLang]['chatbot.error']);
            return;
        }

        this.userData.contact = {
            name, email, phone, location, company, projectDetails
        };

        // Save lead data
        const leadSaved = window.chatbotDataManager.saveLead(this.userData);
        
        if (leadSaved) {
            // Try to send lead to server
            const sendResult = await window.chatbotDataManager.sendLead(this.userData);
            if (sendResult.success) {
                console.log('Lead sent successfully');
            } else {
                console.log('Lead saved locally, will retry later');
            }
        }

        this.conversationState = 'solution';
        this.showSolution();
    }

    showSolution() {
        const solution = this.generateSolution();
        const priceRange = this.getPriceRange();
        
        this.addBotMessage(translations[this.currentLang]['chatbot.solution']);
        this.addMessage(solution, 'bot');
        
        this.addMessage(`
            <div class="chatbot-price">
                ${translations[this.currentLang]['chatbot.price_range']} ${priceRange}
            </div>
        `, 'bot');

        this.addBotMessage(translations[this.currentLang]['chatbot.next_steps']);
        this.showNextSteps();
    }

    generateSolution() {
        const service = this.userData.service;
        const budget = this.userData.budget;
        const timeline = this.userData.timeline;

        let solution = '';
        
        switch(service) {
            case 'web_dev':
                solution = this.currentLang === 'fr' 
                    ? 'Je recommande un développement web personnalisé avec les dernières technologies (React, Vue.js, ou Angular) pour créer une expérience utilisateur optimale.'
                    : 'I recommend a custom web development with the latest technologies (React, Vue.js, or Angular) to create an optimal user experience.';
                break;
            case 'mobile_app':
                solution = this.currentLang === 'fr'
                    ? 'Je propose le développement d\'une application mobile native ou cross-platform (React Native, Flutter) selon vos besoins spécifiques.'
                    : 'I propose developing a native or cross-platform mobile application (React Native, Flutter) according to your specific needs.';
                break;
            case 'backend':
                solution = this.currentLang === 'fr'
                    ? 'Je vais créer une architecture backend robuste avec des APIs RESTful, base de données optimisée et sécurité renforcée.'
                    : 'I will create a robust backend architecture with RESTful APIs, optimized database and enhanced security.';
                break;
            default:
                solution = this.currentLang === 'fr'
                    ? 'Je vais analyser vos besoins spécifiques et proposer une solution sur mesure.'
                    : 'I will analyze your specific needs and propose a tailor-made solution.';
        }

        return solution;
    }

    getPriceRange() {
        const budget = this.userData.budget;
        const service = this.userData.service;
        
        let basePrice = 0;
        let multiplier = 1;

        // Base prices by service
        switch(service) {
            case 'web_dev': basePrice = 2000; break;
            case 'mobile_app': basePrice = 3000; break;
            case 'backend': basePrice = 2500; break;
            case 'maintenance': basePrice = 500; break;
            case 'seo': basePrice = 800; break;
            case 'training': basePrice = 1000; break;
            case 'uiux': basePrice = 1500; break;
            case 'security': basePrice = 2000; break;
            case 'integration': basePrice = 3000; break;
            case 'wordpress': basePrice = 1200; break;
        }

        // Budget multiplier
        switch(budget) {
            case 'low': multiplier = 0.7; break;
            case 'medium': multiplier = 1; break;
            case 'high': multiplier = 1.5; break;
        }

        const minPrice = Math.round(basePrice * multiplier * 0.8);
        const maxPrice = Math.round(basePrice * multiplier * 1.2);

        return this.currentLang === 'fr' 
            ? `${minPrice}€ - ${maxPrice}€`
            : `$${minPrice} - $${maxPrice}`;
    }

    showNextSteps() {
        const nextSteps = [
            { key: 'chatbot.contact_me', value: 'contact' },
            { key: 'chatbot.schedule', value: 'schedule' },
            { key: 'chatbot.portfolio', value: 'portfolio' }
        ];

        this.showOptions(nextSteps, 'nextstep');
    }

    handleNextStep(action) {
        switch(action) {
            case 'contact':
                window.location.href = 'contact.html';
                break;
            case 'schedule':
                // You can integrate with a calendar booking system
                this.addBotMessage(this.currentLang === 'fr' 
                    ? 'Parfait ! Je vous enverrai un lien pour planifier un appel dans les prochaines heures.'
                    : 'Perfect! I will send you a link to schedule a call in the next few hours.');
                break;
            case 'portfolio':
                window.location.href = 'projets.html';
                break;
        }
    }

    showOptions(options, type) {
        const optionsHTML = options.map(option => 
            `<div class="chatbot-option" onclick="window.chatbot.selectOption('${option.value}', '${type}')">${translations[this.currentLang][option.key]}</div>`
        ).join('');

        this.addMessage(`
            <div class="chatbot-options">
                ${optionsHTML}
            </div>
        `, 'bot');
    }

    selectOption(value, type) {
        // Remove all options
        const optionsContainer = document.querySelector('.chatbot-options');
        if (optionsContainer) {
            optionsContainer.remove();
        }

        // Handle selection based on type
        switch(type) {
            case 'service':
                this.userData.service = value;
                this.conversationState = 'budget';
                this.askBudget();
                break;
            case 'budget':
                this.userData.budget = value;
                this.conversationState = 'timeline';
                this.askTimeline();
                break;
            case 'timeline':
                this.userData.timeline = value;
                this.conversationState = 'contact';
                this.askContactInfo();
                break;
            case 'nextstep':
                this.handleNextStep(value);
                break;
        }
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message) return;

        this.addUserMessage(message);
        input.value = '';

        // Handle user input based on conversation state
        setTimeout(() => {
            this.handleUserInput(message);
        }, 500);
    }

    handleUserInput(message) {
        // Simple keyword detection for user responses
        const lowerMessage = message.toLowerCase();
        
        if (this.conversationState === 'welcome') {
            if (lowerMessage.includes('service') || lowerMessage.includes('projet') || lowerMessage.includes('help')) {
                this.showServiceOptions();
            } else {
                this.addBotMessage(translations[this.currentLang]['chatbot.need_help']);
                this.showServiceOptions();
            }
        }
    }

    addBotMessage(text) {
        this.addMessage(text, 'bot');
    }

    addUserMessage(text) {
        this.addMessage(text, 'user');
    }

    addMessage(content, type) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${type}`;
        messageDiv.innerHTML = content;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showTyping() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-typing';
        typingDiv.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return typingDiv;
    }

    hideTyping(typingDiv) {
        if (typingDiv) {
            typingDiv.remove();
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new Chatbot();
});

// Update chatbot language when language changes
function updateChatbotLanguage() {
    if (window.chatbot) {
        window.chatbot.currentLang = localStorage.getItem('language') || 'fr';
        // Update chatbot title
        const title = document.querySelector('#chatbot-container .chatbot-header h3');
        if (title) {
            title.textContent = translations[window.chatbot.currentLang]['chatbot.title'];
        }
    }
}

// Listen for language changes
window.addEventListener('storage', (e) => {
    if (e.key === 'language') {
        updateChatbotLanguage();
    }
});
