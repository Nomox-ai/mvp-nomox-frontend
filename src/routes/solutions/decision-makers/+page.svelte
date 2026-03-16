<script lang="ts">
	import PublicNav from '$lib/components/public-nav.svelte';
	import PublicFooter from '$lib/components/public-footer.svelte';
	import SolutionHero from '$lib/components/solutions/solution-hero.svelte';
	import SolutionProblems from '$lib/components/solutions/solution-problems.svelte';
	import SolutionFeatureTiles from '$lib/components/solutions/solution-feature-tiles.svelte';

	const problems = [
		{
			label: 'Data without context',
			desc: 'Dashboards show numbers, but nobody can explain what the numbers actually mean or how they were calculated.',
		},
		{
			label: 'Conflicting reports',
			desc: 'Finance, Product, and Sales each present different figures in the same meeting. Trust in data erodes.',
		},
		{
			label: 'Dependency on technical staff',
			desc: 'Every data question has to be routed through an engineer or analyst. Decisions slow down waiting for answers.',
		},
		{
			label: 'AI tools give unreliable answers',
			desc: 'Asking an AI assistant about business metrics returns guesses dressed up as facts — no grounding in your actual data model.',
		},
	];

	const tiles = [
		{
			icon: '📊',
			label: 'Business-ready catalog',
			desc: 'Every metric defined in plain language — what it measures, how it is calculated, and who owns it.',
			href: '/product#semantic-catalog',
		},
		{
			icon: '🤝',
			label: 'Single source of truth',
			desc: 'One agreed definition of revenue, churn, and retention that every team and every report uses consistently.',
			href: '/product#semantic-catalog',
		},
		{
			icon: '🤖',
			label: 'AI you can trust',
			desc: 'Ask business questions in natural language and get answers grounded in your verified semantic model.',
			href: '/product#mcp',
		},
		{
			icon: '🔄',
			label: 'Always up to date',
			desc: 'Definitions update automatically when your data evolves. No stale reports, no outdated dashboards.',
			href: '/product#semantic-catalog',
		},
	];
</script>

<div class="bg-background text-foreground flex min-h-screen flex-col">
	<PublicNav />

	<SolutionHero
		eyebrow="Solutions · Decision makers"
		title="Data you can act on."
		subtitle="Nomox gives decision makers a clear, trusted view of what the numbers mean — without needing to know SQL or ask an engineer every time."
	/>

	<SolutionProblems
		{problems}
		solutionTitle="Clarity without the bottleneck."
		solutionBody="Nomox turns raw schemas into a business-readable catalog. Metrics have owners, definitions, and lineage — so you always know what you're looking at and can trust the answer."
	/>

	<SolutionFeatureTiles {tiles} />

	<PublicFooter />
</div>
