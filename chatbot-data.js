// Chatbot Data Management
class ChatbotDataManager {
    constructor() {
        this.apiEndpoint = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with your Formspree endpoint
        this.localStorageKey = 'chatbot_leads';
    }

    // Save lead data locally
    saveLead(leadData) {
        try {
            const leads = this.getLeads();
            leadData.id = Date.now().toString();
            leadData.timestamp = new Date().toISOString();
            leads.push(leadData);
            localStorage.setItem(this.localStorageKey, JSON.stringify(leads));
            return true;
        } catch (error) {
            console.error('Error saving lead:', error);
            return false;
        }
    }

    // Get all leads from localStorage
    getLeads() {
        try {
            const leads = localStorage.getItem(this.localStorageKey);
            return leads ? JSON.parse(leads) : [];
        } catch (error) {
            console.error('Error getting leads:', error);
            return [];
        }
    }

    // Send lead data to server
    async sendLead(leadData) {
        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: leadData.contact.name,
                    email: leadData.contact.email,
                    phone: leadData.contact.phone,
                    location: leadData.contact.location,
                    company: leadData.contact.company,
                    projectDetails: leadData.contact.projectDetails,
                    service: leadData.service,
                    budget: leadData.budget,
                    timeline: leadData.timeline,
                    source: 'Chatbot',
                    timestamp: leadData.timestamp
                })
            });

            if (response.ok) {
                return { success: true, message: 'Lead sent successfully' };
            } else {
                throw new Error('Failed to send lead');
            }
        } catch (error) {
            console.error('Error sending lead:', error);
            return { success: false, message: 'Failed to send lead' };
        }
    }

    // Generate lead summary for email
    generateLeadSummary(leadData) {
        const currentLang = localStorage.getItem('language') || 'fr';
        
        const serviceNames = {
            fr: {
                web_dev: 'Développement Web',
                mobile_app: 'Application Mobile',
                backend: 'Solutions Backend',
                maintenance: 'Maintenance & Support',
                seo: 'Optimisation SEO',
                training: 'Formation & Conseil',
                uiux: 'Design UI/UX',
                security: 'Sécurité Web',
                integration: 'Intégration Systèmes',
                wordpress: 'Migration WordPress'
            },
            en: {
                web_dev: 'Web Development',
                mobile_app: 'Mobile Application',
                backend: 'Backend Solutions',
                maintenance: 'Maintenance & Support',
                seo: 'SEO Optimization',
                training: 'Training & Consulting',
                uiux: 'UI/UX Design',
                security: 'Web Security',
                integration: 'System Integration',
                wordpress: 'WordPress Migration'
            }
        };

        const budgetNames = {
            fr: {
                low: 'Moins de 1000€',
                medium: '1000€ - 5000€',
                high: 'Plus de 5000€'
            },
            en: {
                low: 'Less than $1000',
                medium: '$1000 - $5000',
                high: 'More than $5000'
            }
        };

        const timelineNames = {
            fr: {
                urgent: 'Urgent (1-2 semaines)',
                normal: 'Normal (1-2 mois)',
                flexible: 'Flexible (3+ mois)'
            },
            en: {
                urgent: 'Urgent (1-2 weeks)',
                normal: 'Normal (1-2 months)',
                flexible: 'Flexible (3+ months)'
            }
        };

        return `
Nouveau Lead du Chatbot - ${new Date().toLocaleDateString()}

INFORMATIONS CLIENT:
- Nom: ${leadData.contact.name}
- Email: ${leadData.contact.email}
- Téléphone: ${leadData.contact.phone || 'Non renseigné'}
- Localisation: ${leadData.contact.location}
- Entreprise: ${leadData.contact.company || 'Non renseigné'}

PROJET:
- Service demandé: ${serviceNames[currentLang][leadData.service]}
- Budget: ${budgetNames[currentLang][leadData.budget]}
- Délai: ${timelineNames[currentLang][leadData.timeline]}
- Détails: ${leadData.contact.projectDetails || 'Non renseigné'}

Source: Chatbot Portfolio
Timestamp: ${leadData.timestamp}
        `;
    }

    // Export leads to CSV
    exportLeadsToCSV() {
        const leads = this.getLeads();
        if (leads.length === 0) {
            alert('Aucun lead à exporter');
            return;
        }

        const headers = [
            'ID', 'Nom', 'Email', 'Téléphone', 'Localisation', 'Entreprise',
            'Service', 'Budget', 'Délai', 'Détails Projet', 'Date'
        ];

        const csvContent = [
            headers.join(','),
            ...leads.map(lead => [
                lead.id,
                `"${lead.contact.name}"`,
                `"${lead.contact.email}"`,
                `"${lead.contact.phone || ''}"`,
                `"${lead.contact.location}"`,
                `"${lead.contact.company || ''}"`,
                `"${lead.service}"`,
                `"${lead.budget}"`,
                `"${lead.timeline}"`,
                `"${lead.contact.projectDetails || ''}"`,
                `"${lead.timestamp}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `chatbot_leads_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Clear all leads
    clearLeads() {
        localStorage.removeItem(this.localStorageKey);
    }

    // Get lead statistics
    getLeadStats() {
        const leads = this.getLeads();
        const stats = {
            total: leads.length,
            byService: {},
            byBudget: {},
            byTimeline: {},
            recent: leads.filter(lead => {
                const leadDate = new Date(lead.timestamp);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return leadDate > weekAgo;
            }).length
        };

        leads.forEach(lead => {
            stats.byService[lead.service] = (stats.byService[lead.service] || 0) + 1;
            stats.byBudget[lead.budget] = (stats.byBudget[lead.budget] || 0) + 1;
            stats.byTimeline[lead.timeline] = (stats.byTimeline[lead.timeline] || 0) + 1;
        });

        return stats;
    }
}

// Initialize data manager
window.chatbotDataManager = new ChatbotDataManager();



