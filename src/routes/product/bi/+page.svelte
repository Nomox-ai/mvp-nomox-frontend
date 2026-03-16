<script lang="ts">
	import PublicNav from "$lib/components/public-nav.svelte";
	import PublicFooter from "$lib/components/public-footer.svelte";
	import { fadeUp } from "$lib/actions/fade-up";

	const capabilities = [
		{
			num: "01",
			label: "Plain-English queries",
			desc: "Ask any question about company data in natural language. No SQL, no schema knowledge, no data engineer in the loop — and no limitation to the questions someone anticipated when building a dashboard.",
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
			desc: "Save recurring questions as dashboards that stay current and draw from your unified data layer. Ad-hoc queries and structured dashboards live in the same place — you are never limited to one or the other.",
		},
	];

	const solutions = [
		{ label: "Decision makers", href: "/solutions/decision-makers" },
		{ label: "Engineering onboarding", href: "/solutions/onboarding" },
	];
</script>

<div class="bg-background text-foreground flex min-h-screen flex-col">
	<PublicNav />

	<!-- Hero -->
	<section class="border-border border-b">
		<div class="mx-auto max-w-5xl px-8 py-20 md:py-24">
			<p
				data-fade-up="pending"
				use:fadeUp
				class="text-primary mb-5 font-mono text-xs uppercase tracking-widest"
			>
				Products · BI Platform
			</p>
			<h1
				data-fade-up="pending"
				use:fadeUp={{ delay: 60 }}
				class="text-foreground max-w-2xl text-5xl font-semibold leading-[1.1] tracking-tight"
			>
				Any question. Any time. Across all your data.
			</h1>
			<p
				data-fade-up="pending"
				use:fadeUp={{ delay: 140 }}
				class="text-muted-foreground mt-6 max-w-lg text-sm leading-relaxed"
			>
				Built on top of the Semantic Catalog, the BI Platform lets non-technical users ask
				questions about company data in plain English and get immediate, traceable answers — or
				build persistent dashboards that draw from all connected sources at once.
			</p>
			<p class="text-muted-foreground mt-5 font-mono text-xs uppercase tracking-widest">
				For managers &amp; operations teams
			</p>
		</div>
	</section>

	<!-- Description -->
	<section class="border-border border-b">
		<div class="mx-auto max-w-5xl px-8 py-14">
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
					reasoning trace so users can see exactly how the result was reached — and analysts can
					take the query and build on it.
				</p>
			</div>
		</div>
	</section>

	<!-- Capabilities -->
	<section class="border-border border-b">
		<div class="mx-auto max-w-5xl px-8 py-14">
			<p class="text-muted-foreground mb-8 font-mono text-xs uppercase tracking-widest">
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
		<div class="mx-auto max-w-5xl px-8 py-10">
			<div class="flex flex-col gap-4 md:flex-row md:items-center md:gap-10">
				<p class="text-muted-foreground font-mono text-xs uppercase tracking-widest">
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

	<!-- CTA -->
	<section class="border-border border-b">
		<div class="mx-auto max-w-5xl px-8 py-14">
			<h2 class="text-foreground text-2xl font-semibold tracking-tight">
				Ready to unify your data?
			</h2>
			<p class="text-muted-foreground mt-3 max-w-sm text-sm leading-relaxed">
				We are onboarding companies in batches. Join the waitlist and we will reach out when a
				spot opens.
			</p>
			<a
				href="/waitlist"
				class="bg-foreground text-background hover:bg-foreground/85 mt-8 inline-block rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
			>
				Request Demo
			</a>
		</div>
	</section>

	<PublicFooter />
</div>
