/**
 * Animations hero page d'accueil — particules, typing, parallax
 */
(function () {
    const hero = document.querySelector('.hero-modern');
    if (!hero) return;

    const lang = localStorage.getItem('language') || 'fr';
    const t = (window.translations && window.translations[lang]) || {};

    function buildRoleSlides() {
        const activePrefix = t['hero.typing.prefix.active'] || 'Je suis ';
        const learningPrefix = t['hero.typing.prefix.learning'] || 'Je me forme en ';
        const current = t['hero.roles.current'] || [];
        const learning = t['hero.roles.learning'] || [];

        return [
            ...current.map(role => ({ prefix: activePrefix, text: role })),
            ...learning.map(role => ({ prefix: learningPrefix, text: role }))
        ];
    }

    const roleSlides = buildRoleSlides();

    /* --- Particules canvas --- */
    const canvas = hero.querySelector('.hero-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let w, h;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function resize() {
            w = canvas.width = hero.offsetWidth;
            h = canvas.height = hero.offsetHeight;
        }

        function initParticles() {
            const count = Math.min(55, Math.floor(w / 28));
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 1.8 + 0.6,
                a: Math.random() * 0.45 + 0.15
            }));
        }

        function drawParticles() {
            ctx.clearRect(0, 0, w, h);
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(148, 163, 184, ${p.a})`;
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const q = particles[j];
                    const dx = p.x - q.x;
                    const dy = p.y - q.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 * (1 - dist / 110)})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(drawParticles);
        }

        resize();
        initParticles();
        window.addEventListener('resize', () => { resize(); initParticles(); });
        if (!prefersReduced) drawParticles();
    }

    /* --- Effet typing : postes actuels + formations visées --- */
    const typingEl = document.getElementById('hero-typing');
    const prefixEl = document.getElementById('hero-typing-prefix');

    if (typingEl && roleSlides.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let slideIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function applySlide(slide, typedLength) {
            if (prefixEl) prefixEl.textContent = slide.prefix;
            typingEl.textContent = slide.text.slice(0, typedLength);
        }

        function tick() {
            const slide = roleSlides[slideIndex];
            if (!slide) return;

            if (!deleting) {
                charIndex++;
                applySlide(slide, charIndex);
                if (charIndex === slide.text.length) {
                    setTimeout(() => { deleting = true; tick(); }, 2400);
                    return;
                }
                setTimeout(tick, 52);
            } else {
                charIndex--;
                applySlide(slide, charIndex);
                if (charIndex === 0) {
                    deleting = false;
                    slideIndex = (slideIndex + 1) % roleSlides.length;
                    setTimeout(tick, 450);
                    return;
                }
                setTimeout(tick, 26);
            }
        }

        applySlide(roleSlides[0], 0);
        setTimeout(tick, 800);
    } else if (typingEl && roleSlides.length) {
        if (prefixEl) prefixEl.textContent = roleSlides[0].prefix;
        typingEl.textContent = roleSlides[0].text;
    }

    /* --- Parallax souris sur glows + visuel --- */
    const glows = hero.querySelectorAll('.hero-glow');
    const visual = hero.querySelector('.hero-visual');
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        targetX = (e.clientX - rect.left) / rect.width - 0.5;
        targetY = (e.clientY - rect.top) / rect.height - 0.5;
    });

    hero.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
    });

    function parallaxLoop() {
        currentX += (targetX - currentX) * 0.06;
        currentY += (targetY - currentY) * 0.06;

        glows.forEach((g, i) => {
            const factor = i === 0 ? 28 : 20;
            g.style.transform = `translate(${currentX * factor}px, ${currentY * factor}px)`;
        });
        if (visual) {
            visual.style.transform = `translate(${currentX * -12}px, ${currentY * -10}px)`;
        }
        requestAnimationFrame(parallaxLoop);
    }
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        parallaxLoop();
    }

    /* --- Compteurs stats au chargement (hero visible) --- */
    hero.querySelectorAll('[data-count]').forEach(el => {
        if (el.dataset.counted) return;
        el.dataset.counted = 'true';
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        if (Number.isNaN(target)) return;
        const duration = 1600;
        const start = performance.now() + 600;
        function tickCounter(now) {
            if (now < start) { requestAnimationFrame(tickCounter); return; }
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (progress < 1) requestAnimationFrame(tickCounter);
        }
        requestAnimationFrame(tickCounter);
    });
})();
