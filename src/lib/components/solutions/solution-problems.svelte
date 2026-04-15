<script lang="ts">
	import { fadeUp } from "$lib/actions/fade-up";

	export type Problem = {
		label: string;
		desc: string;
	};

	export let problems: Problem[];
	export let solutionEyebrow: string = "How Nomox helps";
	export let solutionTitle: string;
	export let solutionBody: string;
	export let ctaLabel: string = "Get started";
	export let ctaHref: string = "/waitlist";
</script>

<!--
  Mirrored version of the "Be the first to know" section from the home page.
  Home:  [ CTA left  | list right ]
  Here:  [ list left | CTA right  ]
-->
<section class="border-border border-b">
	<div
		class="mx-auto grid max-w-section grid-cols-1 divide-y md:grid-cols-2 md:divide-x md:divide-y-0"
	>
		<!-- Left: problem list -->
		<div class="px-8 py-14">
			<p
				class="text-primary mb-6 font-mono text-xs uppercase tracking-widest"
			>
				Current challenges
			</p>
			<div class="grid grid-cols-1 gap-6">
				{#each problems as problem, i}
					<div data-fade-up="pending" use:fadeUp={{ delay: i * 80 }}>
						<p class="text-foreground text-sm font-medium">
							{problem.label}
						</p>
						<p
							class="text-muted-foreground mt-0.5 text-xs leading-relaxed"
						>
							{problem.desc}
						</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Right: how Nomox solves it -->
		<div class="px-8 py-14">
			<p
				data-fade-up="pending"
				use:fadeUp
				class="text-primary mb-3 font-mono text-xs uppercase tracking-widest"
			>
				{solutionEyebrow}
			</p>
			<h2
				data-fade-up="pending"
				use:fadeUp={{ delay: 80 }}
				class="text-foreground text-2xl tracking-tight"
			>
				{solutionTitle}
			</h2>
			<p
				data-fade-up="pending"
				use:fadeUp={{ delay: 160 }}
				class="text-muted-foreground mt-3 max-w-xs text-sm leading-relaxed"
			>
				{solutionBody}
			</p>
			<a
				data-fade-up="pending"
				use:fadeUp={{ delay: 240 }}
				href={ctaHref}
				class="bg-foreground text-background hover:bg-foreground/85 mt-8 inline-block rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
			>
				{ctaLabel}
			</a>
		</div>
	</div>
</section>
