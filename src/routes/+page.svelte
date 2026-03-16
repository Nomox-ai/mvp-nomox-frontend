<script lang="ts">
	import IntegrationDiagram from '$lib/components/integration-diagram.svelte';
	import PublicNav from '$lib/components/public-nav.svelte';
	import PublicFooter from '$lib/components/public-footer.svelte';
	import screenshot from '$lib/assets/screenshot_graphic.png';
	import HowItWorksTimeline from '$lib/components/how-it-works-timeline.svelte';

	const howItWorksSteps = [
		{ label: 'Connect a source',    desc: 'Point Nomox at your database, data warehouse or schema registry. We handle discovery automatically.' },
		{ label: 'AI infers semantics', desc: 'Our indexer reads schemas and samples, then assigns business meanings, entities and glossary terms.' },
		{ label: 'Access the catalog',  desc: 'Browse via the admin console, query via API, or plug directly into your AI tools via MCP.' },
	];
</script>

<div class="bg-background text-foreground flex min-h-screen flex-col">

	<PublicNav />

	<!-- Hero -->
	<section class="border-border border-b relative overflow-hidden">
		<!-- Copy in normal flow — determines section height -->
		<div class="mx-auto max-w-5xl px-8 py-20 md:py-28">
			<div class="w-fit">
				<p class="text-primary mb-5 font-mono text-xs tracking-widest uppercase">
					Semantic data catalog · Early access
				</p>
				<h1 class="text-foreground text-5xl font-semibold tracking-tight leading-[1.1] md:text-6xl">
					Understand your data.<br />Automatically.
				</h1>
				<p class="text-muted-foreground max-w-md mt-6 text-sm leading-relaxed">
					Nomox indexes your data sources, infers business semantics with AI, and exposes a
					structured catalog to your team and AI tools.
				</p>
				<div class="mt-10 flex items-center gap-4">
					<a
						href="/waitlist"
						class="waitlist-btn bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
					>
						Request Demo
					</a>
					<a
						href="#how-it-works"
						class="text-muted-foreground hover:text-foreground text-sm transition-colors"
					>
						How it works ↓
					</a>
				</div>
			</div>
		</div>

		<!-- Screenshot: absolutely positioned, bleeds right and below section border -->
		<div
			class="border-border absolute overflow-hidden rounded-tl-xl border-l border-t shadow-2xl shadow-black/10"
			style="top: 6.5rem; left: 65%; right: 0; bottom: -3.5rem;"
		>
			<img
				src={screenshot}
				alt="Nomox admin console"
				class="block h-full w-full object-cover object-left-top"
				draggable="false"
			/>
		</div>
	</section>

	<!-- Integration diagram -->


	<!-- Features grid -->
	<section class="border-border border-b">
		<div class="mx-auto max-w-5xl">
			<div class="grid grid-cols-1 divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
				{#each [
					{ num: '01', label: 'Semantic catalog', desc: 'Every source, table and column enriched with inferred business meanings, entities, glossary terms, and domain relationships.' },
					{ num: '02', label: 'MCP integration',  desc: 'Expose your catalog to Claude, Cursor and any MCP-compatible AI client with one toggle.' },
					{ num: '03', label: 'BI platform',      desc: 'Explore and visualise your data with a built-in analytics layer powered by your semantic model.' },
				] as f}
					<div class="border-border px-8 py-10">
						<p class="text-muted-foreground mb-3 font-mono text-xs">{f.num}</p>
						<p class="text-foreground mb-2 text-sm font-semibold">{f.label}</p>
						<p class="text-muted-foreground text-xs leading-relaxed">{f.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

		<section class="border-border border-b">
		<div class="mx-auto max-w-3xl px-8 py-12">
			<IntegrationDiagram />
		</div>
	</section>
	<!-- How it works -->
	<section id="how-it-works" class="border-border border-b">
		<div class="mx-auto max-w-5xl px-8 py-10">
			<h2 class="text-foreground text-lg font-semibold tracking-tight">How it works</h2>
			<p class="text-muted-foreground mt-2 max-w-lg text-sm leading-relaxed">
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
		<div class="mx-auto grid max-w-5xl grid-cols-1 divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
			<div class="px-8 py-14">
				<p class="text-muted-foreground mb-3 font-mono text-xs">Early access</p>
				<h2 class="text-foreground text-2xl font-semibold tracking-tight">
					Be the first to know.
				</h2>
				<p class="text-muted-foreground mt-3 max-w-xs text-sm leading-relaxed">
					We're onboarding teams selectively. Join the waitlist and we'll reach out when a spot opens.
				</p>
				<a
					href="/waitlist"
					class="waitlist-btn bg-foreground text-primary-foreground hover:bg-primary/90 mt-8 inline-block rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
				>
					Request Demo
				</a>
			</div>
			<div class="border-border flex flex-col justify-between px-8 py-14">
				<div class="grid grid-cols-1 gap-6">
					{#each [
						{ label: 'Free during early access', desc: 'No credit card. No commitment.' },
						{ label: 'Works with your stack',    desc: 'PostgreSQL, MongoDB, Trino and more.' },
						{ label: 'AI-native from day one',   desc: 'MCP, Claude, Cursor — all supported.' },
					] as item}
						<div>
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
