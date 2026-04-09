<script lang="ts">
	import Hero from '$lib/components/hero.svelte';
	import IntegrationDiagram from '$lib/components/integration-diagram.svelte';
	import PublicNav from '$lib/components/public-nav.svelte';
	import PublicFooter from '$lib/components/public-footer.svelte';
	import HowItWorksTimeline from '$lib/components/how-it-works-timeline.svelte';
	import ComingSoonBadge from '$lib/components/coming-soon-badge.svelte';
	import { fadeUp } from '$lib/actions/fade-up';

	const howItWorksSteps = [
		{ label: 'Connect a source',    desc: 'Point Nomox at your database, data warehouse or schema registry. We handle discovery automatically.' },
		{ label: 'AI infers semantics', desc: 'Our indexer reads schemas and samples, then assigns business meanings, entities and glossary terms.' },
		{ label: 'Access the catalog',  desc: 'Browse via the admin console, query via API, or plug directly into your AI tools via MCP.' },
	];
</script>

<div class="bg-background text-foreground flex min-h-screen flex-col">

	<PublicNav />

	<Hero />

	<!-- Features grid -->
	<section class="border-border border-b">
		<div class="mx-auto max-w-section">
			<div class="grid grid-cols-1 divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
				{#each [
					{ num: '01', label: 'Semantic catalog', desc: 'Every source, table and column enriched with inferred business meanings, entities, glossary terms, and domain relationships.' },
					{ num: '02', label: 'MCP integration',  desc: 'Expose your catalog to Claude, Cursor and any MCP-compatible AI client with one toggle.' },
					{ num: '03', label: 'BI platform',      desc: 'Explore and visualise your data with a built-in analytics layer powered by your semantic model.', comingSoon: true },
				] as f, i}
					<div data-fade-up="pending" use:fadeUp={{ delay: i * 100 }} class="border-border relative px-8 py-10">
						<p class="text-muted-foreground mb-3 font-mono text-xs">{f.num}</p>
						<div class="mb-2 flex items-center gap-2.5">
							<p class="text-foreground text-sm font-semibold">{f.label}</p>
							{#if f.comingSoon}
								<ComingSoonBadge />
							{/if}
						</div>
						<p class="text-muted-foreground text-xs leading-relaxed">{f.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="border-border border-b">
		<div data-fade-up="pending" use:fadeUp class="mx-auto max-w-3xl px-8 py-12">
			<IntegrationDiagram />
		</div>
	</section>

	<!-- How it works -->
	<section id="how-it-works" class="border-border border-b">
		<div class="mx-auto max-w-section px-8 py-10">
			<h2 data-fade-up="pending" use:fadeUp class="text-foreground text-lg font-semibold tracking-tight">How it works</h2>
			<p data-fade-up="pending" use:fadeUp={{ delay: 80 }} class="text-muted-foreground mt-2 max-w-lg text-sm leading-relaxed">
				Connect a source and Nomox does the rest. Nomox infers business meaning from your schemas,
				so your team shares a common vocabulary, your AI tools get accurate context, and new
				engineers onboard in hours instead of weeks.
			</p>
			<div class="mt-10">
				<HowItWorksTimeline steps={howItWorksSteps} />
			</div>
		</div>
	</section>

	<!-- Waitlist CTA -->
	<section class="border-border border-b">
		<div class="mx-auto grid max-w-section grid-cols-1 divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
			<div data-fade-up="pending" use:fadeUp class="px-8 py-14">
				<p class="text-muted-foreground mb-3 font-mono text-xs">Early access</p>
				<h2 class="text-foreground text-2xl font-semibold tracking-tight">
					Be the first to know.
				</h2>
				<p class="text-muted-foreground mt-3 max-w-xs text-sm leading-relaxed">
					We're not onboarding yet - but we're looking for our first partners. Get in touch and we'll reach out when we launch.
				</p>
				<a
					href="/waitlist"
					class="bg-foreground text-background hover:bg-foreground/85 mt-8 inline-block rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
				>
					Request Demo
				</a>
			</div>
			<div class="border-border flex flex-col justify-between px-8 py-14">
				<div class="grid grid-cols-1 gap-6">
					{#each [
						{ label: 'Free during early access', desc: 'No credit card. No commitment.' },
						{ label: 'Works with your stack',    desc: 'PostgreSQL, MongoDB, Trino and more.' },
						{ label: 'AI-native from day one',   desc: 'MCP, Claude, Cursor - all supported.' },
					] as item, i}
						<div data-fade-up="pending" use:fadeUp={{ delay: i * 80 }}>
							<p class="text-foreground text-sm font-medium">{item.label}</p>
							<p class="text-muted-foreground mt-0.5 text-xs">{item.desc}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<PublicFooter />

</div>
