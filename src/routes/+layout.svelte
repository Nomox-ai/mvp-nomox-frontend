<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { onMount } from 'svelte';
	
	let { children } = $props();

	onMount(() => {
		if (import.meta.env.VITE_HOTJAR_ENABLED === 'true') {
			const script = document.createElement('script');
			script.src = 'https://t.contentsquare.net/uxa/1ad894ba06ff0.js';
			document.head.appendChild(script);
		}
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
<Toaster richColors position="bottom-right" />
