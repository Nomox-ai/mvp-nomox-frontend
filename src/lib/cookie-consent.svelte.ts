import type { ConsentState } from '$lib/types/cookies.js';

const CONSENT_COOKIE_NAME = 'nomox_cookie_consent';
const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function getConsentState(): ConsentState {
	if (typeof document === 'undefined') return 'undecided';
	const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${CONSENT_COOKIE_NAME}=([^;]*)`));
	if (!match) return 'undecided';
	return match[1] === 'accepted' ? 'accepted' : 'declined';
}

export function setConsentCookie(value: 'accepted' | 'declined'): void {
	if (value === 'accepted') {
		document.cookie = `${CONSENT_COOKIE_NAME}=${value}; path=/; max-age=${CONSENT_COOKIE_MAX_AGE}`;
	} else {
		// Session-only cookie — banner reappears on next visit
		document.cookie = `${CONSENT_COOKIE_NAME}=${value}; path=/`;
	}
}

export function loadHotjar(): void {
	if (import.meta.env.VITE_HOTJAR_ENABLED !== 'true') return;
	const script = document.createElement('script');
	script.src = 'https://t.contentsquare.net/uxa/23eabb3e293da.js';
	document.head.appendChild(script);
}
