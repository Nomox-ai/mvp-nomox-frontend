<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import CookieConsentBanner from '$lib/components/cookie-consent-banner.svelte';
	import { getConsentState, loadHotjar } from '$lib/cookie-consent.svelte.js';
	import { onMount } from 'svelte';
	import posthog from 'posthog-js';
	import { browser } from '$app/environment';

	let { children } = $props();

	const loadPostHog = () => {
		if (!browser) return;
		const posthogEnabled = import.meta.env.VITE_POSTHOG_ENABLED === 'true';
		if (!posthogEnabled) return;
		posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
			api_host: import.meta.env.VITE_POSTHOG_HOST,
			defaults: '2026-01-30'
		});
		
	}

	onMount(() => {
		if (getConsentState() === 'accepted') {
			loadHotjar();
			loadPostHog();
		}
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
<Toaster richColors position="bottom-right" />
<CookieConsentBanner />
