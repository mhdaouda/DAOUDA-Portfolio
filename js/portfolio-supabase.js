/**
 * Client Supabase partagé — contacts & analytics portfolio
 */
(function () {
    'use strict';

    let client = null;

    function getClient() {
        if (client) return client;
        const cfg = window.PORTFOLIO_SUPABASE;
        if (!cfg?.url || !cfg?.anonKey || !window.supabase?.createClient) return null;
        client = window.supabase.createClient(cfg.url, cfg.anonKey);
        return client;
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function getReferrerChannel(referrer) {
        if (!referrer) return 'direct';
        try {
            const host = new URL(referrer).hostname.toLowerCase();
            if (host.includes('google.')) return 'google';
            if (host.includes('bing.')) return 'bing';
            if (host.includes('facebook.') || host.includes('fb.')) return 'facebook';
            if (host.includes('linkedin.')) return 'linkedin';
            if (host.includes('twitter.') || host.includes('x.com')) return 'twitter';
            if (host.includes('instagram.')) return 'instagram';
            if (host === window.location.hostname) return 'direct';
            return 'referral';
        } catch {
            return 'direct';
        }
    }

    function getSessionId() {
        const key = 'portfolio_session_id';
        let id = sessionStorage.getItem(key);
        if (!id) {
            id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
            sessionStorage.setItem(key, id);
        }
        return id;
    }

    async function insertContact(payload) {
        const sb = getClient();
        if (!sb) return { ok: false, error: 'Supabase non configuré' };

        const row = {
            source: payload.source || 'form',
            name: (payload.name || '').trim().slice(0, 200),
            email: (payload.email || '').trim().slice(0, 200),
            phone: (payload.phone || '').trim().slice(0, 50) || null,
            company: (payload.company || '').trim().slice(0, 300) || null,
            subject: (payload.subject || '').trim().slice(0, 300) || null,
            message: (payload.message || '').trim().slice(0, 8000),
            location: (payload.location || '').trim().slice(0, 200) || null,
            service: payload.service || null,
            budget: payload.budget || null,
            timeline: payload.timeline || null,
            project_details: payload.project_details || null,
            status: 'nouveau'
        };

        if (!row.name || !row.email || !row.message) {
            return { ok: false, error: 'Champs requis manquants' };
        }

        const { error } = await sb.from('portfolio_contacts').insert(row);
        if (error) return { ok: false, error: error.message };
        return { ok: true };
    }

    async function trackPageView() {
        const sb = getClient();
        if (!sb || window.location.pathname.includes('/admin/')) return;

        const path = window.location.pathname + window.location.search;
        const dedupeKey = `portfolio_tracked_${path}`;
        if (sessionStorage.getItem(dedupeKey)) return;
        sessionStorage.setItem(dedupeKey, '1');

        const referrer = document.referrer || null;
        await sb.from('portfolio_visits').insert({
            session_id: getSessionId(),
            page_path: path.slice(0, 500),
            page_title: (document.title || '').slice(0, 300),
            referrer: referrer ? referrer.slice(0, 500) : null,
            referrer_channel: getReferrerChannel(referrer),
            user_agent: (navigator.userAgent || '').slice(0, 500),
            language: (navigator.language || '').slice(0, 20)
        });
    }

    window.PortfolioSupabase = {
        getClient,
        insertContact,
        trackPageView,
        escapeHtml,
        getReferrerChannel
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => trackPageView());
    } else {
        trackPageView();
    }
})();
