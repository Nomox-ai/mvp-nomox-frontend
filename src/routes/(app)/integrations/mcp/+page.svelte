<script lang="ts">
	import { onMount } from "svelte";
	import { cn } from "$lib/utils.js";
	import { getIntegrations, rotateToken } from "$lib/api/mcp.js";
	import type { IntegrationsData } from "$lib/api/mcp.js";
	import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";

	import CheckCircle2Icon from "@lucide/svelte/icons/check-circle-2";
	import AlertCircleIcon from "@lucide/svelte/icons/alert-circle";
	import CopyIcon from "@lucide/svelte/icons/copy";
	import RefreshCwIcon from "@lucide/svelte/icons/refresh-cw";
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";

	// ─── State ────────────────────────────────────────────────────────────────

	let data = $state<IntegrationsData | null>(null);
	let loading = $state(true);
	let loadError = $state(false);

	let expandedTool = $state<string | null>(null);
	let copiedKey = $state<string | null>(null);
	let rotatingToken = $state(false);
	let rotateError = $state<string | null>(null);

	// Stored after rotation — shown in the warning banner once, then the
	// page data is reloaded so configs reflect the new token automatically.
	let newRawToken = $state<string | null>(null);

	const online = $derived(!loadError && data !== null);

	// ─── Data loading ─────────────────────────────────────────────────────────

	async function loadData() {
		loadError = false;
		try {
			data = await getIntegrations();
		} catch {
			loadError = true;
		} finally {
			loading = false;
		}
	}

	onMount(loadData);

	// ─── Actions ──────────────────────────────────────────────────────────────

	async function copy(text: string, key: string) {
		await navigator.clipboard.writeText(text);
		copiedKey = key;
		setTimeout(() => (copiedKey = null), 1500);
	}

	async function handleRotate() {
		rotatingToken = true;
		rotateError = null;
		try {
			const result = await rotateToken();
			newRawToken = result.token;
			// Reload everything from the API — masked token, client configs, server URL all refresh
			await loadData();
		} catch {
			rotateError = "Failed to rotate token. Please try again.";
		} finally {
			rotatingToken = false;
		}
	}
</script>

<div class="flex h-full min-w-0 flex-col overflow-x-hidden">
	<!-- Header -->
	<header class="border-border flex h-14 shrink-0 items-center gap-2 overflow-hidden border-b px-6">
		<h1 class="shrink-0 text-base font-semibold">MCP</h1>
		<p class="text-muted-foreground hidden truncate text-sm sm:block">Model Context Protocol server configuration</p>
		{#if !loading}
			<span
				class={cn(
					"ml-3 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
					online
						? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
						: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
				)}
			>
				{#if online}
					<CheckCircle2Icon class="size-3" />
					Online
				{:else}
					<AlertCircleIcon class="size-3" />
					Offline
				{/if}
			</span>
		{/if}
	</header>

	<div class="flex-1 overflow-y-auto">
		{#if loading}
			<div class="mx-auto max-w-section space-y-4 p-6">
				<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
					<Skeleton class="h-36 rounded-xl" />
					<Skeleton class="h-36 rounded-xl" />
				</div>
				<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
					<Skeleton class="h-40 rounded-xl" />
					<Skeleton class="h-40 rounded-xl" />
				</div>
				<Skeleton class="h-48 rounded-xl" />
			</div>

		{:else if loadError || !data}
			<div class="flex flex-1 flex-col items-center justify-center gap-3 p-12 text-center">
				<AlertCircleIcon class="text-muted-foreground size-8" />
				<p class="text-sm font-medium">Failed to load integration data</p>
				<p class="text-muted-foreground max-w-xs text-xs">
					Could not reach the backend. Check that the server is running and your token is valid.
				</p>
			</div>

		{:else}
			<div class="mx-auto max-w-section space-y-4 p-6">

				<!-- ── Row 1: Server + Token ───────────────────────────────────── -->
				<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">

					<!-- Server -->
					<section class="border-border rounded-xl border">
						<div class="border-border flex items-center gap-2 border-b px-4 py-3">
							<h2 class="text-sm font-semibold">Server</h2>
						</div>
						<div class="divide-border divide-y px-4">
							<div class="flex items-center gap-3 py-2.5">
								<span class="text-muted-foreground w-24 shrink-0 text-xs">URL</span>
								<code class="bg-muted min-w-0 flex-1 truncate rounded px-2 py-1 font-mono text-xs">
									{data.server_url}
								</code>
								<button
									type="button"
									class="text-muted-foreground hover:text-foreground shrink-0 transition-colors"
									title="Copy URL"
									onclick={() => copy(data!.server_url, "url")}
								>
									<CopyIcon class={cn("size-3.5", copiedKey === "url" && "text-emerald-500")} />
								</button>
							</div>
							<div class="flex items-center gap-3 py-2.5">
								<span class="text-muted-foreground w-24 shrink-0 text-xs">Transport</span>
								<span class="font-mono text-xs uppercase">{data.transport}</span>
							</div>
							<div class="flex items-center gap-3 py-2.5">
								<span class="text-muted-foreground w-24 shrink-0 text-xs">Auth header</span>
								<code class="font-mono text-xs">{data.auth_header}</code>
							</div>
							<div class="flex items-center gap-3 py-2.5">
								<span class="text-muted-foreground w-24 shrink-0 text-xs">Tools</span>
								<span class="text-xs">{data.tools.length} exposed</span>
							</div>
						</div>
					</section>

					<!-- API Token -->
					<section class="border-border rounded-xl border">
						<div class="border-border flex items-center gap-2 border-b px-4 py-3">
							<h2 class="text-sm font-semibold">API Token</h2>
						</div>
						<div class="space-y-3 p-4">
							<div class="flex items-center gap-2">
								<code class="bg-muted min-w-0 flex-1 truncate rounded px-3 py-2 font-mono text-xs">
									{data.masked_token}
								</code>
							</div>

							{#if newRawToken}
								<div class="bg-amber-50 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-800 rounded-lg px-3 py-2 flex items-start gap-2">
									<AlertCircleIcon class="size-3.5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
									<div class="min-w-0 flex-1 space-y-1">
										<p class="text-xs font-medium text-amber-700 dark:text-amber-300">Copy this token now — it will not be shown again</p>
										<code class="block min-w-0 break-all font-mono text-xs text-amber-800 dark:text-amber-200">{newRawToken}</code>
									</div>
									<button
										type="button"
										class="text-amber-600 hover:text-amber-800 dark:text-amber-400 ml-auto shrink-0 transition-colors"
										title="Copy token"
										onclick={() => copy(newRawToken!, "token-banner")}
									>
										<CopyIcon class={cn("size-3.5", copiedKey === "token-banner" && "text-emerald-500")} />
									</button>
								</div>
							{:else}
								<p class="text-muted-foreground/60 text-xs">
									Sent as <code class="font-mono">{data.auth_header}</code> in every MCP request.
								</p>
							{/if}

							{#if rotateError}
								<p class="text-destructive text-xs">{rotateError}</p>
							{/if}

							<button
								type="button"
								class="border-border hover:bg-accent inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50"
								disabled={rotatingToken}
								onclick={handleRotate}
							>
								<RefreshCwIcon class={cn("size-3", rotatingToken && "animate-spin")} />
								{rotatingToken ? "Rotating…" : "Rotate token"}
							</button>
						</div>
					</section>
				</div>

				<!-- ── Row 2: Client config snippets ──────────────────────────── -->
				<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
					{#each data.client_configs as cfg (cfg.label)}
						<section class="border-border min-w-0 rounded-xl border">
							<div class="border-border flex items-center gap-2 border-b px-4 py-3">
								<h2 class="text-sm font-semibold">{cfg.label}</h2>
								<span class="text-muted-foreground ml-auto truncate text-xs">
									{cfg.filename}{cfg.hint ? ` · ${cfg.hint}` : ""}
								</span>
								<button
									type="button"
									class="text-muted-foreground hover:text-foreground ml-2 shrink-0 transition-colors"
									title="Copy config"
									onclick={() => copy(cfg.config_json, `cfg-${cfg.label}`)}
								>
									<CopyIcon class={cn("size-3.5", copiedKey === `cfg-${cfg.label}` && "text-emerald-500")} />
								</button>
							</div>
							<pre class="text-muted-foreground min-w-0 overflow-hidden whitespace-pre-wrap px-4 py-3 font-mono text-xs leading-relaxed" style="overflow-wrap: anywhere;">{cfg.config_json}</pre>
						</section>
					{/each}
				</div>

				<!-- ── Row 3: Tools ────────────────────────────────────────────── -->
				<section class="border-border rounded-xl border">
					<div class="border-border flex items-center gap-2 border-b px-4 py-3">
						<h2 class="text-sm font-semibold">Exposed tools</h2>
						<span class="text-muted-foreground ml-auto text-xs">{data.tools.length} tools</span>
					</div>
					<div class="divide-border divide-y">
						{#each data.tools as tool (tool.name)}
							<div>
								<button
									type="button"
									class="hover:bg-accent/30 flex w-full items-center gap-3 px-4 py-3 text-left transition-colors"
									onclick={() => (expandedTool = expandedTool === tool.name ? null : tool.name)}
								>
									<span class="text-muted-foreground/40 shrink-0">
										{#if expandedTool === tool.name}
											<ChevronDownIcon class="size-3" />
										{:else}
											<ChevronRightIcon class="size-3" />
										{/if}
									</span>
									<code class="w-36 shrink-0 font-mono text-xs font-medium">{tool.name}</code>
									<span class="text-muted-foreground min-w-0 flex-1 truncate text-xs">{tool.description}</span>
								</button>

								{#if expandedTool === tool.name}
									<div class="bg-muted/30 border-border/40 border-t px-10 py-4">
										<p class="text-muted-foreground mb-4 text-xs leading-relaxed">{tool.description}</p>
										{#if tool.params.length > 0}
											<p class="text-muted-foreground mb-2 text-[10px] font-semibold uppercase tracking-wider">Parameters</p>
											<div class="space-y-2">
												{#each tool.params as param}
													<div class="flex items-start gap-3">
														<code class="text-foreground w-28 shrink-0 font-mono text-[11px]">{param.name}</code>
														<span class="text-muted-foreground/60 w-14 shrink-0 font-mono text-[10px]">{param.type}</span>
														<span class="text-muted-foreground flex-1 text-[11px]">{param.description}</span>
														{#if param.required}
															<span class="shrink-0 text-[10px] text-red-500">required</span>
														{:else}
															<span class="text-muted-foreground/50 shrink-0 text-[10px]">optional</span>
														{/if}
													</div>
												{/each}
											</div>
										{:else}
											<p class="text-muted-foreground/60 text-xs">No parameters</p>
										{/if}
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</section>

			</div>
		{/if}
	</div>
</div>
