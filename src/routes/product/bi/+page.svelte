<script lang="ts">
	import PublicNav from "$lib/components/public-nav.svelte";
	import PublicFooter from "$lib/components/public-footer.svelte";
	import LandingCta from "$lib/components/landing-cta.svelte";
	import ProductHero from "$lib/components/products/product-hero.svelte";
	import { fadeUp } from "$lib/actions/fade-up";

	const capabilities = [
		{
			num: "01",
			label: "Plain-English queries",
			desc: "Ask any question about company data in natural language. No SQL, no schema knowledge, no data engineer in the loop-and no limitation to the questions someone anticipated when building a dashboard.",
		},
		{
			num: "02",
			label: "Cross-source answers",
			desc: "Draws from all connected sources at once. A manager can ask a question that spans a Postgres database and a Google Sheet without anyone having pre-unified those sources elsewhere.",
		},
		{
			num: "03",
			label: "Reasoning trace",
			desc: "Every answer shows the full SQL query that was run, broken down step by step with a plain-English explanation. A non-technical manager can sanity-check it. An analyst can copy and extend it.",
		},
		{
			num: "04",
			label: "Persistent dashboards",
			desc: "Save recurring questions as dashboards that stay current and draw from your unified data layer. Ad-hoc queries and structured dashboards live in the same place-you are never limited to one or the other.",
		},
	];

	const solutions = [
		{ label: "Decision makers", href: "/solutions/decision-makers" },
		{ label: "Engineering onboarding", href: "/solutions/onboarding" },
	];
</script>

<div class="bg-background text-foreground flex min-h-screen flex-col">
	<PublicNav />

	<ProductHero
		eyebrow="Products · BI Platform"
		title="Any question. Any time. Across all your data."
		subtitle="Built on top of the Semantic Catalog, the BI Platform lets non-technical users ask questions about company data in plain English and get immediate, traceable answers-or build persistent dashboards that draw from all connected sources at once."
		forLine="For managers & operations teams"
	/>

	<!-- Description -->
	<section class="border-border border-b">
		<div class="mx-auto max-w-section px-8 py-14">
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
				<p
					data-fade-up="pending"
					use:fadeUp
					class="text-foreground text-sm leading-relaxed"
				>
					Dashboards answer the questions someone thought to ask when they built them. They don't
					answer new questions, can't cross-reference data from different sources on the fly, and
					require a data team to update whenever the business changes. Nomox fills the space
					between 'the dashboard doesn't cover this' and 'let me ask the data team'.
				</p>
				<p
					data-fade-up="pending"
					use:fadeUp={{ delay: 80 }}
					class="text-muted-foreground text-sm leading-relaxed"
				>
					The BI Platform works directly on top of the unified semantic layer, so it can answer
					any ad-hoc question across all your connected sources at once. Every answer includes a
					reasoning trace so users can see exactly how the result was reached-and analysts can
					take the query and build on it.
				</p>
			</div>
		</div>
	</section>

	<!-- Capabilities -->
	<section class="border-border border-b">
		<div class="mx-auto max-w-section px-8 py-14">
			<p class="text-primary mb-8 font-mono text-xs uppercase tracking-widest">
				Capabilities
			</p>
			<div class="divide-border divide-y">
				{#each capabilities as cap, i}
					<div
						data-fade-up="pending"
						use:fadeUp={{ delay: i * 60 }}
						class="grid grid-cols-1 gap-2 py-6 md:grid-cols-3 md:gap-8"
					>
						<div class="flex items-baseline gap-4">
							<span class="text-muted-foreground font-mono text-xs">{cap.num}</span>
							<span class="text-foreground text-sm font-semibold">{cap.label}</span>
						</div>
						<p class="text-muted-foreground text-sm leading-relaxed md:col-span-2">
							{cap.desc}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Who it's for -->
	<section class="border-border border-b">
		<div class="mx-auto max-w-section px-8 py-10">
			<div class="flex flex-col gap-4 md:flex-row md:items-center md:gap-10">
				<p class="text-primary font-mono text-xs uppercase tracking-widest">
					Explore by role
				</p>
				<div class="flex flex-wrap gap-4">
					{#each solutions as s}
						<a
							href={s.href}
							class="text-foreground hover:text-primary text-sm font-medium transition-colors"
						>
							{s.label} →
						</a>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<LandingCta />

	<PublicFooter />
</div>
