(function applyStoredTheme() {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored === 'dark' || stored === 'light' ? stored : (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
})();

function getTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeToggleUI();
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
