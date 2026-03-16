<script lang="ts">
	import PublicNav from "$lib/components/public-nav.svelte";
	import PublicFooter from "$lib/components/public-footer.svelte";
	import SolutionHero from "$lib/components/solutions/solution-hero.svelte";
	import SolutionProblems from "$lib/components/solutions/solution-problems.svelte";
	import SolutionFeatureTiles from "$lib/components/solutions/solution-feature-tiles.svelte";

	const problems = [
		{
			label: "Mismatched semantics",
			desc: "Every data source has its own columns and formats. Work is slowed by doing individual transformations instead of focuing on the full potential.",
		},
		{
			label: "Shared knowledge is missing",
			desc: "Only a few people can orient in the whole dataset. Manual documentation quickly lags behind. Schema changes go undocumented.",
		},
		{
			label: "Multiple sources",
			desc: "Finding the right source is looking through piles of documentation. Getting necesssary access is complicated and slow.",
		},

		{
			label: "AI tools lack context",
			desc: "LLMs and BI copilots hallucinate or give wrong answers because they see raw column names with no business meaning attached.",
		},
	];

	const tiles = [
		{
			label: "Shared documentation",
			desc: "All data sources accessible from place together with all semantic information. Descriptions, owners and sample rows included.",
			href: "/product#semantic-catalog",
			productName: "Catalog",
		},
		{
			label: "Entity search",
			desc: "Entities streatched over multiple datasources synoptically shown on place. No more quessing and blind tries.",
			href: "/product#semantic-catalog",
			productName: "Catalog",
		},
		{
			label: "MCP integration",
			desc: "Feed your data with accurate semantic context to Claude, Cursor, and every MCP-compatible AI tool from single place.",
			href: "/product#mcp",
			productName: "MCP",
		},
		{
			label: "Auto-updated catalog",
			desc: "Thanks to periodial re-indexing your catalog stays current without any manual maintenance.",
			href: "/product#semantic-catalog",
			productName: "Catalog",
		},
	];
</script>

<div class="bg-background text-foreground flex min-h-screen flex-col">
	<PublicNav />

	<SolutionHero
		eyebrow="Solutions · Data teams"
		title="Your data, finally unified."
		subtitle="Nomox automatically infers connections across tables and datasets so your team can stop looking for individual mappings and work with all the data from the same place."
	/>

	<SolutionProblems
		{problems}
		solutionTitle="One catalog. One gateway."
		solutionBody="Nomox reads your schemas and samples and identifies bussiness meanings of individual data objects and entities across the whole system. The result is a unified gateway to your data with all the neccessary semantic information."
	/>

	<SolutionFeatureTiles {tiles} />

	<PublicFooter />
</div>
