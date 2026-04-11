<script lang="ts">
	import Hero from '$lib/components/hero.svelte';
	import SlidingColumns from '$lib/components/sliding-columns.svelte';
	import HeroScreenshot from '$lib/components/hero-screenshot.svelte';
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
		<div class="mx-auto max-w-section px-8 py-24 text-center">
			<p
				data-fade-up="pending"
				use:fadeUp
				class="text-primary mb-6 font-mono text-xs uppercase tracking-widest"
			>
				Early access
			</p>
			<h2
				data-fade-up="pending"
				use:fadeUp={{ delay: 60 }}
				class="text-foreground mx-auto max-w-2xl text-5xl leading-[1.1] tracking-tight"
			>
				It's time to understand your data.
			</h2>
			<p
				data-fade-up="pending"
				use:fadeUp={{ delay: 140 }}
				class="text-muted-foreground mx-auto mt-6 max-w-md text-sm leading-relaxed"
			>
				We're looking for our first partners. Get in touch and we'll reach out when we launch.
			</p>
			<div
				data-fade-up="pending"
				use:fadeUp={{ delay: 200 }}
				class="mt-10 flex flex-wrap items-center justify-center gap-4"
			>
				<a
					href="/waitlist"
					class="bg-foreground text-background hover:bg-foreground/85 inline-block rounded-lg px-6 py-3 text-sm font-medium transition-colors"
				>
					Request demo
				</a>
				<a
					href="/waitlist"
					class="text-foreground hover:text-primary inline-block text-sm font-medium transition-colors"
				>
					Join the waitlist
				</a>
			</div>
		</div>
	</section>

	<PublicFooter />

</div>
