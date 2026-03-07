<script lang="ts">
	import { executeQuery, type QueryResult } from "$lib/api/data.js";
	import { chatState } from "$lib/stores/chat.svelte.js";
	import Button from "$lib/components/ui/button/button.svelte";
	import PlayIcon from "@lucide/svelte/icons/play";
	import LoaderCircleIcon from "@lucide/svelte/icons/loader-circle";
	import AlertCircleIcon from "@lucide/svelte/icons/alert-circle";

	let sql = $state("SELECT 1");
	let running = $state(false);
	let result = $state<QueryResult | null>(null);
	let error = $state<string | null>(null);

	async function run() {
		if (running || !sql.trim()) return;
		running = true;
		error = null;
		result = null;
		try {
			result = await executeQuery(sql);
		} catch (e) {
			error = e instanceof Error ? e.message : String(e);
		} finally {
			running = false;
		}
	}

	$effect(() => {
		const pending = chatState.sqlInsertRequest;
		if (pending) {
			sql = pending;
			chatState.clearSqlInsert();
		}
	});

	function onKeyDown(e: KeyboardEvent) {
		if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
			e.preventDefault();
			run();
		}
	}
</script>

<div class="flex min-h-0 flex-1 flex-col">
	<header class="border-border flex h-14 shrink-0 items-center gap-3 border-b px-6">
		<h1 class="text-base font-semibold">Query</h1>
		<p class="text-muted-foreground text-sm">Execute read-only SQL against your data sources</p>
	</header>

	<div class="flex min-h-0 flex-1 flex-col gap-4 p-6">
		<!-- Editor -->
		<div class="flex shrink-0 flex-col gap-2">
			<textarea
				data-guide="sql-editor"
				class="border-border bg-background focus:ring-ring h-40 w-full resize-y rounded-md border px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2"
				placeholder="SELECT * FROM catalog.schema.table LIMIT 100"
				bind:value={sql}
				onkeydown={onKeyDown}
				spellcheck="false"
			></textarea>
			<div class="flex items-center justify-between">
				<span class="text-muted-foreground text-xs">Ctrl+Enter to run · SELECT, WITH, SHOW, DESCRIBE, EXPLAIN only</span>
				<Button size="sm" onclick={run} disabled={running || !sql.trim()}>
					{#if running}
						<LoaderCircleIcon class="mr-1.5 size-3.5 animate-spin" />
						Running…
					{:else}
						<PlayIcon class="mr-1.5 size-3.5" />
						Run Query
					{/if}
				</Button>
			</div>
		</div>

		<!-- Error -->
		{#if error}
			<div class="border-destructive/30 bg-destructive/5 text-destructive flex shrink-0 items-start gap-2 rounded-md border px-3 py-2 text-sm">
				<AlertCircleIcon class="mt-0.5 size-4 shrink-0" />
				<span class="font-mono">{error}</span>
			</div>
		{/if}

		<!-- Results -->
		{#if result}
			<div class="flex flex-col gap-2">
				<p class="text-muted-foreground text-xs">
					{result.rows.length} row{result.rows.length === 1 ? "" : "s"} · {result.columns.length} column{result.columns.length === 1 ? "" : "s"}
				</p>

				<div class="border-border overflow-auto rounded-md border" style="max-height: 60vh;">
					<table class="w-full text-sm">
						<thead class="bg-muted/50 sticky top-0">
							<tr class="border-border border-b">
								{#each result.columns as col}
									<th class="text-muted-foreground px-3 py-2 text-left font-mono text-xs font-medium whitespace-nowrap">{col}</th>
								{/each}
							</tr>
						</thead>
						<tbody>
							{#each Array.from(result.rows) as row}
								<tr class="border-border hover:bg-muted/40 border-b">
									{#each Array.from(row) as cell}
										<td class="px-3 py-2 font-mono text-xs whitespace-nowrap">
											{#if cell === null}
												<span class="text-muted-foreground/50 italic">NULL</span>
											{:else if cell === true}
												<span class="text-green-600">true</span>
											{:else if cell === false}
												<span class="text-muted-foreground">false</span>
											{:else}
												{String(cell)}
											{/if}
										</td>
									{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		{/if}
	</div>
</div>
