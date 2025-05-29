// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-K6EC83WWZP');

// Cookie Consent
window.addEventListener("load", function(){
    window.cookieconsent.initialise({
        palette: {
            popup: { background: "#000000" },
            button: { background: "#f1d600", text: "#000000" }
        },
        theme: "classic",
        position: "bottom",
        content: {
            message: "Ce site utilise des cookies pour améliorer votre expérience.",
            dismiss: "Accepter",
            link: "En savoir plus",
            href: "https://www.daoudayinde.com/politique-de-confidentialite"
        }
    });
});

// Language Management
let currentLang = localStorage.getItem('language') || 'fr';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    // Recharger la page pour appliquer les changements
    window.location.reload();
}

function updateContent() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLang][key]) {
            // Gestion spéciale pour les placeholders du formulaire de contact
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (key === 'contact.form.name' || key === 'contact.form.email' || key === 'contact.form.subject') {
                    element.placeholder = translations[currentLang][key];
                }
            }
            // Gestion des listes de tâches
            if (key.endsWith('.list.0') || key.endsWith('.list.1') || key.endsWith('.list.2') || 
                key.endsWith('.list.3') || key.endsWith('.list.4') || key.endsWith('.list.5') || 
                key.endsWith('.list.6') || key.endsWith('.list.7') || key.endsWith('.list.8')) {
                const baseKey = key.split('.list')[0];
                const index = parseInt(key.split('.list.')[1]);
                if (translations[currentLang][baseKey + '.list'] && 
                    translations[currentLang][baseKey + '.list'][index]) {
                    element.textContent = translations[currentLang][baseKey + '.list'][index];
                }
            } else {
            element.textContent = translations[currentLang][key];
            }
        }
    });
    
    // Update language switcher text
    const langSwitch = document.querySelector('.language-switcher');
    if (langSwitch) {
        langSwitch.textContent = translations[currentLang]['lang.switch'];
    }
}

// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Gestion du formulaire de contact
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                showPopup();
                form.reset();
            } else {
                alert('Une erreur est survenue. Veuillez réessayer.');
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        });
        
        return false;
    });
}

function showPopup() {
    document.getElementById('popupOverlay').style.display = 'block';
    document.getElementById('successPopup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
    document.getElementById('successPopup').style.display = 'none';
}

// Animation au défilement
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer les sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Gestion du menu actif
const currentLocation = location.href;
const menuItems = document.querySelectorAll('.nav-links a');
menuItems.forEach(item => {
    if(item.href === currentLocation) {
        item.classList.add('active');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add language switcher to all pages
    const langSwitch = document.createElement('div');
    langSwitch.className = 'language-switcher';
    langSwitch.textContent = translations[currentLang]['lang.switch'];
    langSwitch.addEventListener('click', () => {
        setLanguage(currentLang === 'fr' ? 'en' : 'fr');
    });
    document.body.appendChild(langSwitch);
    
    // Initial content update
    updateContent();
    
    // Add data-translate attributes to elements
    document.querySelectorAll('a[href="index.html"]').forEach(el => el.setAttribute('data-translate', 'nav.home'));
    document.querySelectorAll('a[href="projets.html"]').forEach(el => el.setAttribute('data-translate', 'nav.projects'));
    document.querySelectorAll('a[href="services.html"]').forEach(el => el.setAttribute('data-translate', 'nav.services'));
    document.querySelectorAll('a[href="contact.html"]').forEach(el => el.setAttribute('data-translate', 'nav.contact'));
});

// Experience Popup Functions
function openExperiencePopup(experienceId) {
    const popup = document.getElementById('experiencePopup');
    const experienceCard = document.querySelector(`[onclick="openExperiencePopup('${experienceId}')"]`).closest('.experience-card');
    
    // Récupérer les informations de l'expérience
    const logo = experienceCard.querySelector('.company-logo').src;
    const title = experienceCard.querySelector('.experience-info h3').textContent;
    const company = experienceCard.querySelector('.experience-info h4').textContent;
    const duration = experienceCard.querySelector('.duration').textContent;
    const description = experienceCard.querySelector('.experience-content p').textContent;
    
    // Mettre à jour le contenu de la popup
    document.getElementById('popup-logo').src = logo;
    document.getElementById('popup-logo').alt = company;
    document.getElementById('popup-title').textContent = title;
    document.getElementById('popup-company').textContent = company;
    document.getElementById('popup-duration').textContent = duration;
    document.getElementById('popup-desc').textContent = description;
    
    // Mettre à jour les tâches
    const tasksTitle = translations[currentLang][`projects.${experienceId}.tasks`];
    document.getElementById('popup-tasks-title').textContent = tasksTitle;
    
    const tasksList = document.getElementById('popup-tasks-list');
    tasksList.innerHTML = '';
    
    // Ajouter les tâches
    const tasks = translations[currentLang][`projects.${experienceId}.tasks.list`];
    if (tasks && Array.isArray(tasks)) {
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;
            tasksList.appendChild(li);
        });
    }
    
    // Mettre à jour les compétences techniques
    const skillsContainer = document.getElementById('popup-skills');
    skillsContainer.innerHTML = '';
    
    // Ajouter les compétences techniques depuis les traductions
    const techSkills = translations[currentLang][`projects.${experienceId}.tech`];
    if (techSkills && Array.isArray(techSkills)) {
        techSkills.forEach(skill => {
            const skillSpan = document.createElement('span');
            skillSpan.textContent = skill;
            skillsContainer.appendChild(skillSpan);
        });
    }
    
    // Afficher la popup
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeExperiencePopup() {
    const popup = document.getElementById('experiencePopup');
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close popup when clicking outside
window.onclick = function(event) {
    const popup = document.getElementById('experiencePopup');
    if (event.target === popup) {
        closeExperiencePopup();
    }
}

// Close popup when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeExperiencePopup();
    }
}); 