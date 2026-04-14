<script lang="ts">
	import { onMount } from "svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
	import AddSourceDialog from "$lib/components/add-source-dialog.svelte";
	import * as Table from "$lib/components/ui/table/index.js";
	import MongodbIcon from "$lib/assets/icons/mongodb-icon.svelte";
	import PostgresqlIcon from "$lib/assets/icons/postgresql-icon.svelte";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import DatabaseIcon from "@lucide/svelte/icons/database";
	import RefreshCwIcon from "@lucide/svelte/icons/refresh-cw";
	import MoreHorizontalIcon from "@lucide/svelte/icons/more-horizontal";
	import SourceSettingsSheet from "$lib/components/source-settings-sheet.svelte";
	import { ConnectorType, IndexingState } from "$lib/types/connector.js";
	import type { AnyConnectorModel } from "$lib/types/connector.js";
	import { listConnectorIds, getConnector, createConnector } from "$lib/api/connectors.js";
	import { cn } from "$lib/utils.js";
	import { user } from "$lib/stores/user.svelte.js";

	// ─── Row type ─────────────────────────────────────────────────────────────

	interface SourceRow {
		connector_id: string;
		connector_type: ConnectorType;
		indexingState: IndexingState | null;
		lastIndexedAt: string | null;
		owner: string | null;
		availability: boolean | null;
		loading: boolean;
	}

	// ─── State ────────────────────────────────────────────────────────────────

	let dialogOpen = $state(false);
	let sheetOpen = $state(false);
	let selectedRow = $state<SourceRow | null>(null);
	let rows = $state<SourceRow[]>([]);
	let loading = $state(true);
	let loadError = $state<string | null>(null);
	let refreshing = $state(false);

	// ─── Data loading ─────────────────────────────────────────────────────────

	async function loadSources() {
		loadError = null;

		let ids: string[];
		try {
			ids = await listConnectorIds();
		} catch (e) {
			loadError = e instanceof Error ? e.message : "Failed to load sources";
			return;
		}

		// Show skeleton rows immediately while individual configs load
		rows = ids.map((id) => ({
			connector_id: id,
			connector_type: ConnectorType.MONGODB,
			indexingState: null,
			lastIndexedAt: null,
			owner: null,
			availability: null,
			loading: true,
		}));

		// One call per source — connector endpoint now includes status fields
		const results = await Promise.all(
			ids.map((id) => getConnector(id).catch(() => null))
		);
		rows = ids.map((id, i) => {
			const result = results[i];
			return {
				connector_id: id,
				connector_type: result?.connector.connector_type ?? ConnectorType.MONGODB,
				indexingState: result?.indexing_state ?? null,
				lastIndexedAt: result?.last_indexed ?? null,
				owner: result?.owner || null,
				availability: result?.availability ?? null,
				loading: false,
			};
		});
	}

	async function handleRefresh() {
		refreshing = true;
		await loadSources();
		refreshing = false;
	}

	function openSettings(row: SourceRow) {
		selectedRow = row;
		sheetOpen = true;
	}

	function handleSheetUpdate(model: AnyConnectorModel) {
		// Update description in the row if we ever surface it in the table
		rows = rows.map((r) =>
			r.connector_id === model.connector_id ? { ...r, connector_type: model.connector_type } : r
		);
	}

	function handleSheetDelete(id: string) {
		rows = rows.filter((r) => r.connector_id !== id);
	}

	async function handleCreate(model: AnyConnectorModel) {
		try {
			await createConnector(model);
		} catch {
			// If API call fails, still show the row locally
		}
		rows = [
			...rows,
			{
				connector_id: model.connector_id,
				connector_type: model.connector_type,
				indexingState: null,
				lastIndexedAt: null,
				owner: null,
				availability: null,
				loading: false,
			},
		];
	}

	onMount(async () => {
		await loadSources();
		loading = false;
	});

	// ─── Helpers ──────────────────────────────────────────────────────────────

	type Availability = "online" | "offline" | "indexing" | "unknown";

	function availability(avail: boolean | null, state: IndexingState | null): Availability {
		if (state === IndexingState.INDEXING) return "indexing";
		if (avail === true) return "online";
		if (avail === false) return "offline";
		return "unknown";
	}

	function formatDate(iso: string | null): string {
		if (!iso) return "—";
		const d = new Date(iso);
		const diff = Date.now() - d.getTime();
		const mins = Math.floor(diff / 60_000);
		if (mins < 1) return "just now";
		if (mins < 60) return `${mins}m ago`;
		const hrs = Math.floor(mins / 60);
		if (hrs < 24) return `${hrs}h ago`;
		const days = Math.floor(hrs / 24);
		return days < 30 ? `${days}d ago` : d.toLocaleDateString();
	}

	const stateConfig: Record<IndexingState, { label: string; class: string }> = {
		[IndexingState.NOT_INDEXED]:   { label: "Not indexed",   class: "bg-muted text-muted-foreground" },
		[IndexingState.INDEXING]:      { label: "Indexing",      class: "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400" },
		[IndexingState.INDEXED]:       { label: "Indexed",       class: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400" },
		[IndexingState.FULLY_INDEXED]: { label: "Fully indexed", class: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400" },
		[IndexingState.ERROR]:         { label: "Error",         class: "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400" },
	};
</script>

<div class="flex h-full flex-col">
	<!-- Page header -->
	<header class="border-border flex h-14 shrink-0 items-center justify-between border-b px-6">
		<div class="flex items-center gap-3">
			<h1 class="text-base font-semibold">Configs</h1>
			<p class="text-muted-foreground text-sm">Connect and configure data sources</p>
		</div>
		<div class="flex items-center gap-2">
			<Button
				variant="ghost"
				size="icon-sm"
				onclick={handleRefresh}
				disabled={loading || refreshing}
				title="Refresh"
			>
				<RefreshCwIcon class={cn("size-4", refreshing && "animate-spin")} />
			</Button>
			<Button size="sm" onclick={() => (dialogOpen = true)} data-guide="add-source" disabled={user.isHost}>
			<PlusIcon />
			Add source
			</Button>
		</div>
	</header>

	<!-- Body -->
	{#if loading}
		<div class="flex-1 p-6">
			<div class="space-y-2">
				{#each [1, 2, 3] as _ (_)}
					<Skeleton class="h-12 w-full rounded-lg" />
				{/each}
			</div>
		</div>
	{:else if loadError}
		<div class="flex flex-1 flex-col items-center justify-center gap-3 text-center">
			<p class="text-sm font-medium">Failed to load sources</p>
			<p class="text-muted-foreground max-w-xs text-xs">{loadError}</p>
			<Button variant="outline" size="sm" onclick={handleRefresh}>Try again</Button>
		</div>
	{:else if rows.length === 0}
		<div class="flex flex-1 flex-col items-center justify-center gap-4">
			<div class="bg-muted flex size-12 items-center justify-center rounded-xl">
				<DatabaseIcon class="text-muted-foreground size-6" />
			</div>
			<div class="text-center">
				<p class="text-sm font-medium">No data sources yet</p>
				<p class="text-muted-foreground mt-1 text-sm">Add a source to start connecting your data.</p>
			</div>
			{#if !user.isHost}
			<Button variant="outline" size="sm" onclick={() => (dialogOpen = true)}>
				<PlusIcon />
				Add your first source
			</Button>
			{/if}
		</div>
	{:else}
		<div class="flex-1 overflow-auto">
			<Table.Table data-guide="source-table">
				<Table.TableHeader>
					<Table.TableRow class="hover:bg-transparent">
						<Table.TableHead class="w-12 pl-6"></Table.TableHead>
						<Table.TableHead>Source</Table.TableHead>
						<Table.TableHead>Type</Table.TableHead>
						<Table.TableHead>Availability</Table.TableHead>
						<Table.TableHead>Indexing state</Table.TableHead>
						<Table.TableHead>Last indexed</Table.TableHead>
						<Table.TableHead>Owner</Table.TableHead>
					<Table.TableHead class="w-10 pr-4">Actions</Table.TableHead>
					</Table.TableRow>
				</Table.TableHeader>
				<Table.TableBody>
					{#each rows as row (row.connector_id)}
					{@const avail = availability(row.availability, row.indexingState)}
					<Table.TableRow>

					<!-- DB icon -->
					<Table.TableCell class="pl-6 pr-2">
					<div class="flex size-7 items-center justify-center rounded-md bg-muted">
					{#if row.connector_type === ConnectorType.MONGODB}
					<MongodbIcon class="size-4" />
					{:else}
					<PostgresqlIcon class="size-4" />
					{/if}
					</div>
					</Table.TableCell>

					<!-- Source name -->
					<Table.TableCell>
					<span class="font-mono text-sm font-medium">{row.connector_id}</span>
					</Table.TableCell>

					<!-- Type label -->
					<Table.TableCell>
					<span class="text-muted-foreground text-xs">
					{row.connector_type === ConnectorType.MONGODB ? "MongoDB" : "PostgreSQL"}
					</span>
					</Table.TableCell>

					<!-- Availability dot -->
					<Table.TableCell>
					{#if row.loading}
					<Skeleton class="size-2.5 rounded-full" />
					{:else}
					<span class="flex items-center gap-2">
					<span class="relative flex size-2.5 shrink-0">
					{#if avail === "online"}
					<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"></span>
					<span class="relative inline-flex size-2.5 rounded-full bg-emerald-500"></span>
					{:else if avail === "offline"}
					<span class="relative inline-flex size-2.5 rounded-full bg-red-500"></span>
					{:else if avail === "indexing"}
					<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60"></span>
					<span class="relative inline-flex size-2.5 rounded-full bg-amber-500"></span>
					{:else}
					<span class="relative inline-flex size-2.5 rounded-full bg-muted-foreground/25"></span>
					{/if}
					</span>
					<span class="text-muted-foreground text-xs capitalize">{avail}</span>
					</span>
					{/if}
					</Table.TableCell>

					<!-- Indexing state badge -->
					<Table.TableCell>
					{#if row.loading}
					<Skeleton class="h-5 w-20 rounded-full" />
					{:else if row.indexingState}
					{@const cfg = stateConfig[row.indexingState]}
					<span
					class={cn(
					"inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
					cfg.class
					)}
					>
					{cfg.label}
					</span>
					{:else}
					<span class="text-muted-foreground text-xs">Not indexed</span>
					{/if}
					</Table.TableCell>

					<!-- Freshness -->
					<Table.TableCell>
					{#if row.loading}
					<Skeleton class="h-4 w-14" />
					{:else}
					<span class="text-muted-foreground text-xs">{formatDate(row.lastIndexedAt)}</span>
					{/if}
					</Table.TableCell>

					<!-- Owner -->
					<Table.TableCell class="pr-6">
					{#if row.loading}
					<Skeleton class="h-4 w-24" />
					{:else if row.owner}
					<span class="text-muted-foreground text-xs">{row.owner}</span>
					{:else}
					<span class="text-muted-foreground/50 text-xs">—</span>
					{/if}
					</Table.TableCell>

					<!-- Settings button -->
					<Table.TableCell class="pr-4">
					 <button
								type="button"
					  onclick={() => openSettings(row)}
					  class="text-muted-foreground hover:text-foreground hover:bg-accent flex size-7 items-center justify-center rounded-md transition-colors"
					 title="Source settings"
					>
					<MoreHorizontalIcon class="size-4" />
					</button>
					</Table.TableCell>

					</Table.TableRow>
					{/each}
				</Table.TableBody>
			</Table.Table>
		</div>
	{/if}
</div>

<AddSourceDialog bind:open={dialogOpen} oncreate={handleCreate} />

{#if selectedRow}
	<SourceSettingsSheet
		bind:open={sheetOpen}
		connectorId={selectedRow.connector_id}
		connectorType={selectedRow.connector_type}
		onupdate={handleSheetUpdate}
		ondelete={handleSheetDelete}
	/>
{/if}
