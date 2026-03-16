<script lang="ts">
	import HowItWorksStep from "./how-it-works-step.svelte";
	import ChevronRight from "@lucide/svelte/icons/chevron-right";
	import ChevronDown from "@lucide/svelte/icons/chevron-down";

	export let steps: { label: string; desc: string }[];
</script>

<!-- Desktop: horizontal timeline -->
<div class="hidden md:block">
	<!-- Step columns: each owns 1/n of the width -->
	<div class="flex">
		{#each steps as step, i}
			<div class="flex-1 relative">
				<!-- Dot -->
				<div class="w-3 h-3 rounded-full bg-primary mb-0"></div>
				<!-- Horizontal line from dot to right edge, plus arrow on last item -->
				<div
					class="absolute top-[5px] left-3 right-0 h-[2px] bg-primary"
				>
					{#if i === steps.length - 1}
						<!-- Shift left by half icon width so the chevron strokes start flush with the line end -->
						<ChevronRight
							class="text-primary absolute top-1/2 -translate-y-1/2 -right-3"
							size={32}
							strokeWidth={1.5}
						/>
					{/if}
				</div>
				<!-- Label below dot -->
				<div class="mt-6 pr-8">
					<HowItWorksStep label={step.label} desc={step.desc} />
				</div>
			</div>
		{/each}
	</div>
</div>

<!-- Mobile: vertical timeline -->
<div class="md:hidden flex flex-col items-start">
	{#each steps as step, i}
		<div class="flex items-start gap-4 w-full">
			<!-- Left column: dot + continuous line -->
			<div class="flex flex-col items-center self-stretch">
				<div
					class="w-3 h-3 rounded-full bg-primary flex-shrink-0"
				></div>
				<!-- Line continues down; last segment is relative so arrow anchors to its bottom -->
				<div
					class="flex-1 w-[2px] bg-primary{i === steps.length - 1
						? ' relative'
						: ''}"
				>
					{#if i === steps.length - 1}
						<ChevronDown
							class="text-primary absolute left-1/2 -translate-x-1/2 -bottom-3"
							size={32}
							strokeWidth={1.5}
						/>
					{/if}
				</div>
			</div>
			<!-- Right column: label -->
			<div class="pb-8 flex-1">
				<HowItWorksStep label={step.label} desc={step.desc} />
			</div>
		</div>
	{/each}
</div>
