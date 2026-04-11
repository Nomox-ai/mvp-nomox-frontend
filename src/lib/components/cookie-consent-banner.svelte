<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button/index.js';
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
	<div class="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
		<div class="bg-background border-border mx-auto flex max-w-md flex-col gap-2.5 rounded-lg border px-4 py-3.5 shadow-md">
			<div class="flex items-center justify-between">
				<span class="text-sm font-medium">Cookies</span>
				<button
					onclick={() => (visible = false)}
					class="text-muted-foreground hover:text-foreground cursor-pointer rounded p-0.5 transition-colors"
					aria-label="Dismiss"
				>
					&times;
				</button>
			</div>
			<p class="text-muted-foreground text-xs">
				This website uses cookies for analytics purposes. Learn more in our
				<a href="/privacy" class="underline underline-offset-2 hover:text-foreground">privacy policy</a>.
			</p>
			<div class="flex justify-end gap-1.5">
				<Button class="cursor-pointer h-7 px-2.5 text-xs" variant="outline" size="sm" onclick={decline}>Decline</Button>
				<Button class="cursor-pointer h-7 px-2.5 text-xs" size="sm" onclick={accept}>Accept</Button>
			</div>
		</div>
	</div>
{/if}
