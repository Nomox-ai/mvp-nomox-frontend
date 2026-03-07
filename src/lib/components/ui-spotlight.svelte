<script lang="ts">
	import { chatState } from "$lib/stores/chat.svelte.js";
	import { tick } from "svelte";

	let highlightedEl: Element | null = $state(null);

	$effect(() => {
		const target = chatState.highlightTarget;

		// Clean up previous highlight
		if (highlightedEl) {
			highlightedEl.removeAttribute("data-highlighted");
			highlightedEl = null;
		}

		if (!target) return;

		tick().then(() => {
			const el = document.querySelector(target.selector);
			if (el) {
				el.scrollIntoView({ behavior: "smooth", block: "center" });
				el.setAttribute("data-highlighted", "true");
				highlightedEl = el;
			}
		});
	});

	function dismiss() {
		if (highlightedEl) {
			highlightedEl.removeAttribute("data-highlighted");
			highlightedEl = null;
		}
		chatState.clearHighlight();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Escape") {
			dismiss();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if chatState.highlightTarget}
	<!-- Backdrop overlay -->
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div class="fixed inset-0 z-[60] cursor-pointer bg-black/50" onclick={dismiss}></div>

	<!-- Guide message banner -->
	<div
		class="bg-card border-border fixed bottom-20 left-1/2 z-[62] -translate-x-1/2 rounded-lg border px-5 py-3 shadow-lg"
	>
		<p class="text-foreground text-sm">{chatState.highlightTarget.message}</p>
		<p class="text-muted-foreground mt-1 text-xs">Click anywhere to dismiss</p>
	</div>
{/if}

<style>
	:global([data-highlighted="true"]) {
		position: relative;
		z-index: 61;
		outline: 3px solid hsl(var(--primary));
		outline-offset: 4px;
		border-radius: 8px;
		animation: pulse-highlight 1.5s ease-in-out infinite;
	}

	@keyframes pulse-highlight {
		0%,
		100% {
			outline-color: hsl(var(--primary));
		}
		50% {
			outline-color: hsl(var(--primary) / 0.4);
		}
	}
</style>
