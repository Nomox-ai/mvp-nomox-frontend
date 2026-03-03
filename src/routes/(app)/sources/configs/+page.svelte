<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import Badge from "$lib/components/ui/badge/badge.svelte";
	import AddSourceDialog from "$lib/components/add-source-dialog.svelte";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import DatabaseIcon from "@lucide/svelte/icons/database";
	import { ConnectorType } from "$lib/types/connector.js";
	import type { AnyConnectorModel } from "$lib/types/connector.js";
	import { cn } from "$lib/utils.js";

	let dialogOpen = $state(false);

	// In-memory source list (replace with API calls later)
	let sources = $state<AnyConnectorModel[]>([]);

	function handleCreate(model: AnyConnectorModel) {
		sources = [...sources, model];
	}

	const typeLabel: Record<ConnectorType, string> = {
		[ConnectorType.MONGODB]: "MongoDB",
		[ConnectorType.POSTGRESQL]: "PostgreSQL",
	};

	const typeMeta: Record<ConnectorType, { abbr: string; color: string; bg: string }> = {
		[ConnectorType.MONGODB]: {
			abbr: "MDB",
			color: "text-emerald-700 dark:text-emerald-400",
			bg: "bg-emerald-50 dark:bg-emerald-950/40",
		},
		[ConnectorType.POSTGRESQL]: {
			abbr: "PG",
			color: "text-sky-700 dark:text-sky-400",
			bg: "bg-sky-50 dark:bg-sky-950/40",
		},
	};
</script>

<div class="flex h-full flex-col">
	<!-- Page header -->
	<header class="border-border flex h-14 shrink-0 items-center justify-between border-b px-6">
		<div class="flex items-center gap-3">
			<h1 class="text-base font-semibold">Configs</h1>
			<p class="text-muted-foreground text-sm">Connect and configure data sources</p>
		</div>
		<Button size="sm" onclick={() => (dialogOpen = true)}>
			<PlusIcon />
			Add source
		</Button>
	</header>

	<!-- Content -->
	{#if sources.length === 0}
		<!-- Empty state -->
		<div class="flex flex-1 flex-col items-center justify-center gap-4">
			<div class="bg-muted flex size-12 items-center justify-center rounded-xl">
				<DatabaseIcon class="text-muted-foreground size-6" />
			</div>
			<div class="text-center">
				<p class="text-sm font-medium">No data sources yet</p>
				<p class="text-muted-foreground mt-1 text-sm">
					Add a source to start connecting your data.
				</p>
			</div>
			<Button variant="outline" size="sm" onclick={() => (dialogOpen = true)}>
				<PlusIcon />
				Add your first source
			</Button>
		</div>
	{:else}
		<!-- Source list -->
		<div class="flex-1 overflow-auto p-6">
			<div class="space-y-2">
				{#each sources as source (source.connector_id)}
					{@const meta = typeMeta[source.connector_type]}
					<div
						class="border-border bg-card flex items-center gap-4 rounded-lg border px-4 py-3"
					>
						<div
							class={cn(
								"flex size-8 shrink-0 items-center justify-center rounded-md text-[10px] font-bold",
								meta.bg,
								meta.color
							)}
						>
							{meta.abbr}
						</div>
						<div class="min-w-0 flex-1">
							<p class="text-sm font-medium font-mono">{source.connector_id}</p>
							{#if source.description}
								<p class="text-muted-foreground mt-0.5 truncate text-xs">{source.description}</p>
							{/if}
						</div>
						<Badge variant="secondary" class="shrink-0 text-xs">
							{typeLabel[source.connector_type]}
						</Badge>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<AddSourceDialog bind:open={dialogOpen} oncreate={handleCreate} />