// Navigation mobile
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