/**
 * Écran d'introduction — style TurboTech (plexus, étapes, skip)
 */
(function () {
    'use strict';

    function prefersReducedMotion() {
        return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function initLoaderPlexus() {
        const canvas = document.getElementById('loader-plexus');
        const loader = document.getElementById('page-loader');
        if (!canvas || !loader || prefersReducedMotion()) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let raf = 0;
        let particles = [];
        const mouse = { x: -1, y: -1 };
        const maxLink = 118;

        function resize() {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function initParticles() {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const n = Math.min(80, Math.max(40, Math.floor((w * h) / 26000)));
            particles = Array.from({ length: n }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.42,
                vy: (Math.random() - 0.5) * 0.42
            }));
        }

        function stop() {
            if (raf) cancelAnimationFrame(raf);
            raf = 0;
            window.removeEventListener('resize', onResize);
            loader.removeEventListener('mousemove', onMove);
            loader.removeEventListener('mouseleave', onLeave);
        }

        function tick() {
            if (loader.classList.contains('is-hidden')) {
                stop();
                return;
            }

            const w = window.innerWidth;
            const h = window.innerHeight;

            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, w, h);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;
                p.x = Math.max(0, Math.min(w, p.x));
                p.y = Math.max(0, Math.min(h, p.y));

                if (mouse.x >= 0) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const d = Math.hypot(dx, dy);
                    if (d < 210 && d > 0.5) {
                        p.x -= (dx / d) * 0.18;
                        p.y -= (dy / d) * 0.18;
                    }
                }
            });

            for (let i = 0; i < particles.length; i += 1) {
                for (let j = i + 1; j < particles.length; j += 1) {
                    const a = particles[i];
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const d = Math.hypot(dx, dy);
                    if (d < maxLink) {
                        const alpha = (1 - d / maxLink) * 0.34;
                        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
                        ctx.lineWidth = 0.65;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }

            particles.forEach((p) => {
                ctx.fillStyle = 'rgba(16, 185, 129, 0.55)';
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.25, 0, Math.PI * 2);
                ctx.fill();
            });

            raf = requestAnimationFrame(tick);
        }

        function onMove(e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }

        function onLeave() {
            mouse.x = -1;
            mouse.y = -1;
        }

        function onResize() {
            resize();
            initParticles();
        }

        resize();
        initParticles();
        window.addEventListener('resize', onResize, { passive: true });
        loader.addEventListener('mousemove', onMove, { passive: true });
        loader.addEventListener('mouseleave', onLeave, { passive: true });
        raf = requestAnimationFrame(tick);
    }

    function initPageLoader() {
        const loader = document.getElementById('page-loader');
        const skipBtn = document.getElementById('loader-skip');
        if (!loader) return;

        document.documentElement.classList.add('is-loading');
        document.body.classList.add('is-loading');

        const stepBrand = document.getElementById('loader-step-brand');
        const stepIntro = document.getElementById('loader-step-intro');
        const stepZones = document.getElementById('loader-step-zones');
        const stepSkills = document.getElementById('loader-step-skills');

        let dismissed = false;
        const timeouts = [];

        const reveal = (el) => {
            if (el) el.classList.add('is-visible');
        };

        const dismiss = () => {
            if (dismissed) return;
            dismissed = true;
            timeouts.forEach(clearTimeout);
            document.removeEventListener('keydown', onEscape);
            loader.classList.add('is-hidden');
            document.documentElement.classList.remove('is-loading');
            document.body.classList.remove('is-loading');
            document.body.classList.add('is-loaded');
            if (skipBtn) {
                skipBtn.disabled = true;
                skipBtn.setAttribute('aria-hidden', 'true');
            }
            window.setTimeout(() => loader.remove(), 700);
        };

        const schedule = (fn, ms) => {
            timeouts.push(setTimeout(() => {
                if (!dismissed) fn();
            }, ms));
        };

        skipBtn?.addEventListener('click', dismiss);

        const onEscape = (e) => {
            if (e.key === 'Escape') dismiss();
        };
        document.addEventListener('keydown', onEscape);

        const timelineStart = performance.now();
        const SKILLS_STEP_MS = 3800;
        const SKILLS_DWELL_MS = 2600;

        if (prefersReducedMotion()) {
            reveal(stepBrand);
            reveal(stepIntro);
            reveal(stepZones);
            reveal(stepSkills);
            window.addEventListener('load', () => schedule(dismiss, 400));
            schedule(dismiss, 4200);
            initLoaderPlexus();
            return;
        }

        schedule(() => reveal(stepBrand), 50);
        schedule(() => reveal(stepIntro), 1900);
        schedule(() => reveal(stepZones), 2900);
        schedule(() => reveal(stepSkills), SKILLS_STEP_MS);

        window.addEventListener('load', () => {
            const now = performance.now();
            const sequenceEnd = timelineStart + SKILLS_STEP_MS + SKILLS_DWELL_MS;
            schedule(dismiss, Math.max(650, sequenceEnd - now));
        });

        schedule(dismiss, 16000);
        initLoaderPlexus();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPageLoader);
    } else {
        initPageLoader();
    }
})();
