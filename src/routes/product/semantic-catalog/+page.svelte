<script lang="ts">
	import PublicNav from "$lib/components/public-nav.svelte";
	import PublicFooter from "$lib/components/public-footer.svelte";
	import ProductCta from "$lib/components/product-cta.svelte";
	import { fadeUp } from "$lib/actions/fade-up";

	const capabilities = [
		{
			num: "01",
			label: "Automatic discovery",
			desc: "Reads schema metadata, column names, data types, and sample values from every connected source. No manual configuration, no documentation projects — just connect and Nomox handles the rest.",
		},
		{
			num: "02",
			label: "Cross-source relationships",
			desc: "Discovers implicit relationships across sources that are never declared as foreign keys — like a customer_id column in a spreadsheet that corresponds to an id in your Postgres users table.",
		},
		{
			num: "03",
			label: "Business-level meaning",
			desc: "Enriches every field and table with plain-English descriptions, inferred domain terms, and glossary entries, so anyone in the organisation can understand what the data represents without asking an engineer.",
		},
		{
			num: "04",
			label: "Always up to date",
			desc: "The catalog re-indexes periodically as sources change. It stays accurate without maintenance overhead — no more documentation that is wrong the day after it is written.",
		},
	];

	const solutions = [
		{ label: "Data teams", href: "/solutions/data-teams" },
		{ label: "Engineering onboarding", href: "/solutions/onboarding" },
	];
</script>

<div class="bg-background text-foreground flex min-h-screen flex-col">
	<PublicNav />

	<!-- Hero -->
	<section class="border-border border-b">
		<div class="mx-auto max-w-section px-8 py-20 md:py-24">
			<p
				data-fade-up="pending"
				use:fadeUp
				class="text-primary mb-5 font-mono text-xs uppercase tracking-widest"
			>
				Products · Semantic Catalog
			</p>
			<h1
				data-fade-up="pending"
				use:fadeUp={{ delay: 60 }}
				class="text-foreground max-w-2xl text-5xl font-semibold leading-[1.1] tracking-tight"
			>
				Your data, documented automatically.
			</h1>
			<p
				data-fade-up="pending"
				use:fadeUp={{ delay: 140 }}
				class="text-muted-foreground mt-6 max-w-lg text-sm leading-relaxed"
			>
				Nomox reads every connected source, maps relationships across all of them, and enriches
				each field with business-level meaning — without anyone writing documentation by hand.
			</p>
			<p class="text-muted-foreground mt-5 font-mono text-xs uppercase tracking-widest">
				For data engineers &amp; analysts
			</p>
		</div>
	</section>

	<!-- Description -->
	<section class="border-border border-b">
		<div class="mx-auto max-w-section px-8 py-14">
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
				<p
					data-fade-up="pending"
					use:fadeUp
					class="text-foreground text-sm leading-relaxed"
				>
					The Semantic Catalog is the foundation of Nomox — and the foundation of every answer
					Nomox gives. Its quality is the ceiling on everything else. It is the shared source of
					truth that data engineers, analysts, and every AI tool you connect to it all reason
					against.
				</p>
				<p
					data-fade-up="pending"
					use:fadeUp={{ delay: 80 }}
					class="text-muted-foreground text-sm leading-relaxed"
				>
					Data engineers spend less time being the company's human data dictionary. New team
					members understand the data model in days, not months. And analysts can go deeper using
					the same unified layer, inside the tools they already work with.
				</p>
			</div>
		</div>
	</section>

	<!-- Capabilities -->
	<section class="border-border border-b">
		<div class="mx-auto max-w-section px-8 py-14">
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
		<div class="mx-auto max-w-section px-8 py-10">
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

	<ProductCta />

	<PublicFooter />
</div>
