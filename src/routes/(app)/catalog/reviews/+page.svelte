<script lang="ts">
	import { onMount } from "svelte";
	import { listConnectorIds } from "$lib/api/connectors.js";
	import { getSourceView } from "$lib/api/semantic.js";
	import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
	import { cn } from "$lib/utils.js";
	import type { SourceView, LowConfidenceItem } from "$lib/types/semantic.js";
	import { ConfidenceObjectType } from "$lib/types/semantic.js";

	import AlertCircleIcon from "@lucide/svelte/icons/alert-circle";
	import DatabaseIcon from "@lucide/svelte/icons/database";
	import Table2Icon from "@lucide/svelte/icons/table-2";
	import ColumnsIcon from "@lucide/svelte/icons/columns-3";
	import LayersIcon from "@lucide/svelte/icons/layers";
	import CheckCircle2Icon from "@lucide/svelte/icons/check-circle-2";

	// ─── Types ────────────────────────────────────────────────────────────────

	interface ReviewItem {
		sourceId: string;
		sourceName: string;
		pendingExpertReview: boolean;
		lowConfidenceItems: LowConfidenceItem[];
		overallConfidence: number | null;
	}

	// ─── State ────────────────────────────────────────────────────────────────

	let items = $state<ReviewItem[]>([]);
	let loading = $state(true);

	// ─── Derived ──────────────────────────────────────────────────────────────

	let pendingReview = $derived(items.filter((i) => i.pendingExpertReview));
	let lowConfidence = $derived(
		items.filter((i) => !i.pendingExpertReview && i.lowConfidenceItems.length > 0)
	);

	// ─── Data loading ─────────────────────────────────────────────────────────

	async function load() {
		let ids: string[];
		try {
			ids = await listConnectorIds();
		} catch {
			loading = false;
			return;
		}

		const views = await Promise.all(ids.map((id) => getSourceView(id)));

		items = ids
			.map((id, i) => {
				const view = views[i];
				if (!view) return null;
				const src = view.source;
				const hasLowConf =
					src.confidence != null && src.confidence.low_confidence_items.length > 0;
				if (!src.status.pending_expert_review && !hasLowConf) return null;
				return {
					sourceId: id,
					sourceName: src.name,
					pendingExpertReview: src.status.pending_expert_review,
					lowConfidenceItems: src.confidence?.low_confidence_items ?? [],
					overallConfidence: src.confidence?.overall ?? null,
				} satisfies ReviewItem;
			})
			.filter((x): x is ReviewItem => x !== null);

		loading = false;
	}

	onMount(load);

	// ─── Helpers ──────────────────────────────────────────────────────────────

	const objectTypeIcon: Record<ConfidenceObjectType, typeof AlertCircleIcon> = {
		[ConfidenceObjectType.SOURCE]:       DatabaseIcon,
		[ConfidenceObjectType.TABLE]:        Table2Icon,
		[ConfidenceObjectType.COLUMN]:       ColumnsIcon,
		[ConfidenceObjectType.ENTITY]:       LayersIcon,
		[ConfidenceObjectType.ATTRIBUTE]:    LayersIcon,
		[ConfidenceObjectType.RELATIONSHIP]: AlertCircleIcon,
	};

	function confidenceBar(score: number): string {
		if (score >= 0.85) return "bg-emerald-500";
		if (score >= 0.6) return "bg-amber-500";
		return "bg-red-500";
	}

	function confidenceText(score: number): string {
		if (score >= 0.85) return "text-emerald-600 dark:text-emerald-400";
		if (score >= 0.6) return "text-amber-600 dark:text-amber-400";
		return "text-red-600 dark:text-red-400";
	}
</script>

<div class="flex h-full flex-col">
	<!-- Header -->
	<header class="border-border flex h-14 shrink-0 items-center border-b px-6">
		<h1 class="text-base font-semibold">Reviews</h1>
		<p class="text-muted-foreground ml-3 text-sm">Pending inference tasks that need your input</p>
		{#if !loading && items.length > 0}
			<span class="ml-3 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
				{items.length} source{items.length === 1 ? "" : "s"} need attention
			</span>
		{/if}
	</header>

	<div class="flex-1 overflow-y-auto">
		{#if loading}
			<div class="space-y-3 p-6">
				{#each [1, 2, 3] as _ (_)}
					<Skeleton class="h-28 w-full rounded-xl" />
				{/each}
			</div>

		{:else if items.length === 0}
			<div class="flex h-full flex-col items-center justify-center gap-3 text-center">
				<div class="bg-emerald-50 dark:bg-emerald-950/20 flex size-12 items-center justify-center rounded-xl">
					<CheckCircle2Icon class="size-6 text-emerald-500" />
				</div>
				<p class="text-sm font-medium">All clear</p>
				<p class="text-muted-foreground text-xs max-w-xs">
					No sources are waiting for expert review and all confidence scores are above the threshold.
				</p>
			</div>

		{:else}
			<div class="space-y-6 p-6">

				<!-- Pending expert review -->
				{#if pendingReview.length > 0}
					<div>
						<h2 class="text-muted-foreground mb-3 text-[10px] font-semibold uppercase tracking-wider">
							Pending expert review ({pendingReview.length})
						</h2>

						<div class="space-y-2">
							{#each pendingReview as item (item.sourceId)}
								<div class="border-border rounded-xl border">
									<div class="flex items-start gap-3 p-4">
										<div class="bg-amber-100 dark:bg-amber-950/30 flex size-9 shrink-0 items-center justify-center rounded-lg">
											<DatabaseIcon class="size-4 text-amber-600 dark:text-amber-400" />
										</div>
										<div class="min-w-0 flex-1">
											<div class="flex flex-wrap items-center gap-2">
												<span class="font-mono text-sm font-semibold">{item.sourceName}</span>
												<span class="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
													<AlertCircleIcon class="size-3" />
													Awaiting review
												</span>
											</div>
											<p class="text-muted-foreground mt-1 text-xs">
												The indexer has finished processing this source and flagged it for expert verification.
											</p>
											{#if item.overallConfidence != null}
												<div class="mt-2 flex items-center gap-2">
													<div class="bg-muted h-1.5 w-32 overflow-hidden rounded-full">
														<div
															class={cn("h-1.5 rounded-full", confidenceBar(item.overallConfidence))}
															style="width:{item.overallConfidence * 100}%"
														></div>
													</div>
													<span class={cn("text-xs font-medium", confidenceText(item.overallConfidence))}>
														{Math.round(item.overallConfidence * 100)}% overall confidence
													</span>
												</div>
											{/if}
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Low confidence items -->
				{#if lowConfidence.length > 0}
					<div>
						<h2 class="text-muted-foreground mb-3 text-[10px] font-semibold uppercase tracking-wider">
							Low confidence ({lowConfidence.length} source{lowConfidence.length === 1 ? "" : "s"})
						</h2>

						<div class="space-y-3">
							{#each lowConfidence as item (item.sourceId)}
								<div class="border-border rounded-xl border">
									<!-- Source header -->
									<div class="border-border flex items-center gap-3 border-b px-4 py-3">
										<DatabaseIcon class="text-muted-foreground size-4 shrink-0" />
										<span class="font-mono text-sm font-medium">{item.sourceName}</span>
										{#if item.overallConfidence != null}
											<div class="ml-auto flex items-center gap-2">
												<div class="bg-muted h-1.5 w-20 overflow-hidden rounded-full">
													<div
														class={cn("h-1.5 rounded-full", confidenceBar(item.overallConfidence))}
														style="width:{item.overallConfidence * 100}%"
													></div>
												</div>
												<span class={cn("text-xs font-medium tabular-nums", confidenceText(item.overallConfidence))}>
													{Math.round(item.overallConfidence * 100)}%
												</span>
											</div>
										{/if}
									</div>

									<!-- Low confidence items list -->
									<div class="divide-border divide-y">
										{#each item.lowConfidenceItems as ci}
											{@const Icon = objectTypeIcon[ci.object_type]}
											<div class="flex items-start gap-3 px-4 py-3">
												<Icon class="text-muted-foreground mt-0.5 size-3.5 shrink-0" />
												<div class="min-w-0 flex-1">
													<div class="flex items-center gap-2">
														<span class="font-mono text-xs font-medium">{ci.object_name}</span>
														<span class="text-muted-foreground/60 text-[10px] uppercase">{ci.object_type}</span>
														<span class={cn("ml-auto text-xs font-semibold tabular-nums", confidenceText(ci.score))}>
															{Math.round(ci.score * 100)}%
														</span>
													</div>
													{#if ci.reason}
														<p class="text-muted-foreground mt-0.5 text-xs">{ci.reason}</p>
													{/if}
													{#if ci.suggested_clarification}
														<p class="text-muted-foreground/70 mt-0.5 text-[10px] italic">{ci.suggested_clarification}</p>
													{/if}
												</div>
											</div>
										{/each}
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
