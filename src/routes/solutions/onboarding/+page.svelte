<script lang="ts">
	import PublicNav from '$lib/components/public-nav.svelte';
	import PublicFooter from '$lib/components/public-footer.svelte';
	import SolutionHero from '$lib/components/solutions/solution-hero.svelte';
	import SolutionProblems from '$lib/components/solutions/solution-problems.svelte';
	import SolutionFeatureTiles from '$lib/components/solutions/solution-feature-tiles.svelte';

	const problems = [
		{
			label: 'Tribal knowledge walks out the door',
			desc: 'Critical context about tables, columns, and data quirks lives in the heads of senior engineers. When they leave, it is gone.',
		},
		{
			label: 'Onboarding takes weeks',
			desc: 'New engineers spend their first month asking questions, reading stale docs, and making avoidable mistakes with the wrong tables.',
		},
		{
			label: 'No map of the data landscape',
			desc: 'Without a catalog, understanding how data flows from source to dashboard requires reverse-engineering pipelines by hand.',
		},
		{
			label: 'AI coding tools work blind',
			desc: 'Copilots suggest queries and schema references without business context, producing code that is syntactically right but semantically wrong.',
		},
	];

	const tiles = [
		{
			icon: '🗺️',
			label: 'Full data landscape',
			desc: 'Every source, table, column, and relationship mapped and described — explorable from day one.',
			href: '/product#semantic-catalog',
		},
		{
			icon: '⚡',
			label: 'Hours not weeks',
			desc: 'New engineers find context in the catalog instead of Slack. Ramp-up time drops dramatically.',
			href: '/product#semantic-catalog',
		},
		{
			icon: '🔌',
			label: 'Smarter AI coding tools',
			desc: 'Feed Cursor, Claude, and other MCP-compatible tools with accurate schema context so they suggest correct code.',
			href: '/product#mcp',
		},
		{
			icon: '📖',
			label: 'Living documentation',
			desc: 'The catalog updates automatically as schemas change. No more docs that are wrong the day after they are written.',
			href: '/product#semantic-catalog',
		},
	];
</script>

<div class="bg-background text-foreground flex min-h-screen flex-col">
	<PublicNav />

	<SolutionHero
		eyebrow="Solutions · Engineering onboarding"
		title="Ramp up in hours, not weeks."
		subtitle="Nomox gives new engineers a complete, searchable map of your data stack from day one — so they ship confidently instead of spending a month asking questions."
	/>

	<SolutionProblems
		{problems}
		solutionTitle="No more tribal knowledge bottleneck."
		solutionBody="Nomox automatically documents every table, column, and relationship with inferred business context. New engineers explore the catalog instead of interrupting senior colleagues — and your AI coding tools finally understand what they are working with."
	/>

	<SolutionFeatureTiles {tiles} />

	<PublicFooter />
</div>
