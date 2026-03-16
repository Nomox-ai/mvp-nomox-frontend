<script lang="ts">
	import PublicNav from "$lib/components/public-nav.svelte";
	import PublicFooter from "$lib/components/public-footer.svelte";
	import SolutionHero from "$lib/components/solutions/solution-hero.svelte";
	import SolutionProblems from "$lib/components/solutions/solution-problems.svelte";
	import SolutionFeatureTiles from "$lib/components/solutions/solution-feature-tiles.svelte";

	const problems = [
		{
			label: "Onboarding takes months",
			desc: "New engineers spend their first months reading stale docs, and making avoidable mistakes with the wrong tables.",
		},
		{
			label: "Blocking key team members",
			desc: "New members must be onboarded by senior team members. Blocking them from their work.",
		},

		{
			label: "Unwritten know-how",
			desc: "Critical context about tables, columns, and data quirks lives in the heads of senior engineers. When they leave, it is gone.",
		},
		{
			label: "Unclear accesses",
			desc: "Getting access to all necessary data sources is often tedious and complicated. Without clear guidelines.",
		},
	];

	const tiles = [
		{
			label: "Full data landscape",
			desc: "Every source, table, column, and relationship mapped and described — explorable from day one.",
			href: "/product#semantic-catalog",
			productName: "Catalog",
		},
		{
			label: "Gradual adoption",
			desc: "Engineers can focus on immediate actions. Building their knowledge gradually, wihtout the preasure to know everything.",
			href: "/product#semantic-catalog",
			productName: "Catalog",
		},
		{
			label: "Gateway to all data",
			desc: "Access all necessary data sources from one place. Without complicated configs. With full semantic information.",
			href: "/product#bi",
			productName: "BI Platform",
		},
		{
			label: "Living documentation",
			desc: "The catalog updates periodically. No more docs that are wrong the day after they are written.",
			href: "/product#semantic-catalog",
			productName: "Catalog",
		},
	];
</script>

<div class="bg-background text-foreground flex min-h-screen flex-col">
	<PublicNav />

	<SolutionHero
		eyebrow="Solutions · Engineering onboarding"
		title="Ramp up quickly. "
		subtitle="Nomox gives new engineers a complete, searchable map of your data stack from day one — so they ship confidently instead of spending months sifting through the documentation."
	/>

	<SolutionProblems
		{problems}
		solutionTitle="All knowledge in one place. Automatically."
		solutionBody="Nomox automatically documents every table, column, and relationship with inferred business context. New engineers explore the catalog instead of blocking other team members."
	/>

	<SolutionFeatureTiles {tiles} />

	<PublicFooter />
</div>
