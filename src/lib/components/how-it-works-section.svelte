<script lang="ts">
	import { fadeUp } from '$lib/actions/fade-up';
	import HowItWorksTimeline from '$lib/components/how-it-works-timeline.svelte';
	import PlugIcon from '@lucide/svelte/icons/plug-2';
	import SparklesIcon from '@lucide/svelte/icons/sparkles';
	import BookOpenIcon from '@lucide/svelte/icons/book-open-text';

	const steps = [
		{ label: 'Connect a source',    desc: 'Point Nomox at your database, data warehouse or schema registry. We handle discovery automatically.', Icon: PlugIcon },
		{ label: 'AI infers semantics', desc: 'Our indexer reads schemas and samples, then assigns business meanings, entities and glossary terms.', Icon: SparklesIcon },
		{ label: 'Access the catalog',  desc: 'Browse via the admin console, query via API, or plug directly into your AI tools via MCP.', Icon: BookOpenIcon },
	];

	// Decorative pixels for the side panel
	const sidePixels = [
		{ x: 8,  y: 12, delay: 0.2, dur: 5.0 },
		{ x: 22, y: 38, delay: 1.4, dur: 6.1 },
		{ x: 14, y: 72, delay: 0.7, dur: 4.6 },
		{ x: 38, y: 18, delay: 1.9, dur: 5.5 },
		{ x: 60, y: 48, delay: 0.4, dur: 6.4 },
		{ x: 78, y: 22, delay: 2.2, dur: 5.2 },
		{ x: 88, y: 70, delay: 1.0, dur: 7.0 },
		{ x: 48, y: 84, delay: 0.6, dur: 5.8 },
	];
</script>

<section id="how-it-works" class="border-b border-border">
	<div class="mx-auto max-w-section px-8 py-24">

		<div class="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 items-start">

			<!-- Left: header -->
			<div class="md:sticky md:top-24">
				<div data-fade-up="pending" use:fadeUp class="flex items-center gap-2 mb-4">
					<span class="size-1.5 rounded-full bg-primary"></span>
					<p class="text-primary font-mono text-xs uppercase tracking-widest">How it works</p>
				</div>
				<h2 data-fade-up="pending" use:fadeUp={{ delay: 60 }} class="text-foreground text-3xl md:text-4xl tracking-tight leading-[1.1]">
					Connect once.<br />Understand everything.
				</h2>
				<p data-fade-up="pending" use:fadeUp={{ delay: 120 }} class="text-muted-foreground mt-5 text-sm leading-relaxed max-w-md">
					Nomox infers business meaning from your schemas so your team shares a common vocabulary,
					your AI tools get accurate context, and new engineers onboard in hours - not weeks.
				</p>

				<!-- Mini stat row -->
				<div data-fade-up="pending" use:fadeUp={{ delay: 180 }} class="mt-8 grid grid-cols-3 gap-4 max-w-md">
					<div class="border-l border-primary/40 pl-3">
						<p class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Connect</p>
						<p class="mt-1 text-foreground font-mono text-lg tabular-nums">~5<span class="text-muted-foreground text-xs"> min</span></p>
					</div>
					<div class="border-l border-primary/40 pl-3">
						<p class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Infer</p>
						<p class="mt-1 text-foreground font-mono text-lg tabular-nums">96<span class="text-muted-foreground text-xs">% acc</span></p>
					</div>
					<div class="border-l border-primary/40 pl-3">
						<p class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Onboard</p>
						<p class="mt-1 text-foreground font-mono text-lg tabular-nums">&lt;1<span class="text-muted-foreground text-xs"> day</span></p>
					</div>
				</div>
			</div>

			<!-- Right: vertical step cards with decorative pixels -->
			<div class="relative">
				<div class="absolute inset-0 -m-4 pointer-events-none" aria-hidden="true">
					{#each sidePixels as p}
						<span
							class="hiw-pixel"
							style="left:{p.x}%; top:{p.y}%; animation-delay:{p.delay}s; animation-duration:{p.dur}s;"
						></span>
					{/each}
				</div>

				<div class="relative flex flex-col gap-3">
					{#each steps as step, i}
						<div
							data-fade-up="pending"
							use:fadeUp={{ delay: i * 80 }}
							class="hiw-step relative rounded-xl border border-border bg-background p-5 transition-colors hover:border-primary/30"
						>
							<div class="flex items-start gap-4">
								<div class="relative shrink-0">
									<div class="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-muted/30">
										<svelte:component this={step.Icon} class="text-primary size-4" />
									</div>
								</div>
								<div class="flex-1 min-w-0">
									<div class="flex items-center gap-2">
										<span class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Step 0{i + 1}</span>
										{#if i === 0}
											<span class="font-mono text-[10px] text-muted-foreground">·</span>
											<span class="font-mono text-[10px] text-muted-foreground">5 min</span>
										{/if}
									</div>
									<p class="text-foreground text-base font-semibold mt-1 tracking-tight">{step.label}</p>
									<p class="text-muted-foreground text-sm leading-relaxed mt-2">{step.desc}</p>
								</div>
							</div>

							<!-- Connector line down to next step -->
							{#if i < steps.length - 1}
								<div class="absolute left-[36px] -bottom-3 h-3 w-px bg-border" aria-hidden="true"></div>
							{/if}
						</div>
					{/each}
				</div>
			</div>

		</div>
	</div>
</section>

<style>
	.hiw-pixel {
		position: absolute;
		width: 3px;
		height: 3px;
		background: #2d2df6;
		opacity: 0.4;
		border-radius: 1px;
		animation-name: hiw-pixel-float;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
		animation-direction: alternate;
	}
	@keyframes hiw-pixel-float {
		from { transform: translateY(0px); opacity: 0.25; }
		to   { transform: translateY(-10px); opacity: 0.7; }
	}
</style>
