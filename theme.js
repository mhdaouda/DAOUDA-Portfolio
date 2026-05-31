(function applyStoredTheme() {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored === 'dark' || stored === 'light' ? stored : (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeColorMeta(theme);
})();

function getTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function updateThemeColorMeta(theme) {
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'theme-color';
        document.head.appendChild(meta);
    }
    meta.content = theme === 'dark' ? '#0b1120' : '#f8fafc';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeColorMeta(theme);
    updateThemeToggleUI();
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

function toggleTheme() {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
}

function updateThemeToggleUI() {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;

    const isDark = getTheme() === 'dark';
    const lang = localStorage.getItem('language') || 'fr';
    const labels = window.translations && window.translations[lang]
        ? window.translations[lang]
        : {};

    btn.innerHTML = isDark
        ? '<i class="fas fa-sun" aria-hidden="true"></i>'
        : '<i class="fas fa-moon" aria-hidden="true"></i>';
    btn.setAttribute('aria-label', isDark
        ? (labels['theme.light'] || 'Activer le mode clair')
        : (labels['theme.dark'] || 'Activer le mode sombre'));
    btn.setAttribute('title', btn.getAttribute('aria-label'));
}

window.getTheme = getTheme;
window.setTheme = setTheme;
window.toggleTheme = toggleTheme;
window.updateThemeToggleUI = updateThemeToggleUI;

document.addEventListener('DOMContentLoaded', updateThemeToggleUI);
