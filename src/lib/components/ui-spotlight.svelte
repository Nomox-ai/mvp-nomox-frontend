<script lang="ts">
	import { chatState } from "$lib/stores/chat.svelte.js";
	import { tick } from "svelte";

	let rect = $state<DOMRect | null>(null);

	$effect(() => {
		const target = chatState.highlightTarget;
		if (!target) {
			rect = null;
			return;
		}

		// Wait for DOM update then find the element
		tick().then(() => {
			const el = document.querySelector(target.selector);
			if (el) {
				el.scrollIntoView({ behavior: "smooth", block: "center" });
				// Small delay after scroll to get accurate position
				setTimeout(() => {
					rect = el.getBoundingClientRect();
				}, 300);
			} else {
				rect = null;
			}
		});
	});

	function dismiss() {
		chatState.clearHighlight();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Escape") {
			dismiss();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if chatState.highlightTarget && rect}
	<!-- Overlay backdrop with cutout -->
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-[60] cursor-pointer"
		onclick={dismiss}
		style="
			background: rgba(0, 0, 0, 0.5);
			clip-path: polygon(
				0% 0%, 0% 100%, {rect.left}px 100%, {rect.left}px {rect.top}px,
				{rect.right}px {rect.top}px, {rect.right}px {rect.bottom}px,
				{rect.left}px {rect.bottom}px, {rect.left}px 100%, 100% 100%, 100% 0%
			);
		"
	></div>

	<!-- Tooltip near the highlighted element -->
	<div
		class="bg-card border-border fixed z-[61] max-w-xs rounded-lg border px-4 py-3 shadow-lg"
		style="
			top: {rect.bottom + 12}px;
			left: {Math.max(12, rect.left + rect.width / 2 - 140)}px;
		"
	>
		<p class="text-foreground text-sm">{chatState.highlightTarget.message}</p>
		<p class="text-muted-foreground mt-1 text-xs">Click anywhere to dismiss</p>
	</div>
{/if}
