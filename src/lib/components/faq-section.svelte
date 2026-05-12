<script lang="ts">
	import { fadeUp } from '$lib/actions/fade-up';
	import Collapsible from '$lib/components/ui/collapsible/collapsible.svelte';
	import CollapsibleTrigger from '$lib/components/ui/collapsible/collapsible-trigger.svelte';
	import CollapsibleContent from '$lib/components/ui/collapsible/collapsible-content.svelte';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';

	const faqs = [
		{
			q: 'What data sources does Nomox support?',
			a: "Nomox connects to PostgreSQL, MySQL, MSSQL, MongoDB, Snowflake, BigQuery, Redshift, Databricks, and Google Sheets. More connectors are added regularly — reach out if yours isn't listed.",
		},
		{
			q: 'Does Nomox read my actual data?',
			a: 'By default, Nomox reads only schema structure — table names, column names, and types. It never touches row data, customer records, or PII unless you explicitly enable lightweight profiling for a specific source.',
		},
		{
			q: 'How does the AI semantic inference work?',
			a: "Nomox's indexer analyzes your schemas, column naming patterns, and optional sample statistics to assign business labels, infer entity types, and surface domain relationships. The catalog updates automatically when your schemas change.",
		},
		{
			q: 'How long does it take to set up?',
			a: 'Most teams are up and running in under an hour. You connect a source, Nomox indexes it, and the catalog is immediately browsable. No YAML files, no governance projects, no manual tagging.',
		},
		{
			q: 'Is Nomox self-hosted or cloud?',
			a: 'Nomox runs in your own infrastructure. The indexer connects directly to your sources from your environment — metadata stays in your stack and is never sent to external systems.',
		},
		{
			q: 'What is MCP integration?',
			a: 'MCP (Model Context Protocol) lets AI tools like Claude and Cursor query your catalog directly. Instead of hallucinating column names, they get accurate, up-to-date context from your real data structure.',
		},
		{
			q: "What's included in early access?",
			a: "Early access partners get full product access, direct support from the Nomox team, and the opportunity to shape the roadmap. We're onboarding a small number of teams — get in touch to join.",
		},
	];
</script>

<section class="faq-section border-b border-border">
	<div class="mx-auto max-w-section px-8 py-20">
		<div class="flex flex-col gap-16 lg:flex-row lg:gap-24">

			<!-- Left: sticky header -->
			<div class="lg:w-72 lg:shrink-0">
				<div class="lg:sticky lg:top-28">
					<p
						data-fade-up="pending"
						use:fadeUp
						class="text-primary mb-4 font-mono text-xs uppercase tracking-widest"
					>
						FAQ
					</p>
					<h2
						data-fade-up="pending"
						use:fadeUp={{ delay: 60 }}
						class="text-foreground text-4xl font-semibold leading-tight tracking-tighter"
					>
						Common<br />questions.
					</h2>
					<p
						data-fade-up="pending"
						use:fadeUp={{ delay: 120 }}
						class="text-muted-foreground mt-5 text-sm leading-relaxed"
					>
						Can't find what you're looking for?
					</p>
					<a
						data-fade-up="pending"
						use:fadeUp={{ delay: 160 }}
						href="mailto:team@get-nomox.com"
						class="text-foreground mt-1 inline-block text-sm font-medium underline underline-offset-4 transition-colors hover:text-primary"
					>
						Drop us a line →
					</a>
				</div>
			</div>

			<!-- Right: accordion -->
			<div
				data-fade-up="pending"
				use:fadeUp={{ delay: 100 }}
				class="flex-1 divide-y divide-border"
			>
				{#each faqs as faq, i}
					<Collapsible>
						<CollapsibleTrigger
							class="group grid w-full cursor-pointer grid-cols-[2.5rem_1fr_1.25rem] items-start gap-3 py-6 text-left"
						>
							<span
								class="font-mono text-xs tabular-nums text-muted-foreground/60 transition-colors duration-200 group-data-[state=open]:text-primary pt-0.5"
							>
								{String(i + 1).padStart(2, '0')}
							</span>
							<span class="text-foreground text-[15px] font-semibold leading-snug">
								{faq.q}
							</span>
							<ChevronDownIcon
								class="text-muted-foreground mt-0.5 size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
							/>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<div class="grid grid-cols-[2.5rem_1fr_1.25rem] gap-3 pb-6">
								<span></span>
								<p class="text-muted-foreground text-sm leading-relaxed">
									{faq.a}
								</p>
							</div>
						</CollapsibleContent>
					</Collapsible>
				{/each}
			</div>

		</div>
	</div>
</section>

<style>
	.faq-section {
		background-color: #ffffff;
		background-image:
			radial-gradient(circle at 15% 60%, rgba(45, 45, 246, 0.05) 0%, transparent 55%),
			radial-gradient(circle at 85% 15%, rgba(45, 45, 246, 0.03) 0%, transparent 50%);
	}
</style>
