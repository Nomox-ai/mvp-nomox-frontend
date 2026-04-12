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

	// Sliding indicator state
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

<section class="border-border">
	<div class="mx-auto max-w-section px-8 py-20">
		<!-- Headline with swappable sliding pill -->
		<div
			data-fade-up="pending"
			use:fadeUp
			class="flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
		>
			<span class="text-foreground text-3xl tracking-tight">Why</span>

			<!-- Pill selector with sliding indicator -->
			<span
				bind:this={pillContainerEl}
				class="relative inline-flex items-center rounded-full border border-border bg-muted/50 p-1 gap-1"
			>
				<!-- Sliding blue background -->
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
							: 'text-muted-foreground hover:text-foreground'}"
					>
						{p.label}
					</button>
				{/each}
			</span>

			<span class="text-foreground text-3xl tracking-tight"
				>love Nomox.</span
			>
		</div>

		<!-- Per-persona value grid -->
		<div
			class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 transition-opacity duration-150 {animating
				? 'opacity-0'
				: 'opacity-100'}"
		>
			{#each current.values as item}
				<div
					class="rounded-xl border border-border bg-muted/20 px-6 py-5"
				>
					<svelte:component
						this={item.icon}
						class="text-primary mb-3 size-4"
					/>
					<p class="text-foreground text-sm font-semibold">
						{item.title}
					</p>
					<p
						class="text-muted-foreground mt-1.5 text-sm leading-relaxed"
					>
						{item.desc}
					</p>
				</div>
			{/each}
		</div>

		<!-- Link to full solutions page -->
		<div class="mt-8 flex justify-center">
			<a
				href={current.href}
				class="text-muted-foreground hover:text-foreground text-sm transition-colors"
			>
				Learn more about Nomox for {current.label} →
			</a>
		</div>
	</div>
</section>
