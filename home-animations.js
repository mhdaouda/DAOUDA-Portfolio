/**
 * Animations hero page d'accueil — particules, typing, parallax
 */
(function () {
    const hero = document.querySelector('.hero-modern');
    if (!hero) return;

    const lang = localStorage.getItem('language') || 'fr';
    const roles = (window.translations && window.translations[lang] && window.translations[lang]['hero.roles.list'])
        || ['Ingénieur Full-Stack', 'Consultant IT', 'Tech Lead', 'Architecte Cloud'];

    /* --- Particules canvas --- */
    const canvas = hero.querySelector('.hero-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let w, h, animId;
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
            animId = requestAnimationFrame(drawParticles);
        }

        resize();
        initParticles();
        window.addEventListener('resize', () => { resize(); initParticles(); });
        if (!prefersReduced) drawParticles();
    }

    /* --- Effet typing sur les rôles --- */
    const typingEl = document.getElementById('hero-typing');
    if (typingEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function tick() {
            const current = roles[roleIndex] || '';
            if (!deleting) {
                typingEl.textContent = current.slice(0, charIndex + 1);
                charIndex++;
                if (charIndex === current.length) {
                    setTimeout(() => { deleting = true; tick(); }, 2200);
                    return;
                }
                setTimeout(tick, 55);
            } else {
                typingEl.textContent = current.slice(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(tick, 400);
                    return;
                }
                setTimeout(tick, 28);
            }
        }
        setTimeout(tick, 800);
    } else if (typingEl) {
        typingEl.textContent = roles[0] || '';
    }

    /* --- Parallax souris sur glows + visuel --- */
    const glows = hero.querySelectorAll('.hero-glow');
    const visual = hero.querySelector('.hero-visual');
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        targetX = x;
        targetY = y;
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
