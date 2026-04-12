<script lang="ts">
	import HowItWorksStep from "./how-it-works-step.svelte";

	export let steps: { label: string; desc: string }[];

	let animated = false;
	const LINE_DURATION = 900;
	const SEGMENT_DURATION = Math.round(LINE_DURATION / steps.length); // ms per vertical segment

	function observe(node: HTMLElement) {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					animated = true;
					observer.unobserve(node);
				}
			},
			{ threshold: 0.2 }
		);
		observer.observe(node);
		return { destroy() { observer.unobserve(node); } };
	}

	function dotDelay(i: number) {
		return Math.round((i / steps.length) * LINE_DURATION);
	}
</script>

<!-- Desktop: horizontal timeline with draw animation -->
<div class="hidden md:block" use:observe>
	<div class="relative">
		<!-- Line that grows left → right -->
		<div
			class="absolute left-0 right-0 top-[5px] h-[2px] bg-primary origin-left"
			style="transform: scaleX({animated ? 1 : 0}); transition: transform {LINE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1);"
		></div>

		<div class="flex">
			{#each steps as step, i}
				{@const dd = dotDelay(i)}
				<div class="relative flex-1">
					<!-- Dot pops in as line reaches it -->
					<div
						class="h-3 w-3 rounded-full bg-primary"
						style="opacity: {animated ? 1 : 0}; transform: scale({animated ? 1 : 0}); transition: opacity 200ms {dd}ms, transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1) {dd}ms;"
					></div>
					<!-- Label fades up shortly after dot -->
					<div
						class="mt-6 pr-8"
						style="opacity: {animated ? 1 : 0}; transform: translateY({animated ? 0 : 10}px); transition: opacity 500ms {dd + 160}ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) {dd + 160}ms;"
					>
						<HowItWorksStep label={step.label} desc={step.desc} />
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<!-- Mobile: vertical timeline with draw animation -->
<div class="md:hidden flex flex-col items-start" use:observe>
	{#each steps as step, i}
		{@const dd = dotDelay(i)}
		<div class="flex items-start gap-4 w-full">
			<!-- Left column: dot + line segment growing downward -->
			<div class="flex flex-col items-center self-stretch">
				<div
					class="h-3 w-3 flex-shrink-0 rounded-full bg-primary"
					style="opacity: {animated ? 1 : 0}; transform: scale({animated ? 1 : 0}); transition: opacity 200ms {dd}ms, transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1) {dd}ms;"
				></div>
				{#if i < steps.length - 1}
					<div
						class="w-[2px] flex-1 bg-primary origin-top"
						style="transform: scaleY({animated ? 1 : 0}); transition: transform {SEGMENT_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1) {dd + 100}ms;"
					></div>
				{/if}
			</div>
			<!-- Label -->
			<div
				class="pb-8 flex-1"
				style="opacity: {animated ? 1 : 0}; transform: translateY({animated ? 0 : 10}px); transition: opacity 500ms {dd + 160}ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) {dd + 160}ms;"
			>
				<HowItWorksStep label={step.label} desc={step.desc} />
			</div>
		</div>
	{/each}
</div>
