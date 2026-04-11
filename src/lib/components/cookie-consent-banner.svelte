<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Card } from '$lib/components/ui/card/index.js';
	import { getConsentState, setConsentCookie, loadHotjar } from '$lib/cookie-consent.svelte.js';

	let visible = $state(false);

	onMount(() => {
		visible = getConsentState() === 'undecided';
	});

	function accept() {
		setConsentCookie('accepted');
		loadHotjar();
		visible = false;
	}

	function decline() {
		setConsentCookie('declined');
		visible = false;
	}
</script>

{#if visible}
	<div class="fixed inset-x-0 bottom-0 z-50 p-4">
		<Card class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 p-4">
			<p class="text-muted-foreground text-sm">
				This website uses cookies for analytics purposes. Learn more in our
				<a href="/privacy" class="underline underline-offset-4 hover:text-foreground">
					privacy policy</a
				>.
			</p>
			<div class="flex gap-2">
				<Button class="cursor-pointer" variant="outline" size="sm" onclick={decline}>Decline</Button>
				<Button class="cursor-pointer" size="sm" onclick={accept}>Accept</Button>
			</div>
		</Card>
	</div>
{/if}
