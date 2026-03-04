<script lang="ts">
	import { onMount } from "svelte";
	import { getSemanticModel } from "$lib/api/semantic.js";
	import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
	import { cn } from "$lib/utils.js";
	import type { SemanticEntity, GlossaryTerm } from "$lib/types/semantic.js";
	import { EntityStatus, GlossaryScope, GlossaryCreator } from "$lib/types/semantic.js";

	import SearchIcon from "@lucide/svelte/icons/search";
	import LayersIcon from "@lucide/svelte/icons/layers";
	import BookOpenIcon from "@lucide/svelte/icons/book-open";
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import SparklesIcon from "@lucide/svelte/icons/sparkles";

	// ─── State ────────────────────────────────────────────────────────────────

	type Tab = "entities" | "glossary";

	let activeTab = $state<Tab>("entities");
	let searchQuery = $state("");
	let loading = $state(true);
	let entities = $state<SemanticEntity[]>([]);
	let glossary = $state<GlossaryTerm[]>([]);
	let expandedEntities = $state(new Set<string>());

	// ─── Derived ──────────────────────────────────────────────────────────────

	let filteredEntities = $derived(
		searchQuery.trim() === ""
			? entities
			: entities.filter((e) => entityMatchesSearch(e, searchQuery.toLowerCase()))
	);

	let filteredGlossary = $derived(
		searchQuery.trim() === ""
			? glossary
			: glossary.filter((t) => termMatchesSearch(t, searchQuery.toLowerCase()))
	);

	let glossaryByScope = $derived({
		[GlossaryScope.GLOBAL]: filteredGlossary.filter((t) => t.scope === GlossaryScope.GLOBAL),
		[GlossaryScope.DOMAIN]: filteredGlossary.filter((t) => t.scope === GlossaryScope.DOMAIN),
		[GlossaryScope.SOURCE]: filteredGlossary.filter((t) => t.scope === GlossaryScope.SOURCE),
	});

	// ─── Search helpers ───────────────────────────────────────────────────────

	function entityMatchesSearch(e: SemanticEntity, q: string): boolean {
		return (
			e.name.toLowerCase().includes(q) ||
			e.business_context.toLowerCase().includes(q) ||
			e.domain.toLowerCase().includes(q) ||
			e.canonical_id_name.toLowerCase().includes(q)
		);
	}

	function termMatchesSearch(t: GlossaryTerm, q: string): boolean {
		return (
			t.term.toLowerCase().includes(q) ||
			t.definition.toLowerCase().includes(q) ||
			(t.abbreviation?.toLowerCase().includes(q) ?? false) ||
			t.synonyms.some((s) => s.toLowerCase().includes(q)) ||
			(t.domain?.toLowerCase().includes(q) ?? false)
		);
	}

	// ─── Data loading ─────────────────────────────────────────────────────────

	async function load() {
		const model = await getSemanticModel();
		if (model) {
			entities = model.entities;
			glossary = model.glossary;
		}
		loading = false;
	}

	function toggleEntity(id: string) {
		const next = new Set(expandedEntities);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		expandedEntities = next;
	}

	onMount(load);

	// ─── Display helpers ──────────────────────────────────────────────────────

	const entityStatusMeta: Record<EntityStatus, { label: string; class: string }> = {
		[EntityStatus.DRAFT]:       { label: "Draft",       class: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
		[EntityStatus.STAGING]:     { label: "Staging",     class: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400" },
		[EntityStatus.CONFIRMED]:   { label: "Confirmed",   class: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400" },
		[EntityStatus.DEPRECATED]:  { label: "Deprecated",  class: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400" },
	};

	const creatorMeta: Record<GlossaryCreator, { label: string }> = {
		[GlossaryCreator.LEVEL_1_AGENT]: { label: "AI (L1)" },
		[GlossaryCreator.LEVEL_2_AGENT]: { label: "AI (L2)" },
		[GlossaryCreator.EXPERT]:        { label: "Expert" },
	};

	function confidenceClass(c: number): string {
		if (c >= 0.85) return "text-emerald-600 dark:text-emerald-400";
		if (c >= 0.6) return "text-amber-600 dark:text-amber-400";
		return "text-red-600 dark:text-red-400";
	}
</script>

<div class="flex h-full flex-col">
	<!-- Header -->
	<header class="border-border flex h-14 shrink-0 items-center border-b px-6">
		<h1 class="text-base font-semibold">Semantics</h1>
		<p class="text-muted-foreground ml-3 text-sm">Inferred entities, glossary terms, and business context</p>
	</header>

	<!-- Toolbar: tabs + search -->
	<div class="border-border flex h-11 shrink-0 items-center gap-4 border-b px-6">
		<!-- Tabs -->
		<div class="flex items-center gap-1">
			<button
				type="button"
				class={cn(
					"flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
					activeTab === "entities"
						? "bg-accent text-accent-foreground"
						: "text-muted-foreground hover:text-foreground hover:bg-accent/50"
				)}
				onclick={() => (activeTab = "entities")}
			>
				<LayersIcon class="size-3.5" />
				Entities
				{#if !loading && entities.length > 0}
					<span class="text-muted-foreground/60 tabular-nums">{entities.length}</span>
				{/if}
			</button>

			<button
				type="button"
				class={cn(
					"flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
					activeTab === "glossary"
						? "bg-accent text-accent-foreground"
						: "text-muted-foreground hover:text-foreground hover:bg-accent/50"
				)}
				onclick={() => (activeTab = "glossary")}
			>
				<BookOpenIcon class="size-3.5" />
				Glossary
				{#if !loading && glossary.length > 0}
					<span class="text-muted-foreground/60 tabular-nums">{glossary.length}</span>
				{/if}
			</button>
		</div>

		<div class="ml-auto w-64">
			<div class="relative">
				<SearchIcon class="text-muted-foreground absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2" />
				<input
					type="search"
					placeholder={activeTab === "entities" ? "Search entities…" : "Search glossary…"}
					bind:value={searchQuery}
					class="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border py-1.5 pl-8 pr-3 text-xs focus-visible:outline-none focus-visible:ring-1"
				/>
			</div>
		</div>
	</div>

	<!-- Content -->
	<div class="flex-1 overflow-y-auto">
		{#if loading}
			<div class="grid grid-cols-1 gap-3 p-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each [1, 2, 3, 4, 5, 6] as _ (_)}
					<Skeleton class="h-32 w-full rounded-xl" />
				{/each}
			</div>

		<!-- ── Entities tab ────────────────────────────────────────────────────── -->
		{:else if activeTab === "entities"}
			{#if filteredEntities.length === 0}
				<div class="flex h-full flex-col items-center justify-center gap-3 py-20 text-center">
					<LayersIcon class="text-muted-foreground/40 size-10" />
					<p class="text-sm font-medium">
						{searchQuery ? "No entities match your search" : "No entities indexed yet"}
					</p>
				</div>
			{:else}
				<div class="space-y-2 p-6">
					{#each filteredEntities as entity (entity.id)}
						{@const status = entityStatusMeta[entity.status]}
						{@const isExpanded = expandedEntities.has(entity.id)}

						<div class="border-border rounded-xl border">
							<!-- Entity header -->
							<button
								type="button"
								class="hover:bg-accent/30 flex w-full items-start gap-4 rounded-xl p-4 text-left transition-colors"
								onclick={() => toggleEntity(entity.id)}
							>
								<!-- Icon -->
								<div class="bg-muted flex size-9 shrink-0 items-center justify-center rounded-lg">
									<LayersIcon class="text-muted-foreground size-4" />
								</div>

								<div class="min-w-0 flex-1">
									<div class="flex flex-wrap items-center gap-2">
										<span class="font-semibold">{entity.name}</span>
										<span class={cn("inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide", status.class)}>
											{status.label}
										</span>
										{#if entity.domain}
											<span class="text-muted-foreground text-xs">· {entity.domain}</span>
										{/if}
									</div>

									{#if entity.business_context}
										<p class="text-muted-foreground mt-1 line-clamp-2 text-sm">
											{entity.business_context}
										</p>
									{/if}

									<div class="mt-2 flex flex-wrap items-center gap-3 text-xs">
										<span class="text-muted-foreground">
											<span class="font-medium">Canonical ID:</span>
											<code class="ml-1 font-mono">{entity.canonical_id_name}</code>
											{#if entity.canonical_id_format}
												<span class="text-muted-foreground/60 ml-1">({entity.canonical_id_format})</span>
											{/if}
										</span>
										<span class="text-muted-foreground">
											{entity.manifestations.length} manifestation{entity.manifestations.length === 1 ? "" : "s"}
										</span>
										<span class="text-muted-foreground">
											{entity.unified_attributes.length} attribute{entity.unified_attributes.length === 1 ? "" : "s"}
										</span>
										<span class={cn("text-xs font-medium", confidenceClass(entity.cross_source_confidence))}>
											{Math.round(entity.cross_source_confidence * 100)}% cross-source confidence
										</span>
									</div>
								</div>

								<span class="text-muted-foreground/40 shrink-0 mt-1">
									{#if isExpanded}
										<ChevronDownIcon class="size-4" />
									{:else}
										<ChevronRightIcon class="size-4" />
									{/if}
								</span>
							</button>

							<!-- Expanded detail -->
							{#if isExpanded}
								<div class="border-border/40 border-t px-4 pb-4 pt-4">
									<div class="grid grid-cols-2 gap-6">

										<!-- Manifestations -->
										<div>
											<p class="text-muted-foreground mb-2 text-[10px] font-semibold uppercase tracking-wide">
												Manifestations ({entity.manifestations.length})
											</p>
											<div class="space-y-2">
												{#each entity.manifestations as m}
													<div class="rounded-lg bg-muted/50 px-3 py-2">
														<div class="flex items-center gap-2">
															<span class={cn(
																"inline-flex items-center rounded px-1 py-0 text-[9px] font-semibold uppercase",
																m.role === "PRIMARY"
																	? "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400"
																	: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
															)}>
																{m.role}
															</span>
															<code class="font-mono text-xs">{m.fully_qualified_name}</code>
														</div>
														{#if m.usage_guidance}
															<p class="text-muted-foreground mt-1 text-[10px]">{m.usage_guidance}</p>
														{/if}
													</div>
												{/each}
											</div>
										</div>

										<!-- Unified attributes -->
										<div>
											<p class="text-muted-foreground mb-2 text-[10px] font-semibold uppercase tracking-wide">
												Attributes ({entity.unified_attributes.length})
											</p>
											<div class="space-y-1">
												{#each entity.unified_attributes.slice(0, 10) as attr}
													<div class="flex items-center justify-between py-0.5">
														<span class="font-mono text-xs">{attr.name}</span>
														<span class="text-muted-foreground text-[10px]">
															{attr.sources.length} source{attr.sources.length === 1 ? "" : "s"}
														</span>
													</div>
												{/each}
												{#if entity.unified_attributes.length > 10}
													<p class="text-muted-foreground/60 text-[10px]">
														+{entity.unified_attributes.length - 10} more
													</p>
												{/if}
											</div>
										</div>
									</div>

									{#if entity.cross_source_join_hint}
										<div class="mt-3">
											<p class="text-muted-foreground mb-1 text-[10px] font-semibold uppercase tracking-wide">
												Cross-source join hint
											</p>
											<p class="text-sm leading-relaxed">{entity.cross_source_join_hint}</p>
										</div>
									{/if}

									{#if entity.active_filter}
										<div class="mt-3">
											<p class="text-muted-foreground mb-1 text-[10px] font-semibold uppercase tracking-wide">
												Active record filter
											</p>
											<code class="bg-muted block rounded p-2 font-mono text-xs">{entity.active_filter}</code>
										</div>
									{/if}

									{#if entity.common_queries.length > 0}
										<div class="mt-3">
											<p class="text-muted-foreground mb-2 text-[10px] font-semibold uppercase tracking-wide">
												Common queries
											</p>
											<div class="space-y-2">
												{#each entity.common_queries as q}
													<pre class="bg-muted overflow-x-auto rounded p-3 font-mono text-xs">{q}</pre>
												{/each}
											</div>
										</div>
									{/if}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{/if}

		<!-- ── Glossary tab ────────────────────────────────────────────────────── -->
		{:else}
			{#if filteredGlossary.length === 0}
				<div class="flex h-full flex-col items-center justify-center gap-3 py-20 text-center">
					<BookOpenIcon class="text-muted-foreground/40 size-10" />
					<p class="text-sm font-medium">
						{searchQuery ? "No terms match your search" : "No glossary terms yet"}
					</p>
				</div>
			{:else}
				<div class="divide-border divide-y px-6 py-4">
					{#each [GlossaryScope.GLOBAL, GlossaryScope.DOMAIN, GlossaryScope.SOURCE] as scope}
						{@const terms = glossaryByScope[scope]}
						{#if terms.length > 0}
							<!-- Scope group header -->
							<div class="pb-1 pt-5 first:pt-0">
								<h3 class="text-muted-foreground text-[10px] font-semibold uppercase tracking-wider">
									{scope === GlossaryScope.GLOBAL
										? "Global"
										: scope === GlossaryScope.DOMAIN
										? "Domain-specific"
										: "Source-specific"}
									<span class="ml-1 font-normal">({terms.length})</span>
								</h3>
							</div>

							<!-- Terms in this scope -->
							<div class="divide-border divide-y">
								{#each terms as term (term.id)}
									<div class="py-4">
										<div class="flex items-start gap-4">
											<div class="min-w-0 flex-1">
												<!-- Term + abbreviation -->
												<div class="flex flex-wrap items-baseline gap-2">
													<span class="font-semibold">{term.term}</span>
													{#if term.abbreviation}
														<code class="bg-muted text-muted-foreground rounded px-1.5 py-0.5 font-mono text-xs">
															{term.abbreviation}
														</code>
													{/if}
													{#if term.domain}
														<span class="text-muted-foreground text-xs">· {term.domain}</span>
													{/if}
													{#if term.source_id}
														<span class="text-muted-foreground font-mono text-xs">· {term.source_id}</span>
													{/if}
												</div>

												<!-- Definition -->
												<p class="mt-1 text-sm leading-relaxed">{term.definition}</p>

												<!-- Synonyms -->
												{#if term.synonyms.length > 0}
													<div class="mt-2 flex flex-wrap items-center gap-1.5">
														<span class="text-muted-foreground/60 text-[10px] uppercase tracking-wide">Also:</span>
														{#each term.synonyms as syn}
															<span class="text-muted-foreground text-xs">{syn}</span>
														{/each}
													</div>
												{/if}

												<!-- Related terms -->
												{#if term.related_terms.length > 0}
													<div class="mt-1 flex flex-wrap items-center gap-1.5">
														<span class="text-muted-foreground/60 text-[10px] uppercase tracking-wide">Related:</span>
														{#each term.related_terms as rt}
															<span class="border-border rounded-full border px-2 py-0.5 text-[10px]">{rt}</span>
														{/each}
													</div>
												{/if}
											</div>

											<!-- Meta: creator + confidence -->
											<div class="shrink-0 text-right text-[10px]">
												<div class="flex items-center justify-end gap-1">
													{#if term.created_by !== GlossaryCreator.EXPERT}
														<SparklesIcon class="text-muted-foreground/60 size-3" />
													{/if}
													<span class="text-muted-foreground">{creatorMeta[term.created_by].label}</span>
												</div>
												<span class={cn("font-medium", confidenceClass(term.confidence))}>
													{Math.round(term.confidence * 100)}%
												</span>
											</div>
										</div>
									</div>
								{/each}
							</div>
						{/if}
					{/each}
				</div>
			{/if}
		{/if}
	</div>
</div>
