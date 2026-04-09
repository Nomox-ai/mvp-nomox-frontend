<script lang="ts">
	import { onMount } from "svelte";
	import { listConnectorIds } from "$lib/api/connectors.js";
	import { getSourceView } from "$lib/api/semantic.js";
	import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
	import { cn } from "$lib/utils.js";
	import type { SourceView, Table } from "$lib/types/semantic.js";
	import {
		SemanticCategory,
		SemanticRole,
		SourceType,
		TableType,
	} from "$lib/types/semantic.js";

	// Icons — structural
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import PanelLeftIcon from "@lucide/svelte/icons/panel-left";
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import DatabaseIcon from "@lucide/svelte/icons/database";
	import SearchIcon from "@lucide/svelte/icons/search";
	import Table2Icon from "@lucide/svelte/icons/table-2";
	import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
	import LayersIcon from "@lucide/svelte/icons/layers";
	import Code2Icon from "@lucide/svelte/icons/code-2";
	import InfoIcon from "@lucide/svelte/icons/info";
	import AlertCircleIcon from "@lucide/svelte/icons/alert-circle";

	// Icons — column semantics
	import HashIcon from "@lucide/svelte/icons/hash";
	import ClockIcon from "@lucide/svelte/icons/clock";
	import DollarSignIcon from "@lucide/svelte/icons/dollar-sign";
	import BarChart3Icon from "@lucide/svelte/icons/bar-chart-3";
	import PercentIcon from "@lucide/svelte/icons/percent";
	import TagIcon from "@lucide/svelte/icons/tag";
	import TypeIcon from "@lucide/svelte/icons/type";
	import ToggleLeftIcon from "@lucide/svelte/icons/toggle-left";
	import MapPinIcon from "@lucide/svelte/icons/map-pin";
	import BracesIcon from "@lucide/svelte/icons/braces";
	import HelpCircleIcon from "@lucide/svelte/icons/help-circle";

	// Icons — column flags
	import LockIcon from "@lucide/svelte/icons/lock";
	import LinkIcon from "@lucide/svelte/icons/link";
	import KeyRoundIcon from "@lucide/svelte/icons/key-round";

	// ─── Types ────────────────────────────────────────────────────────────────

	interface SourceEntry {
		id: string;
		view: SourceView | null;
		loading: boolean;
	}

	// ─── State ────────────────────────────────────────────────────────────────

	let sources = $state<SourceEntry[]>([]);
	let expandedSources = $state(new Set<string>());
	let manuallyCollapsed = $state(new Set<string>());
	let expandedColumns = $state(new Set<string>());
	let selectedSourceId = $state<string | null>(null);
	let selectedTableId = $state<string | null>(null);
	let searchQuery = $state("");
	let initialLoading = $state(true);
	let sidebarOpen = $state(true);

	// ─── Derived ──────────────────────────────────────────────────────────────

	let selectedEntry = $derived(sources.find((s) => s.id === selectedSourceId) ?? null);
	let selectedSource = $derived(selectedEntry?.view?.source ?? null);
	let selectedTable = $derived(
		selectedSource && selectedTableId
			? selectedSource.tables.find((t) => t.id === selectedTableId) ?? null
			: null
	);

	let filteredEntries = $derived(
		searchQuery.trim() === ""
			? sources
			: sources.filter((s) => sourceMatchesSearch(s, searchQuery.toLowerCase()))
	);

	let totalTables = $derived(
		sources.reduce((sum, s) => sum + (s.view?.source.tables.length ?? 0), 0)
	);
	let totalColumns = $derived(
		sources.reduce(
			(sum, s) =>
				sum + (s.view?.source.tables.reduce((ts, t) => ts + t.columns.length, 0) ?? 0),
			0
		)
	);

	// ─── Search helpers ───────────────────────────────────────────────────────

	function sourceMatchesSearch(entry: SourceEntry, q: string): boolean {
		if (entry.id.toLowerCase().includes(q)) return true;
		if (!entry.view) return false;
		const src = entry.view.source;
		if (src.name.toLowerCase().includes(q)) return true;
		if (src.business_context.toLowerCase().includes(q)) return true;
		if (src.domain.toLowerCase().includes(q)) return true;
		return src.tables.some((t) => tableMatchesSearch(t, q));
	}

	function tableMatchesSearch(table: Table, q: string): boolean {
		if (table.name.toLowerCase().includes(q)) return true;
		if (table.business_purpose.toLowerCase().includes(q)) return true;
		return table.columns.some(
			(c) =>
				c.name.toLowerCase().includes(q) || c.business_meaning.toLowerCase().includes(q)
		);
	}

	function getVisibleTables(entry: SourceEntry): Table[] {
		if (!entry.view) return [];
		const q = searchQuery.trim().toLowerCase();
		if (!q) return entry.view.source.tables;
		return entry.view.source.tables.filter((t) => tableMatchesSearch(t, q));
	}

	function isAutoExpanded(entry: SourceEntry): boolean {
		if (!searchQuery.trim()) return false;
		return sourceMatchesSearch(entry, searchQuery.toLowerCase());
	}

	// ─── Data loading ─────────────────────────────────────────────────────────

	async function loadCatalog() {
		let ids: string[];
		try {
			ids = await listConnectorIds();
		} catch {
			initialLoading = false;
			return;
		}

		sources = ids.map((id) => ({ id, view: null, loading: true }));
		initialLoading = false;

		if (ids.length > 0) {
			expandedSources = new Set([ids[0]]);
			selectedSourceId = ids[0];
		}

		await Promise.all(
			ids.map(async (id, i) => {
				const view = await getSourceView(id);
				sources[i] = { id, view, loading: false };
			})
		);
	}

	// ─── Navigation ───────────────────────────────────────────────────────────

	function selectSource(id: string) {
		selectedSourceId = id;
		selectedTableId = null;
		expandedColumns = new Set();
		if (!expandedSources.has(id)) {
			expandedSources = new Set([...expandedSources, id]);
		}
		sidebarOpen = true;
	}

	function selectTable(sourceId: string, tableId: string) {
		selectedSourceId = sourceId;
		selectedTableId = tableId;
		expandedColumns = new Set();
		if (!expandedSources.has(sourceId)) {
			expandedSources = new Set([...expandedSources, sourceId]);
		}
		sidebarOpen = false;
	}

	function toggleSource(id: string) {
		const next = new Set(expandedSources);
		if (next.has(id)) {
			next.delete(id);
			manuallyCollapsed = new Set([...manuallyCollapsed, id]);
		} else {
			next.add(id);
			manuallyCollapsed = new Set([...manuallyCollapsed].filter((x) => x !== id));
		}
		expandedSources = next;
	}

	function toggleColumn(columnId: string) {
		const next = new Set(expandedColumns);
		if (next.has(columnId)) next.delete(columnId);
		else next.add(columnId);
		expandedColumns = next;
	}

	onMount(loadCatalog);

	// ─── Display helpers ──────────────────────────────────────────────────────

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const categoryIcons: Record<SemanticCategory, any> = {
		[SemanticCategory.IDENTIFIER]: HashIcon,
		[SemanticCategory.TIMESTAMP]: ClockIcon,
		[SemanticCategory.CURRENCY]: DollarSignIcon,
		[SemanticCategory.QUANTITY]: BarChart3Icon,
		[SemanticCategory.PERCENTAGE]: PercentIcon,
		[SemanticCategory.CATEGORICAL]: TagIcon,
		[SemanticCategory.TEXT]: TypeIcon,
		[SemanticCategory.BOOLEAN]: ToggleLeftIcon,
		[SemanticCategory.GEOSPATIAL]: MapPinIcon,
		[SemanticCategory.JSON]: BracesIcon,
		[SemanticCategory.BINARY]: HelpCircleIcon,
		[SemanticCategory.UNKNOWN]: HelpCircleIcon,
	};

	const categoryMeta: Record<SemanticCategory, { label: string; class: string }> = {
		[SemanticCategory.IDENTIFIER]: { label: "ID",       class: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300" },
		[SemanticCategory.TIMESTAMP]:  { label: "Time",     class: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400" },
		[SemanticCategory.CURRENCY]:   { label: "Currency", class: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400" },
		[SemanticCategory.QUANTITY]:   { label: "Qty",      class: "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-400" },
		[SemanticCategory.PERCENTAGE]: { label: "Pct",      class: "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-400" },
		[SemanticCategory.CATEGORICAL]:{ label: "Cat",      class: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400" },
		[SemanticCategory.TEXT]:       { label: "Text",     class: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400" },
		[SemanticCategory.BOOLEAN]:    { label: "Bool",     class: "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400" },
		[SemanticCategory.GEOSPATIAL]: { label: "Geo",      class: "bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400" },
		[SemanticCategory.JSON]:       { label: "JSON",     class: "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400" },
		[SemanticCategory.BINARY]:     { label: "Bin",      class: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
		[SemanticCategory.UNKNOWN]:    { label: "?",        class: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400" },
	};

	const roleMeta: Record<SemanticRole, { label: string; class: string }> = {
		[SemanticRole.FACT]:      { label: "Fact",    class: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400" },
		[SemanticRole.DIMENSION]: { label: "Dim",     class: "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-400" },
		[SemanticRole.BRIDGE]:    { label: "Bridge",  class: "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400" },
		[SemanticRole.STAGING]:   { label: "Staging", class: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400" },
		[SemanticRole.AGGREGATE]: { label: "Agg",     class: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-400" },
		[SemanticRole.SNAPSHOT]:  { label: "Snap",    class: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" },
		[SemanticRole.LOG]:       { label: "Log",     class: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" },
		[SemanticRole.LOOKUP]:    { label: "Lookup",  class: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400" },
		[SemanticRole.UNKNOWN]:   { label: "?",       class: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400" },
	};

	const sourceTypeMeta: Record<SourceType, { label: string; class: string }> = {
		[SourceType.TRANSACTIONAL]: { label: "Transactional", class: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400" },
		[SourceType.ANALYTICAL]:    { label: "Analytical",    class: "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-400" },
		[SourceType.OPERATIONAL]:   { label: "Operational",   class: "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400" },
		[SourceType.EXTERNAL]:      { label: "External",      class: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400" },
		[SourceType.STAGING]:       { label: "Staging",       class: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
		[SourceType.DERIVED]:       { label: "Derived",       class: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-400" },
	};

	const tableTypeMeta: Record<TableType, string> = {
		[TableType.TABLE]:             "Table",
		[TableType.VIEW]:              "View",
		[TableType.MATERIALIZED_VIEW]: "Materialized view",
		[TableType.EXTERNAL_TABLE]:    "External table",
	};

	function formatNumber(n: number | null | undefined): string {
		if (n == null) return "—";
		if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
		if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
		return n.toLocaleString();
	}

	function formatPct(p: number | null | undefined): string {
		if (p == null) return "—";
		return `${p.toFixed(1)}%`;
	}

	function confidenceDot(confidence: number): string {
		if (confidence >= 0.85) return "bg-emerald-500";
		if (confidence >= 0.6) return "bg-amber-500";
		return "bg-red-500";
	}

	// ─── Row-type (document) helpers ──────────────────────────────────────────

	interface FlatField {
		name: string;
		type: string;   // simplified display type (no params)
		rawType: string;
		depth: number;
	}

	function isRowType(dataType: string): boolean {
		return dataType.trim().toLowerCase().startsWith("row(");
	}

	function splitAtDepth0(inner: string): string[] {
		const parts: string[] = [];
		let depth = 0;
		let current = "";
		for (const ch of inner) {
			if (ch === "(") depth++;
			else if (ch === ")") depth--;
			if (ch === "," && depth === 0) {
				parts.push(current.trim());
				current = "";
			} else {
				current += ch;
			}
		}
		if (current.trim()) parts.push(current.trim());
		return parts;
	}

	function flattenRowFields(typeStr: string, depth = 0): FlatField[] {
		const trimmed = typeStr.trim();
		if (!trimmed.toLowerCase().startsWith("row(") || !trimmed.endsWith(")")) return [];

		const inner = trimmed.slice(4, -1);
		const parts = splitAtDepth0(inner);
		const result: FlatField[] = [];

		for (const part of parts) {
			// Find first space at depth 0 to split name from type
			let spaceIdx = -1;
			let d = 0;
			for (let i = 0; i < part.length; i++) {
				if (part[i] === "(") d++;
				else if (part[i] === ")") d--;
				else if (part[i] === " " && d === 0) { spaceIdx = i; break; }
			}

			const name = spaceIdx !== -1 ? part.slice(0, spaceIdx) : "";
			const rawType = (spaceIdx !== -1 ? part.slice(spaceIdx + 1) : part).trim();
			const childIsRow = rawType.toLowerCase().startsWith("row(");
			// Strip type parameters for display (e.g. varchar(255) → varchar)
			const displayType = childIsRow ? "row" : rawType.replace(/\(.*$/, "");

			result.push({ name, type: displayType, rawType, depth });
			if (childIsRow) {
				result.push(...flattenRowFields(rawType, depth + 1));
			}
		}

		return result;
	}
</script>

<div class="flex h-full flex-col" data-guide="schema-browser">
	<!-- Page header -->
	<header class="border-border flex h-14 shrink-0 items-center border-b px-6">
		<h1 class="text-base font-semibold">Schema</h1>
		<p class="text-muted-foreground ml-3 text-sm">Data catalog with inferred semantics</p>
	</header>

	<!-- Two-panel body -->
	<div class="flex min-h-0 flex-1">

		<!-- ── Sidebar ───────────────────────────────────────────────────────── -->
		<aside class={cn("border-border flex shrink-0 flex-col border-r transition-[width] duration-200 overflow-hidden", sidebarOpen ? "w-64" : "w-0 border-r-0")}>
			<!-- Search -->
			<div class="border-border border-b p-2">
				<div class="relative">
					<SearchIcon class="text-muted-foreground absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2" />
					<input
						type="search"
						placeholder="Search sources, tables, columns…"
						bind:value={searchQuery}
						class="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border py-1.5 pl-8 pr-3 text-xs focus-visible:outline-none focus-visible:ring-1"
					/>
				</div>
			</div>

			<!-- Source tree -->
			<nav class="flex-1 overflow-y-auto p-1.5">
				{#if initialLoading}
					{#each [1, 2, 3] as _ (_)}
						<div class="flex items-center gap-2 px-2 py-1.5">
							<Skeleton class="size-3 rounded" />
							<Skeleton class="size-3.5 rounded" />
							<Skeleton class="h-3.5 w-28 rounded" />
						</div>
					{/each}
				{:else if filteredEntries.length === 0}
					<p class="text-muted-foreground px-3 py-4 text-center text-xs">
						{searchQuery ? "No matches found" : "No sources configured"}
					</p>
				{:else}
					{#each filteredEntries as entry (entry.id)}
						{@const isExpanded = (expandedSources.has(entry.id) || isAutoExpanded(entry)) && !manuallyCollapsed.has(entry.id)}
						{@const isSourceSelected = selectedSourceId === entry.id && !selectedTableId}
						{@const visibleTables = getVisibleTables(entry)}

						<div>
							<!-- Source row -->
							<button
								type="button"
								class={cn(
									"group flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left transition-colors",
									isSourceSelected
										? "bg-accent text-accent-foreground"
										: "hover:bg-accent/50"
								)}
								onclick={() => selectSource(entry.id)}
							>
								<!-- svelte-ignore a11y_no_static_element_interactions -->
								<span
									class="text-muted-foreground shrink-0"
									onclick={(e) => { e.stopPropagation(); toggleSource(entry.id); }}
								>
									{#if entry.loading || visibleTables.length > 0}
										{#if isExpanded}
											<ChevronDownIcon class="size-3" />
										{:else}
											<ChevronRightIcon class="size-3" />
										{/if}
									{:else}
										<span class="inline-block size-3"></span>
									{/if}
								</span>

								<DatabaseIcon class="text-muted-foreground size-3.5 shrink-0" />

								<span class="min-w-0 flex-1 truncate font-mono text-xs font-medium">
									{entry.id}
								</span>

								{#if entry.loading}
									<span class="bg-muted h-3 w-4 animate-pulse rounded"></span>
								{:else if entry.view}
									<span class="text-muted-foreground/60 shrink-0 text-[10px] tabular-nums">
										{entry.view.source.tables.length}
									</span>
								{/if}
							</button>

							<!-- Tables under source -->
							{#if isExpanded}
								<div class="border-border/40 ml-5 border-l pl-2">
									{#if entry.loading}
										{#each [1, 2, 3] as _ (_)}
											<Skeleton class="my-1 h-5 w-full rounded" />
										{/each}
									{:else}
										{#each visibleTables as table (table.id)}
											{@const isTableSelected =
												selectedTableId === table.id && selectedSourceId === entry.id}
											{@const role = roleMeta[table.semantic_role]}

											<button
												type="button"
												class={cn(
													"flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-left text-xs transition-colors",
													isTableSelected
														? "bg-accent text-accent-foreground"
														: "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
												)}
												onclick={() => selectTable(entry.id, table.id)}
											>
												<span
													class={cn(
														"inline-flex shrink-0 items-center rounded px-1 py-0 text-[9px] font-semibold uppercase tracking-wide",
														role.class
													)}
												>
													{role.label}
												</span>
												<span class="min-w-0 flex-1 truncate font-mono">{table.name}</span>
											</button>
										{/each}

										{#if visibleTables.length === 0}
											<p class="text-muted-foreground/50 px-2 py-1 text-[10px]">
												No matching tables
											</p>
										{/if}
									{/if}
								</div>
							{/if}
						</div>
					{/each}
				{/if}
			</nav>

			<!-- Sidebar footer -->
			{#if !initialLoading && sources.length > 0}
				<div class="border-border border-t px-3 py-2">
					<p class="text-muted-foreground/60 text-[10px]">
						{sources.length} sources · {totalTables} tables · {totalColumns} columns
					</p>
				</div>
			{/if}
		</aside>

		<!-- ── Main panel ─────────────────────────────────────────────────────── -->
		<main class="flex-1 overflow-y-auto">

			<!-- Nothing selected -->
			{#if !selectedSourceId}
				<div class="flex h-full flex-col items-center justify-center gap-3 text-center">
					<div class="bg-muted flex size-12 items-center justify-center rounded-xl">
						<DatabaseIcon class="text-muted-foreground size-6" />
					</div>
					<p class="text-sm font-medium">Select a source to explore</p>
					<p class="text-muted-foreground text-xs">{sources.length} sources available</p>
				</div>

			<!-- Table detail -->
			{:else if selectedTable}
				{@const role = roleMeta[selectedTable.semantic_role]}
				{@const typeLabel = tableTypeMeta[selectedTable.table_type]}

				<div class="mx-auto max-w-section px-8 py-8">

					<!-- Breadcrumb -->
					<nav class="text-muted-foreground mb-5 flex items-center gap-1.5 text-xs">
						<button
							type="button"
							class="text-muted-foreground/50 hover:text-foreground mr-1 transition-colors"
							title={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
							onclick={() => (sidebarOpen = !sidebarOpen)}
						>
							<PanelLeftIcon class="size-3.5" />
						</button>
						<button
							type="button"
							class="hover:text-foreground transition-colors"
							onclick={() => selectSource(selectedSourceId!)}
						>
							{selectedSourceId}
						</button>
						<ArrowRightIcon class="size-3 shrink-0" />
						<span class="text-foreground font-medium">{selectedTable.name}</span>
					</nav>

					<!-- Table header -->
					<div class="mb-6">
						<div class="flex items-start gap-3">
							<div class="bg-muted flex size-9 shrink-0 items-center justify-center rounded-lg">
								<Table2Icon class="text-muted-foreground size-4" />
							</div>
							<div>
								<div class="flex flex-wrap items-center gap-2">
									<h2 class="font-mono text-lg font-semibold">{selectedTable.name}</h2>
									<span class={cn("inline-flex items-center rounded px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide", role.class)}>
										{role.label}
									</span>
									<span class="text-muted-foreground text-xs">{typeLabel}</span>
								</div>
								<p class="text-muted-foreground font-mono text-xs">{selectedTable.fully_qualified_name}</p>
							</div>
						</div>

						<!-- Profiling stats row -->
						{#if selectedTable.profiling}
							{@const p = selectedTable.profiling}
							<div class="border-border mt-4 flex flex-wrap gap-6 border-t pt-4">
								{#if p.row_count != null}
									<div>
										<p class="text-muted-foreground text-[10px] uppercase tracking-wide">Rows</p>
										<p class="text-sm font-semibold">{formatNumber(p.row_count)}</p>
									</div>
								{/if}
								{#if p.size_bytes != null}
									<div>
										<p class="text-muted-foreground text-[10px] uppercase tracking-wide">Size</p>
										<p class="text-sm font-semibold">
											{#if p.size_bytes >= 1_073_741_824}{(p.size_bytes / 1_073_741_824).toFixed(1)} GB
											{:else if p.size_bytes >= 1_048_576}{(p.size_bytes / 1_048_576).toFixed(1)} MB
											{:else}{(p.size_bytes / 1_024).toFixed(1)} KB{/if}
										</p>
									</div>
								{/if}
								{#if p.partition_count != null}
									<div>
										<p class="text-muted-foreground text-[10px] uppercase tracking-wide">Partitions</p>
										<p class="text-sm font-semibold">{p.partition_count}</p>
									</div>
								{/if}
								<div>
									<p class="text-muted-foreground text-[10px] uppercase tracking-wide">Columns</p>
									<p class="text-sm font-semibold">{selectedTable.columns.length}</p>
								</div>
							</div>
						{/if}

						<!-- Business purpose -->
						{#if selectedTable.business_purpose}
							<p class="text-foreground/80 mt-4 text-sm leading-relaxed">{selectedTable.business_purpose}</p>
						{/if}

						<!-- Usage notes -->
						{#if selectedTable.usage_notes}
							<div class="mt-3 flex gap-2 rounded-lg bg-blue-50 p-3 dark:bg-blue-950/20">
								<InfoIcon class="mt-0.5 size-3.5 shrink-0 text-blue-500" />
								<p class="text-xs leading-relaxed text-blue-700 dark:text-blue-400">{selectedTable.usage_notes}</p>
							</div>
						{/if}

						<!-- Caveats -->
						{#if selectedTable.caveats.length > 0}
							<div class="mt-2 flex gap-2 rounded-lg bg-amber-50 p-3 dark:bg-amber-950/20">
								<AlertCircleIcon class="mt-0.5 size-3.5 shrink-0 text-amber-500" />
								<ul class="space-y-1">
									{#each selectedTable.caveats as caveat}
										<li class="text-xs leading-relaxed text-amber-700 dark:text-amber-400">{caveat}</li>
									{/each}
								</ul>
							</div>
						{/if}
					</div>

					<!-- ── Column list ─────────────────────────────────────────────────── -->
					<div class="mb-8">
						<h3 class="text-muted-foreground mb-2 text-[10px] font-semibold uppercase tracking-wider">
							Columns ({selectedTable.columns.length})
						</h3>

						<div class="border-border divide-border divide-y rounded-lg border">
							{#each selectedTable.columns as col (col.id)}
								{@const cat = categoryMeta[col.semantic_type.category]}
								{@const CatIcon = categoryIcons[col.semantic_type.category]}
								{@const isExpanded = expandedColumns.has(col.id)}

								<div>
									<!-- Column summary row -->
									<button
										type="button"
										class="hover:bg-accent/30 flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors"
										onclick={() => toggleColumn(col.id)}
									>
										<span class="text-muted-foreground/40 shrink-0">
											{#if isExpanded}
												<ChevronDownIcon class="size-3" />
											{:else}
												<ChevronRightIcon class="size-3" />
											{/if}
										</span>

										<!-- Position -->
										<span class="text-muted-foreground/40 w-5 shrink-0 text-right text-[10px] tabular-nums">
											{col.ordinal_position}
										</span>

										<!-- Name -->
										<span class="w-40 shrink-0 truncate font-mono text-sm font-medium">
											{col.name}
										</span>

										<!-- Data type -->
										<span class="text-muted-foreground w-28 shrink-0 truncate font-mono text-xs">
											{isRowType(col.data_type) ? "row(…)" : col.data_type}
										</span>

										<!-- Semantic category badge -->
										<span class={cn("inline-flex shrink-0 items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium", cat.class)}>
											<CatIcon class="size-3" />
											{cat.label}
										</span>

										<!-- Business meaning -->
										<span class="text-muted-foreground min-w-0 flex-1 truncate text-xs">
											{col.business_meaning || "—"}
										</span>

										<!-- Flags -->
										<span class="ml-auto flex shrink-0 items-center gap-1.5">
											{#if col.is_primary_key}
												<KeyRoundIcon class="text-amber-500 size-3.5" title="Primary key" />
											{/if}
											{#if col.is_foreign_key}
												<LinkIcon class="text-blue-500 size-3.5" title="Foreign key" />
											{/if}
											{#if col.is_sensitive}
												<LockIcon class="text-red-500 size-3.5" title="Sensitive" />
											{/if}
											{#if !col.is_nullable}
												<span class="text-muted-foreground/60 text-[10px] font-medium">NN</span>
											{/if}
											{#if col.semantic_type.confidence < 0.75}
												<span
													class={cn("size-1.5 rounded-full", confidenceDot(col.semantic_type.confidence))}
													title="AI confidence: {Math.round(col.semantic_type.confidence * 100)}%"
												></span>
											{/if}
										</span>
									</button>

									<!-- Expanded detail -->
									{#if isExpanded}
										<div class="bg-muted/30 border-border/40 grid grid-cols-2 gap-6 border-t px-10 py-4 text-sm">

											<!-- Left: descriptions & relationships -->
											<div class="space-y-4">
												{#if col.business_meaning}
													<div>
														<p class="text-muted-foreground mb-1 text-[10px] font-semibold uppercase tracking-wide">Business meaning</p>
														<p class="leading-relaxed">{col.business_meaning}</p>
													</div>
												{/if}

												{#if isRowType(col.data_type)}
												{@const fields = flattenRowFields(col.data_type)}
												<div>
													<p class="text-muted-foreground mb-1.5 text-[10px] font-semibold uppercase tracking-wide">Document structure</p>
													<div class="border-border divide-border divide-y rounded-md border font-mono text-[10px]">
														{#each fields as field}
															<div
																class="flex items-baseline gap-2 py-1 pr-3"
																style="padding-left: {8 + field.depth * 14}px"
															>
																{#if field.depth > 0}
																	<span class="text-muted-foreground/30 shrink-0">└</span>
																{/if}
																<span class="text-foreground shrink-0">{field.name || "—"}</span>
																<span class="text-muted-foreground ml-auto shrink-0">{field.type}</span>
															</div>
														{/each}
													</div>
												</div>
											{/if}

											{#if col.unit}
													<div>
														<p class="text-muted-foreground mb-1 text-[10px] font-semibold uppercase tracking-wide">Unit</p>
														<p>{col.unit}</p>
													</div>
												{/if}

												{#if col.precision_notes}
													<div>
														<p class="text-muted-foreground mb-1 text-[10px] font-semibold uppercase tracking-wide">Precision notes</p>
														<p>{col.precision_notes}</p>
													</div>
												{/if}

												{#if col.is_foreign_key && col.references}
													<div>
														<p class="text-muted-foreground mb-1 text-[10px] font-semibold uppercase tracking-wide">References</p>
														<p class="font-mono text-xs">
															{col.references.target_table_id}
															<span class="text-muted-foreground mx-1">→</span>
															{col.references.target_column_id}
														</p>
														<p class="text-muted-foreground/60 mt-0.5 text-[10px]">
															{col.references.relationship_type} · {Math.round(col.references.confidence * 100)}% confidence
														</p>
													</div>
												{/if}

												{#if col.is_derived && col.derivation_logic}
													<div>
														<p class="text-muted-foreground mb-1 text-[10px] font-semibold uppercase tracking-wide">Derivation</p>
														<code class="bg-muted block rounded p-2 font-mono text-xs">{col.derivation_logic}</code>
													</div>
												{/if}

												{#if col.common_filters.length > 0}
													<div>
														<p class="text-muted-foreground mb-1.5 text-[10px] font-semibold uppercase tracking-wide">Common filters</p>
														<div class="flex flex-wrap gap-1">
															{#each col.common_filters as f}
																<code class="bg-muted rounded px-1.5 py-0.5 font-mono text-[10px]">{f}</code>
															{/each}
														</div>
													</div>
												{/if}

												<!-- Inferred from -->
												<p class="text-muted-foreground/50 text-[10px]">
													Inferred from {col.semantic_type.inferred_from.toLowerCase().replace(/_/g, " ")}
													· {Math.round(col.semantic_type.confidence * 100)}% confidence
												</p>
											</div>

											<!-- Right: profiling & samples -->
											<div class="space-y-4">
												{#if col.profiling}
													{@const p = col.profiling}
													<div>
														<p class="text-muted-foreground mb-2 text-[10px] font-semibold uppercase tracking-wide">Profiling</p>
														<div class="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
															{#if p.distinct_count != null}
																<span class="text-muted-foreground">Distinct</span>
																<span class="font-mono">{formatNumber(p.distinct_count)}</span>
															{/if}
															{#if p.null_percentage != null}
																<span class="text-muted-foreground">Null %</span>
																<span class="font-mono">{formatPct(p.null_percentage)}</span>
															{/if}
															{#if p.min_value}
																<span class="text-muted-foreground">Min</span>
																<span class="max-w-24 truncate font-mono">{p.min_value}</span>
															{/if}
															{#if p.max_value}
																<span class="text-muted-foreground">Max</span>
																<span class="max-w-24 truncate font-mono">{p.max_value}</span>
															{/if}
														</div>

														{#if p.most_common_values.length > 0}
															<div class="mt-2 space-y-1">
																{#each p.most_common_values.slice(0, 5) as mv}
																	<div class="flex items-center gap-2">
																		<span class="text-muted-foreground w-24 truncate font-mono text-[10px]">{mv.value}</span>
																		<div class="bg-muted h-1.5 flex-1 rounded-full overflow-hidden">
																			<div class="bg-primary/40 h-1.5" style="width:{Math.min(mv.percentage,100)}%"></div>
																		</div>
																		<span class="text-muted-foreground/60 w-8 text-right font-mono text-[10px] tabular-nums">
																			{mv.percentage.toFixed(0)}%
																		</span>
																	</div>
																{/each}
															</div>
														{/if}
													</div>
												{/if}

												{#if col.sample_values.length > 0}
													<div>
														<p class="text-muted-foreground mb-1.5 text-[10px] font-semibold uppercase tracking-wide">
															Samples
															{#if col.sample_values[0]?.is_shuffled}
																<span class="text-emerald-600 dark:text-emerald-400 ml-1 normal-case font-normal">(privacy-safe)</span>
															{/if}
														</p>
														<div class="flex flex-wrap gap-1">
															{#each col.sample_values.slice(0, 8) as sv}
																<code class="bg-muted text-muted-foreground rounded px-1.5 py-0.5 font-mono text-[10px]">{sv.value}</code>
															{/each}
														</div>
													</div>
												{/if}

												{#if col.is_categorical && col.allowed_values.length > 0}
													<div>
														<p class="text-muted-foreground mb-1.5 text-[10px] font-semibold uppercase tracking-wide">
															Allowed values ({col.allowed_values.filter(v => v.is_active).length} active)
														</p>
														<div class="space-y-2">
															{#each col.allowed_values.filter(v => v.is_active).slice(0, 8) as av}
																<div>
																	<div class="flex items-center justify-between">
																		<code class="font-mono text-[10px] font-medium">{av.value}</code>
																		<span class="text-muted-foreground/60 font-mono text-[10px] tabular-nums">
																			{(av.frequency * 100).toFixed(1)}%
																		</span>
																	</div>
																	{#if av.description}
																		<p class="text-muted-foreground text-[10px]">{av.description}</p>
																	{/if}
																	<div class="bg-muted mt-0.5 h-0.5 overflow-hidden rounded-full">
																		<div class="bg-primary/40 h-0.5" style="width:{Math.min(av.frequency*100,100)}%"></div>
																	</div>
																</div>
															{/each}
														</div>
													</div>
												{/if}
											</div>
										</div>
									{/if}
								</div>
							{/each}
						</div>
					</div>

					<!-- Common queries -->
					{#if selectedTable.common_queries.length > 0}
						<div>
							<h3 class="text-muted-foreground mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider">
								<Code2Icon class="size-3.5" />
								Common queries
							</h3>
							<div class="space-y-3">
								{#each selectedTable.common_queries as query}
									<pre class="bg-muted overflow-x-auto rounded-lg p-4 font-mono text-xs leading-relaxed">{query}</pre>
								{/each}
							</div>
						</div>
					{/if}
				</div>

			<!-- Source detail -->
			{:else if selectedEntry}
				{@const entry = selectedEntry}

				{#if entry.loading}
					<div class="mx-auto max-w-section px-8 py-8">
						<div class="mb-6 flex items-center gap-3">
							<Skeleton class="size-9 rounded-lg" />
							<div class="space-y-2">
								<Skeleton class="h-5 w-48 rounded" />
								<Skeleton class="h-3.5 w-32 rounded" />
							</div>
						</div>
						<Skeleton class="mb-2 h-4 w-full rounded" />
						<Skeleton class="mb-8 h-4 w-3/4 rounded" />
						<div class="grid gap-2">
							{#each [1, 2, 3, 4] as _ (_)}
								<Skeleton class="h-16 w-full rounded-lg" />
							{/each}
						</div>
					</div>

				{:else if entry.view}
					{@const src = entry.view.source}
					{@const sourceType = sourceTypeMeta[src.source_type]}

					<div class="mx-auto max-w-section px-8 py-8">
						<!-- Source header -->
						<div class="mb-8">
							<div class="flex items-start gap-3">
								<div class="bg-muted flex size-9 shrink-0 items-center justify-center rounded-lg">
									<DatabaseIcon class="text-muted-foreground size-4" />
								</div>
								<div class="min-w-0 flex-1">
									<div class="flex flex-wrap items-center gap-2">
										<h2 class="font-mono text-lg font-semibold">{src.name}</h2>
										<span class={cn("inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium", sourceType.class)}>
											{sourceType.label}
										</span>
									</div>
									<p class="text-muted-foreground font-mono text-xs">{src.fully_qualified_prefix}</p>
								</div>
							</div>

							<!-- Metadata row -->
							<div class="border-border mt-4 flex flex-wrap gap-6 border-t pt-4">
								{#if src.domain}
									<div>
										<p class="text-muted-foreground text-[10px] uppercase tracking-wide">Domain</p>
										<p class="text-sm font-medium">{src.domain}</p>
									</div>
								{/if}
								{#if src.owner_team}
									<div>
										<p class="text-muted-foreground text-[10px] uppercase tracking-wide">Team</p>
										<p class="text-sm font-medium">{src.owner_team}</p>
									</div>
								{/if}
								{#if src.owner_contact}
									<div>
										<p class="text-muted-foreground text-[10px] uppercase tracking-wide">Contact</p>
										<a
											href={src.owner_contact.includes("@")
												? `mailto:${src.owner_contact}`
												: src.owner_contact}
											class="text-primary text-sm hover:underline"
										>
											{src.owner_contact}
										</a>
									</div>
								{/if}
								{#if src.connection_info}
									<div>
										<p class="text-muted-foreground text-[10px] uppercase tracking-wide">Update freq.</p>
										<p class="text-sm">{src.connection_info.update_frequency}</p>
									</div>
								{/if}
								<div>
									<p class="text-muted-foreground text-[10px] uppercase tracking-wide">Tables</p>
									<p class="text-sm font-semibold">{src.tables.length}</p>
								</div>
							</div>

							<!-- Business context -->
							{#if src.business_context}
								<p class="text-foreground/80 mt-4 text-sm leading-relaxed">{src.business_context}</p>
							{/if}

							<!-- Low confidence notice -->
							{#if src.confidence && src.confidence.low_confidence_items.length > 0}
								<div class="mt-3 flex gap-2 rounded-lg bg-amber-50 p-3 dark:bg-amber-950/20">
									<AlertCircleIcon class="mt-0.5 size-3.5 shrink-0 text-amber-500" />
									<p class="text-xs text-amber-700 dark:text-amber-400">
										{src.confidence.low_confidence_items.length} item{src.confidence.low_confidence_items.length === 1 ? "" : "s"} flagged for expert review
										· overall confidence {Math.round(src.confidence.overall * 100)}%
									</p>
								</div>
							{/if}
						</div>

						<!-- Tables grid -->
						<h3 class="text-muted-foreground mb-3 text-[10px] font-semibold uppercase tracking-wider">
							Tables ({src.tables.length})
						</h3>

						<div class="grid gap-2">
							{#each src.tables as table (table.id)}
								{@const role = roleMeta[table.semantic_role]}

								<button
									type="button"
									class="border-border hover:border-primary/20 group flex items-start gap-3 rounded-lg border p-3.5 text-left transition-colors hover:bg-accent/30"
									onclick={() => selectTable(entry.id, table.id)}
								>
									<span class={cn("mt-0.5 inline-flex shrink-0 items-center rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide", role.class)}>
										{role.label}
									</span>

									<div class="min-w-0 flex-1">
										<div class="flex flex-wrap items-center gap-2">
											<span class="font-mono text-sm font-medium">{table.name}</span>
											<span class="text-muted-foreground text-xs">{tableTypeMeta[table.table_type]}</span>
											{#if table.profiling?.row_count != null}
												<span class="text-muted-foreground text-xs">{formatNumber(table.profiling.row_count)} rows</span>
											{/if}
										</div>
										{#if table.business_purpose}
											<p class="text-muted-foreground mt-0.5 line-clamp-2 text-xs">{table.business_purpose}</p>
										{/if}
									</div>

									<div class="flex shrink-0 items-center gap-3 text-right">
										<div>
											<p class="text-muted-foreground text-[10px]">cols</p>
											<p class="text-sm font-semibold">{table.columns.length}</p>
										</div>
										<ChevronRightIcon class="text-muted-foreground/40 size-4 transition-transform group-hover:translate-x-0.5" />
									</div>
								</button>
							{/each}
						</div>

						<!-- Linked entities -->
						{#if entry.view.entities.length > 0}
							<div class="mt-8">
								<h3 class="text-muted-foreground mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider">
									<LayersIcon class="size-3.5" />
									Semantic entities ({entry.view.entities.length})
								</h3>
								<div class="flex flex-wrap gap-2">
									{#each entry.view.entities as entity}
										<span class="border-border bg-background inline-flex items-center rounded-full border px-3 py-1 text-xs">
											{entity.name}
											{#if entity.domain}
												<span class="text-muted-foreground ml-1">· {entity.domain}</span>
											{/if}
										</span>
									{/each}
								</div>
							</div>
						{/if}
					</div>

				{:else}
					<!-- Source exists but not yet indexed -->
					<div class="flex h-full flex-col items-center justify-center gap-3 text-center">
						<div class="bg-muted flex size-12 items-center justify-center rounded-xl">
							<DatabaseIcon class="text-muted-foreground size-6" />
						</div>
						<p class="text-sm font-medium">{entry.id}</p>
						<p class="text-muted-foreground text-xs">This source hasn't been indexed yet.</p>
					</div>
				{/if}
			{/if}
		</main>
	</div>
</div>
