<script lang="ts">
	import { onMount, tick } from "svelte";
	import { fadeUp } from "$lib/actions/fade-up";
	import WandIcon from "@lucide/svelte/icons/wand-sparkles";
	import BookOpenIcon from "@lucide/svelte/icons/book-open";
	import BotIcon from "@lucide/svelte/icons/bot";
	import NetworkIcon from "@lucide/svelte/icons/network";
	import SearchIcon from "@lucide/svelte/icons/search";
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import LayoutListIcon from "@lucide/svelte/icons/layout-list";
	import ShieldCheckIcon from "@lucide/svelte/icons/shield-check";
	import ZapIcon from "@lucide/svelte/icons/zap";
	import UsersIcon from "@lucide/svelte/icons/users";
	import RefreshCwIcon from "@lucide/svelte/icons/refresh-cw";
	import TargetIcon from "@lucide/svelte/icons/target";

	const personas = [
		{
			id: "data-wizards",
			label: "data wizards",
			href: "/solutions/data-teams",
			tagline: "For analytics engineers, DBAs and data folks.",
			values: [
				{
					icon: WandIcon,
					title: "Zero manual tagging",
					desc: "Nomox infers business meaning automatically from your schemas and samples - no YAML, no spreadsheets, no tribal knowledge required.",
				},
				{
					icon: BookOpenIcon,
					title: "Shared vocabulary",
					desc: 'Every analyst works from the same enriched definitions. No more debating what "active user" means in your weekly standup.',
				},
				{
					icon: BotIcon,
					title: "AI tools that actually know your data",
					desc: "Feed your catalog to Claude, Cursor or any MCP-compatible tool. AI gets the right context - not hallucinated column names.",
				},
				{
					icon: NetworkIcon,
					title: "Domain relationships, mapped",
					desc: "Entities, lineage and domain boundaries emerge from your schemas - not from a governance project that never ships.",
				},
			],
		},
		{
			id: "managers",
			label: "managers",
			href: "/solutions/decision-makers",
			tagline: "For PMs, executives and decision makers.",
			values: [
				{
					icon: SearchIcon,
					title: "No SQL required",
					desc: "Understand your full data landscape through a browsable, searchable catalog with plain-English labels on every table and column.",
				},
				{
					icon: TrendingUpIcon,
					title: "Business-first metrics",
					desc: "Revenue, churn, conversion - your KPIs are labelled and explained in business terms, not raw database identifiers.",
				},
				{
					icon: LayoutListIcon,
					title: "Instant data inventory",
					desc: "Know exactly what data you have, where it lives, and who owns it. No more back-and-forth with the data team to answer basic questions.",
				},
				{
					icon: ShieldCheckIcon,
					title: "Trustworthy AI answers",
					desc: "When you ask an AI assistant a question about your data, it draws from a catalog you own - not a black box.",
				},
			],
		},
		{
			id: "people",
			label: "people",
			href: "/solutions/onboarding",
			tagline: "For engineers, designers and the rest of the team.",
			values: [
				{
					icon: ZapIcon,
					title: "Onboard in hours, not weeks",
					desc: "New engineers get a searchable, navigable map of your entire data stack from day one. No more asking what `rev_arr_ltm_adj` means.",
				},
				{
					icon: UsersIcon,
					title: "Self-serve understanding",
					desc: "Anyone on the team can look up what a table contains, what a column means, and how it relates to other data - without pinging a DBA.",
				},
				{
					icon: RefreshCwIcon,
					title: "Always up to date",
					desc: "The catalog re-indexes automatically when schemas change, so documentation never goes stale or contradicts reality.",
				},
				{
					icon: TargetIcon,
					title: "One source of truth",
					desc: "Engineering, analytics, and product all read from the same definitions. Fewer misunderstandings, fewer broken dashboards.",
				},
			],
		},
	];

	type PersonaId = "data-wizards" | "managers" | "people";

	let active: PersonaId = "data-wizards";
	let animating = false;
	let mounted = false;

	let pillContainerEl: HTMLElement;
	let btnEls: (HTMLElement | null)[] = [null, null, null];
	let ind = { left: 0, top: 0, width: 0, height: 0 };

	let cycleTimer: ReturnType<typeof setInterval>;
	const CYCLE_MS = 30_000;

	function measureBtn(id: PersonaId) {
		const idx = personas.findIndex((p) => p.id === id);
		const btn = btnEls[idx];
		if (!pillContainerEl || !btn) return;
		const cr = pillContainerEl.getBoundingClientRect();
		const br = btn.getBoundingClientRect();
		ind = {
			left: br.left - cr.left,
			top: br.top - cr.top,
			width: br.width,
			height: br.height,
		};
	}

	function selectPersona(id: PersonaId, fromCycle = false) {
		if (id === active && !fromCycle) return;
		if (!fromCycle) restartCycle();
		measureBtn(id);
		animating = true;
		setTimeout(() => {
			active = id;
			animating = false;
		}, 160);
	}

	function restartCycle() {
		clearInterval(cycleTimer);
		startCycle();
	}

	function startCycle() {
		cycleTimer = setInterval(() => {
			const idx = personas.findIndex((p) => p.id === active);
			const next = personas[(idx + 1) % personas.length].id;
			selectPersona(next as PersonaId, true);
		}, CYCLE_MS);
	}

	onMount(() => {
		const onResize = () => measureBtn(active);
		window.addEventListener("resize", onResize);

		tick().then(() => {
			measureBtn(active);
			mounted = true;
			startCycle();
		});

		return () => {
			clearInterval(cycleTimer);
			window.removeEventListener("resize", onResize);
		};
	});

	$: current = personas.find((p) => p.id === active)!;
</script>

<section class="border-b border-border">
	<div class="mx-auto max-w-section px-8 py-24">
		<!-- Headline with sliding pill -->
		<div
			data-fade-up="pending"
			use:fadeUp
			class="flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
		>
			<span class="text-foreground text-3xl tracking-tight md:text-4xl">Why</span>

			<span
				bind:this={pillContainerEl}
				class="relative inline-flex items-center rounded-full border border-foreground bg-background p-1 gap-1"
			>
				<span
					class="absolute rounded-full bg-primary {mounted
						? 'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]'
						: ''}"
					style="left:{ind.left}px; top:{ind.top}px; width:{ind.width}px; height:{ind.height}px;"
					aria-hidden="true"
				></span>

				{#each personas as p, i}
					<button
						bind:this={btnEls[i]}
						on:click={() => selectPersona(p.id as PersonaId)}
						class="relative z-10 rounded-full px-3 py-1.5 text-sm font-medium cursor-pointer transition-colors duration-150 {p.id ===
						active
							? 'text-primary-foreground'
							: 'text-foreground hover:bg-muted/60'}"
					>
						{p.label}
					</button>
				{/each}
			</span>

			<span class="text-foreground text-3xl tracking-tight md:text-4xl">love Nomox.</span>
		</div>

		<!-- Tagline subhead -->
		<div
			class="mt-3 flex justify-center transition-opacity duration-150 {animating ? 'opacity-0' : 'opacity-100'}"
		>
			<p class="text-muted-foreground text-sm">{current.tagline}</p>
		</div>

		<!-- Editorial 2-col grid with display-size numbers -->
		<ol
			class="mt-16 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 md:gap-x-16 md:gap-y-14 transition-opacity duration-150 {animating ? 'opacity-0' : 'opacity-100'}"
		>
			{#each current.values as item, i}
				<li class="value-row group relative">
					<!-- Big display number -->
					<div class="flex items-baseline gap-3 mb-4">
						<span class="font-mono text-4xl md:text-5xl font-medium text-foreground/15 tabular-nums leading-none">
							0{i + 1}
						</span>
						<span class="value-rule" aria-hidden="true"></span>
						<div class="size-7 inline-flex items-center justify-center rounded-md border border-border bg-background shrink-0 transition-colors group-hover:border-primary/40 group-hover:bg-primary/5">
							<svelte:component this={item.icon} class="text-primary size-3.5" />
						</div>
					</div>

					<p class="text-foreground text-lg md:text-xl font-semibold tracking-tight">
						{item.title}
					</p>
					<p class="text-muted-foreground mt-2 text-sm leading-relaxed max-w-md">
						{item.desc}
					</p>
				</li>
			{/each}
		</ol>

		<!-- Link to full solutions page -->
		<div
			class="mt-12 flex justify-center transition-opacity duration-150 {animating ? 'opacity-0' : 'opacity-100'}"
		>
			<a
				href={current.href}
				class="group inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary text-sm transition-colors"
			>
				Learn more about Nomox for {current.label}
				<span class="transition-transform group-hover:translate-x-0.5">→</span>
			</a>
		</div>
	</div>
</section>

<style>
	.value-rule {
		flex: 1;
		height: 1px;
		background: var(--border);
		align-self: center;
		transition: background-color 200ms ease, opacity 200ms ease;
	}
	.value-row:hover .value-rule {
		background: #2d2df6;
		opacity: 0.4;
	}
</style>
