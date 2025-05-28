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
            element.textContent = translations[currentLang][key];
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