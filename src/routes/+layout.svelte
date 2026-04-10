<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import CookieConsentBanner from '$lib/components/cookie-consent-banner.svelte';
	import { getConsentState, loadHotjar } from '$lib/cookie-consent.svelte.js';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		if (getConsentState() === 'accepted') {
			loadHotjar();
		}
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
<Toaster richColors position="bottom-right" />
<CookieConsentBanner />
