<script lang="ts">
	import PublicNav from "$lib/components/public-nav.svelte";
	import PublicFooter from "$lib/components/public-footer.svelte";
	import SolutionHero from "$lib/components/solutions/solution-hero.svelte";
	import SolutionProblems from "$lib/components/solutions/solution-problems.svelte";
	import SolutionFeatureTiles from "$lib/components/solutions/solution-feature-tiles.svelte";

	const problems = [
		{
			label: "No shared vocabulary",
			desc: 'Every analyst has their own definition of "revenue" or "active user". Meetings stall on semantics instead of insights.',
		},
		{
			label: "Schema archaeology",
			desc: "Finding the right table means digging through Slack threads, outdated wikis, and hoping someone remembers why that column exists.",
		},
		{
			label: "AI tools lack context",
			desc: "LLMs and BI copilots hallucinate or give wrong answers because they see raw column names with no business meaning attached.",
		},
		{
			label: "Documentation decays",
			desc: "Data dictionaries go stale the moment they're written. Schema changes go undocumented and trust erodes.",
		},
	];

	const tiles = [
		{
			label: "Shared glossary",
			desc: "One canonical definition of every business term — revenue, active user, churn — that your whole team and every AI tool agrees on.",
			href: "/product#semantic-catalog",
		},
		{
			label: "Catalog search",
			desc: "Find any table or column by business name, not by guessing raw identifiers. Descriptions, owners and sample rows included.",
			href: "/product#semantic-catalog",
		},
		{
			label: "MCP integration",
			desc: "Feed accurate semantic context to Claude, Cursor, and every MCP-compatible AI tool with one toggle.",
			href: "/product#mcp",
		},
		{
			label: "Auto-updated catalog",
			desc: "Schema changes trigger automatic re-indexing. Your catalog stays current without any manual maintenance.",
			href: "/product#semantic-catalog",
		},
	];
</script>

<div class="bg-background text-foreground flex min-h-screen flex-col">
	<PublicNav />

	<SolutionHero
		eyebrow="Solutions · Data teams"
		title="Your data, finally understood."
		subtitle="Nomox automatically infers business meaning from your schemas so your team stops arguing about definitions and starts shipping insights."
	/>

	<SolutionProblems
		{problems}
		solutionTitle="One catalog. Zero manual tagging."
		solutionBody="Nomox reads your schemas and samples, then assigns business meanings, entities and glossary terms automatically. Your whole team works from the same ground truth — and it stays up to date as your data evolves."
	/>

	<SolutionFeatureTiles {tiles} />

	<PublicFooter />
</div>
