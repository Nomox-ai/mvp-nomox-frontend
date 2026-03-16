<script lang="ts">
	import PublicNav from "$lib/components/public-nav.svelte";
	import PublicFooter from "$lib/components/public-footer.svelte";
	import SolutionHero from "$lib/components/solutions/solution-hero.svelte";
	import SolutionProblems from "$lib/components/solutions/solution-problems.svelte";
	import SolutionFeatureTiles from "$lib/components/solutions/solution-feature-tiles.svelte";

	const problems = [
		{
			label: "Slow process flow",
			desc: "Every data question has to be routed through an engineer or analyst. Decisions are slowed down by waiting for answers.",
		},
		{
			label: "AI tools lack context",
			desc: "AI agents give unreliable results or require non-trivial knowledge, because they lack broad context.",
		},
		{
			label: "Unverifiable outputs",
			desc: "Reports arive without lineage or context. It is almost imposible to verify them quickly against the raw data.",
		},

		{
			label: "Poor data accessibility",
			desc: "Individual data sources are managed by different people. The access is usually complicated or highly technical.",
		},
	];

	const tiles = [
		{
			label: "Ask you data",
			desc: "AI powered BI platform connected to all your data sources with visualisation tools. Ask any question. Get full picture.",
			href: "/product#bi",
			productName: "BI Platform",
		},
		{
			label: "Always up to date",
			desc: "Reports and answers on demand — no queue, no expert bottleneck, no waiting until next sprint.",
			href: "/product#bi",
			productName: "BI Platform",
		},
		{
			label: "MCP server",
			desc: "Connect Nomox to your favourite AI agent and integrate with your current routine.",
			href: "/product#mcp",
			productName: "MCP",
		},
		{
			label: "Comprehensive catalog",
			desc: "Understand your data through catalog. No technical jargon. Just all the neccessary information.",
			href: "/product#semantic-catalog",
			productName: "Catalog",
		},
	];
</script>

<div class="bg-background text-foreground flex min-h-screen flex-col">
	<PublicNav />

	<SolutionHero
		eyebrow="Solutions · Decision makers"
		title="Data you can act on."
		subtitle="Nomox gives decision makers access to a clear, trusted view of what is going on — without needing to know SQL or ask an engineer every time."
	/>

	<SolutionProblems
		{problems}
		solutionTitle="Access data with AI"
		solutionBody="You can ask the data quickly and without technical knowledge. Eveything is in one place and Nomox gives tools to verify the output."
	/>

	<SolutionFeatureTiles {tiles} />

	<PublicFooter />
</div>
