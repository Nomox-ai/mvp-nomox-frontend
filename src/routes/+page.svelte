<script lang="ts">
	import Hero from '$lib/components/hero.svelte';
	import SlidingColumns from '$lib/components/sliding-columns.svelte';
	import HeroScreenshot from '$lib/components/hero-screenshot.svelte';
	import ValuePersonas from '$lib/components/value-personas.svelte';
	import PublicNav from '$lib/components/public-nav.svelte';
	import PublicFooter from '$lib/components/public-footer.svelte';
	import HowItWorksTimeline from '$lib/components/how-it-works-timeline.svelte';
	import { fadeUp } from '$lib/actions/fade-up';
	import LandingCta from '$lib/components/landing-cta.svelte';

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
	<section id="how-it-works" class="border-border">
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

	<LandingCta />

	<PublicFooter />

</div>
