<script lang="ts">
	import Hero from '$lib/components/hero.svelte';
	import SlidingColumns from '$lib/components/sliding-columns.svelte';
	import ValuePersonas from '$lib/components/value-personas.svelte';
	import PublicNav from '$lib/components/public-nav.svelte';
	import PublicFooter from '$lib/components/public-footer.svelte';
	import HowItWorksTimeline from '$lib/components/how-it-works-timeline.svelte';
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

	<SlidingColumns />

	<ValuePersonas />

	<!-- How it works -->
	<section id="how-it-works" class="border-border border-b">
		<div class="mx-auto max-w-section px-8 py-20">
			<div class="max-w-xl">
				<p data-fade-up="pending" use:fadeUp class="text-primary mb-4 font-mono text-xs uppercase tracking-widest">How it works</p>
				<h2 data-fade-up="pending" use:fadeUp={{ delay: 60 }} class="text-foreground text-3xl  tracking-tight leading-snug">
					Connect once.<br />Understand everything.
				</h2>
				<p data-fade-up="pending" use:fadeUp={{ delay: 120 }} class="text-muted-foreground mt-4 text-sm leading-relaxed">
					Nomox infers business meaning from your schemas so your team shares a common vocabulary,
					your AI tools get accurate context, and new engineers onboard in hours — not weeks.
				</p>
			</div>
			<div class="mt-14">
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
