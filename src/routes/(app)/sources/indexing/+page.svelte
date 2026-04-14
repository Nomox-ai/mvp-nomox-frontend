<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { goto } from "$app/navigation";
	import { user } from "$lib/stores/user.svelte.js";
	import { listConnectorIds } from "$lib/api/connectors.js";
	import { listJobs, enqueueLevel1Job, enqueueLevel2Job, deleteJob } from "$lib/api/indexer.js";
	import type { Job } from "$lib/api/indexer.js";
	import { cn } from "$lib/utils.js";
	import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
	import RefreshCwIcon from "@lucide/svelte/icons/refresh-cw";
	import PlayIcon from "@lucide/svelte/icons/play";
	import Trash2Icon from "@lucide/svelte/icons/trash-2";
	import LayersIcon from "@lucide/svelte/icons/layers";

	// ─── Guard ────────────────────────────────────────────────────────────────

	$effect(() => {
		if (!user.loading && !user.isAdmin) goto("/sources/configs");
	});

	// ─── State ────────────────────────────────────────────────────────────────

	let connectors = $state<string[]>([]);
	let jobs = $state<Job[]>([]);
	let loadingConnectors = $state(true);
	let loadingJobs = $state(true);

	let enqueuingL1 = $state<Record<string, boolean>>({});
	let enqueuingL2 = $state(false);
	let deletingJob = $state<Record<string, boolean>>({});

	let pollInterval: ReturnType<typeof setInterval> | null = null;

	// ─── Data loading ─────────────────────────────────────────────────────────

	async function loadConnectors() {
		try {
			connectors = await listConnectorIds();
		} catch {
			connectors = [];
		} finally {
			loadingConnectors = false;
		}
	}

	async function loadJobs() {
		try {
			jobs = await listJobs();
		} catch {
			// silently keep previous jobs
		} finally {
			loadingJobs = false;
		}
	}

	onMount(async () => {
		await Promise.all([loadConnectors(), loadJobs()]);
		pollInterval = setInterval(loadJobs, 4000);
	});

	onDestroy(() => {
		if (pollInterval) clearInterval(pollInterval);
	});

	// ─── Actions ──────────────────────────────────────────────────────────────

	async function runLevel1(connectorId: string) {
		enqueuingL1 = { ...enqueuingL1, [connectorId]: true };
		try {
			await enqueueLevel1Job(connectorId);
			await loadJobs();
		} catch {}
		finally {
			enqueuingL1 = { ...enqueuingL1, [connectorId]: false };
		}
	}

	async function runLevel2() {
		enqueuingL2 = true;
		try {
			await enqueueLevel2Job(connectors);
			await loadJobs();
		} catch {}
		finally {
			enqueuingL2 = false;
		}
	}

	async function removeJob(jobId: string) {
		deletingJob = { ...deletingJob, [jobId]: true };
		try {
			await deleteJob(jobId);
			jobs = jobs.filter((j) => j.job_id !== jobId);
		} catch {}
		finally {
			deletingJob = { ...deletingJob, [jobId]: false };
		}
	}

	// ─── Helpers ──────────────────────────────────────────────────────────────

	const activeStatuses = new Set(["pending", "running", "claiming"]);

	type StatusFilter = "active" | "running" | "pending" | "completed" | "failed" | "all";
	let statusFilter = $state<StatusFilter>("active");

	const filterOptions: { value: StatusFilter; label: string }[] = [
		{ value: "active",    label: "Active" },
		{ value: "running",   label: "Running" },
		{ value: "pending",   label: "Pending" },
		{ value: "completed", label: "Completed" },
		{ value: "failed",    label: "Failed" },
		{ value: "all",       label: "All" },
	];

	function countForFilter(f: StatusFilter): number {
		if (f === "active") return jobs.filter((j) => activeStatuses.has(j.status)).length;
		if (f === "all") return jobs.length;
		if (f === "pending") return jobs.filter((j) => j.status === "pending" || j.status === "claiming").length;
		return jobs.filter((j) => j.status === f).length;
	}

	function hasActiveJob(connectorId: string): boolean {
		return jobs.some((j) => j.level === 1 && j.connector_id === connectorId && activeStatuses.has(j.status));
	}

	function hasActiveL2(): boolean {
		return jobs.some((j) => j.level === 2 && activeStatuses.has(j.status));
	}

	const statusConfig: Record<string, { label: string; class: string }> = {
		pending:          { label: "Pending",          class: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400" },
		claiming:         { label: "Claiming",         class: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400" },
		running:          { label: "Running",          class: "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400" },
		completed:        { label: "Completed",        class: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400" },
		failed:           { label: "Failed",           class: "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400" },
		waiting_for_user: { label: "Waiting for user", class: "bg-muted text-muted-foreground" },
	};

	function fmt(iso: string | null): string {
		if (!iso) return "—";
		const d = new Date(iso);
		const diff = Date.now() - d.getTime();
		const mins = Math.floor(diff / 60_000);
		if (mins < 1) return "just now";
		if (mins < 60) return `${mins}m ago`;
		const hrs = Math.floor(mins / 60);
		if (hrs < 24) return `${hrs}h ago`;
		return d.toLocaleDateString();
	}

	const sortedJobs = $derived.by(() => {
		const filtered = jobs.filter((j) => {
			if (statusFilter === "active")    return activeStatuses.has(j.status);
			if (statusFilter === "all")       return true;
			if (statusFilter === "pending")   return j.status === "pending" || j.status === "claiming";
			return j.status === statusFilter;
		});
		return filtered.sort((a, b) => {
			const aA = activeStatuses.has(a.status) ? 0 : 1;
			const bA = activeStatuses.has(b.status) ? 0 : 1;
			if (aA !== bA) return aA - bA;
			return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
		});
	});
</script>

<div class="flex h-full min-w-0 flex-col">
	<!-- Header -->
	<header class="border-border flex h-14 shrink-0 items-center justify-between border-b px-6">
		<div class="flex items-center gap-3">
			<h1 class="text-base font-semibold">Indexing</h1>
			<p class="text-muted-foreground text-sm">Trigger and monitor reindexing jobs</p>
		</div>
		<button
			type="button"
			class="text-muted-foreground hover:text-foreground transition-colors"
			title="Refresh jobs"
			onclick={loadJobs}
		>
			<RefreshCwIcon class="size-4" />
		</button>
	</header>

	<div class="flex-1 overflow-y-auto">
		<div class="mx-auto max-w-section space-y-4 p-6">

			<!-- ── Warning banner ───────────────────────────────────────── -->
			<div class="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-800/50 dark:bg-red-950/30">
				<span class="text-red-600 dark:text-red-400 shrink-0 text-sm">⚠</span>
				<p class="text-red-800 dark:text-red-300 text-sm">
					<span class="font-semibold">Notice:</span> The indexing pipeline has known stability issues. In most cases, all sources will need to be reindexed manually. Please ensure you have at least one hour available to monitor and resolve any issues before initiating an indexing run.
				</p>
			</div>

			<!-- ── Level 2 global action ──────────────────────────────────── -->
			<section class="border-border rounded-xl border">
				<div class="border-border flex items-center gap-3 border-b px-4 py-3">
					<LayersIcon class="text-muted-foreground size-4" />
					<h2 class="text-sm font-semibold">Level 2 — Global reindex</h2>
					<p class="text-muted-foreground ml-1 text-xs">Runs entity aggregation across all sources</p>
					<button
						type="button"
						onclick={runLevel2}
						disabled={enqueuingL2 || hasActiveL2() || loadingConnectors || connectors.length === 0}
						class={cn(
							"ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
							"bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
						)}
					>
						{#if enqueuingL2}
							<RefreshCwIcon class="size-3 animate-spin" />
							Enqueueing…
						{:else if hasActiveL2()}
							<RefreshCwIcon class="size-3 animate-spin" />
							Running…
						{:else}
							<PlayIcon class="size-3" />
							Run level 2
						{/if}
					</button>
				</div>
				<p class="text-muted-foreground px-4 py-3 text-xs">
					Level 2 aggregates semantic entities across all indexed sources. Run this after all level 1 jobs have completed, or let the system trigger it automatically.
				</p>
			</section>

			<!-- ── Level 1 — per source ───────────────────────────────────── -->
			<section class="border-border rounded-xl border">
				<div class="border-border flex items-center gap-2 border-b px-4 py-3">
					<h2 class="text-sm font-semibold">Level 1 — Per-source reindex</h2>
					<span class="text-muted-foreground ml-auto text-xs">{connectors.length} sources</span>
				</div>

				{#if loadingConnectors}
					<div class="space-y-2 p-4">
						{#each [1, 2, 3] as _ (_)}<Skeleton class="h-10 w-full rounded-lg" />{/each}
					</div>
				{:else if connectors.length === 0}
					<p class="text-muted-foreground px-4 py-6 text-center text-sm">No data sources configured.</p>
				{:else}
					<div class="divide-border divide-y">
						{#each connectors as id (id)}
							{@const active = hasActiveJob(id)}
							{@const busy = enqueuingL1[id] ?? false}
							{@const l1job = jobs.find((j) => j.level === 1 && j.connector_id === id && activeStatuses.has(j.status))}
							<div class="flex items-center gap-4 px-4 py-3">
								<code class="font-mono text-sm font-medium">{id}</code>
								{#if l1job}
									<div class="flex min-w-0 flex-1 items-center gap-2">
										<div class="bg-muted h-1.5 flex-1 overflow-hidden rounded-full">
											<div class="bg-primary h-full rounded-full transition-all duration-500" style="width: {l1job.progress}%"></div>
										</div>
										<span class="text-muted-foreground w-8 shrink-0 text-right font-mono text-xs">{Math.round(l1job.progress)}%</span>
									</div>
								{:else}
									<div class="flex-1"></div>
								{/if}
								<button
									type="button"
									onclick={() => runLevel1(id)}
									disabled={busy || active}
									class={cn(
										"inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
										"border-border hover:bg-accent disabled:opacity-50"
									)}
								>
									{#if busy || active}
										<RefreshCwIcon class="size-3 animate-spin" />
										{busy ? "Enqueueing…" : "Running…"}
									{:else}
										<PlayIcon class="size-3" />
										Run
									{/if}
								</button>
							</div>
						{/each}
					</div>
				{/if}
			</section>

			<!-- ── Job queue ──────────────────────────────────────────────── -->
			<section class="border-border rounded-xl border">
				<!-- Header with filter pills -->
				<div class="border-border flex flex-wrap items-center gap-x-3 gap-y-2 border-b px-4 py-3">
					<h2 class="text-sm font-semibold">Job queue</h2>
					<div class="ml-auto flex flex-wrap items-center gap-1">
						{#each filterOptions as opt (opt.value)}
							{@const count = countForFilter(opt.value)}
							<button
								type="button"
								onclick={() => (statusFilter = opt.value)}
								class={cn(
									"rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors",
									statusFilter === opt.value
										? "bg-primary text-primary-foreground"
										: "text-muted-foreground hover:text-foreground hover:bg-accent"
								)}
							>
								{opt.label} <span class="opacity-60">{count}</span>
							</button>
						{/each}
					</div>
				</div>

				{#if loadingJobs && jobs.length === 0}
					<div class="space-y-2 p-4">
						{#each [1, 2, 3] as _ (_)}<Skeleton class="h-10 w-full rounded-lg" />{/each}
					</div>
				{:else if sortedJobs.length === 0}
					<p class="text-muted-foreground px-4 py-6 text-center text-sm">
						{statusFilter === "active" ? "No active jobs." : "No jobs match this filter."}
					</p>
				{:else}
					<div class="divide-border divide-y">
						{#each sortedJobs as job (job.job_id)}
							{@const sc = statusConfig[job.status] ?? { label: job.status, class: "bg-muted text-muted-foreground" }}
							{@const isActive = activeStatuses.has(job.status)}
							<div class="flex items-center gap-3 px-4 py-3">

								<!-- Level badge -->
								<span class="bg-muted text-muted-foreground inline-flex size-5 shrink-0 items-center justify-center rounded font-mono text-[10px] font-semibold">
									L{job.level}
								</span>

								<!-- Target -->
								<div class="min-w-0 flex-1">
									<p class="truncate font-mono text-xs font-medium">
										{job.connector_id ?? job.target_source_ids.join(", ") ?? "—"}
									</p>
									<p class="text-muted-foreground text-[10px]">
										{job.job_type} · {job.trigger_type} · {fmt(job.created_at)}
									</p>
								</div>

								<!-- Progress bar (active jobs) -->
								{#if isActive && job.progress > 0}
									<div class="hidden w-24 sm:block">
										<div class="bg-muted h-1 overflow-hidden rounded-full">
											<div class="bg-primary h-full rounded-full transition-all duration-500" style="width: {job.progress}%"></div>
										</div>
									</div>
								{/if}

								<!-- Status badge -->
								<span class={cn("inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-medium", sc.class)}>
									{sc.label}
								</span>

								<!-- Error -->
								{#if job.error}
									<span class="text-destructive max-w-32 truncate text-[10px]" title={job.error}>
										{job.error}
									</span>
								{/if}

								<!-- Delete -->
								<button
									type="button"
									onclick={() => removeJob(job.job_id)}
									disabled={deletingJob[job.job_id] ?? false}
									class="text-muted-foreground/50 hover:text-destructive shrink-0 transition-colors disabled:opacity-30"
									title="Remove job"
								>
									<Trash2Icon class="size-3.5" />
								</button>
							</div>
						{/each}
					</div>
				{/if}
			</section>

		</div>
	</div>
</div>
