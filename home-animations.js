/**
 * Animations hero page d'accueil — particules, typing rôles, parallax
 */
(function () {
    const FALLBACK_CURRENT = [
        'Ingénieur DevOps',
        'Ingénieur prod',
        'Web intégrateur',
        'Tech lead',
        'Chef de projet technique'
    ];
    const FALLBACK_LEARNING = [
        'Data Scientist',
        'Ingénieur IA',
        'Product Builder',
        'Ingénieur sécurité informatique',
        'Business analyst'
    ];

    let clearCurrentTyping = null;
    let clearLearningTyping = null;

    function getLangPack() {
        const lang = (localStorage.getItem('language') || 'fr').toLowerCase();
        if (window.translations && window.translations[lang]) {
            return window.translations[lang];
        }
        return (window.translations && window.translations.fr) || {};
    }

    function formatRoleList(roles) {
        return roles.join(', ');
    }

    function createTypingAnimation(element, roles, options) {
        const opts = Object.assign({
            typeSpeed: 52,
            deleteSpeed: 26,
            pauseEnd: 2400,
            pauseStart: 450,
            startDelay: 800
        }, options);

        let timer = null;
        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function clear() {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        }

        function tick() {
            const text = roles[roleIndex];
            if (!text) return;

            if (!deleting) {
                charIndex += 1;
                element.textContent = text.slice(0, charIndex);
                if (charIndex === text.length) {
                    timer = setTimeout(function () {
                        deleting = true;
                        tick();
                    }, opts.pauseEnd);
                    return;
                }
                timer = setTimeout(tick, opts.typeSpeed);
            } else {
                charIndex -= 1;
                element.textContent = text.slice(0, charIndex);
                if (charIndex === 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    timer = setTimeout(tick, opts.pauseStart);
                    return;
                }
                timer = setTimeout(tick, opts.deleteSpeed);
            }
        }

        element.textContent = roles[0];
        charIndex = roles[0].length;
        deleting = true;
        timer = setTimeout(tick, opts.startDelay);

        return clear;
    }

    function initRoleTyping(t) {
        const currentEl = document.getElementById('hero-roles-current-text');
        const learningEl = document.getElementById('hero-roles-learning-text');
        if (!currentEl || !learningEl) return;

        if (clearCurrentTyping) clearCurrentTyping();
        if (clearLearningTyping) clearLearningTyping();
        clearCurrentTyping = null;
        clearLearningTyping = null;

        const current = Array.isArray(t['hero.roles.current']) ? t['hero.roles.current'] : FALLBACK_CURRENT;
        const learning = Array.isArray(t['hero.roles.learning']) ? t['hero.roles.learning'] : FALLBACK_LEARNING;

        if (!current.length || !learning.length) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            currentEl.textContent = formatRoleList(current);
            learningEl.textContent = formatRoleList(learning);
            return;
        }

        clearCurrentTyping = createTypingAnimation(currentEl, current, { startDelay: 900 });
        clearLearningTyping = createTypingAnimation(learningEl, learning, { startDelay: 1400 });
    }

    function initHeroHome() {
        const hero = document.querySelector('.hero-modern');
        if (!hero) return;

        initRoleTyping(getLangPack());
    }

    function initParticles() {
        const hero = document.querySelector('.hero-modern');
        const canvas = hero && hero.querySelector('.hero-particles');
        if (!canvas || !hero) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles = [];
        let w, h;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function resize() {
            w = canvas.width = hero.offsetWidth;
            h = canvas.height = hero.offsetHeight;
        }

        function initParticleList() {
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
        initParticleList();
        window.addEventListener('resize', () => { resize(); initParticleList(); });
        if (!prefersReduced) drawParticles();
    }

    function initParallax() {
        const hero = document.querySelector('.hero-modern');
        if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
        parallaxLoop();
    }

    function initStatCounters() {
        const hero = document.querySelector('.hero-modern');
        if (!hero) return;

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
    }

    function initAll() {
        initHeroHome();
        initParticles();
        initParallax();
        initStatCounters();
    }

    window.initHeroHome = initHeroHome;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }
})();
