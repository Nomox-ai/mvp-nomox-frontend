<script lang="ts">
	import { onMount } from "svelte";
	import { cn } from "$lib/utils.js";
	import { getMcpConfig, rotateMcpToken } from "$lib/api/mcp.js";
	import type { McpConfig, McpTool } from "$lib/api/mcp.js";
	import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";

	import CheckCircle2Icon from "@lucide/svelte/icons/check-circle-2";
	import AlertCircleIcon from "@lucide/svelte/icons/alert-circle";
	import CopyIcon from "@lucide/svelte/icons/copy";
	import RefreshCwIcon from "@lucide/svelte/icons/refresh-cw";
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";

	// ─── State ────────────────────────────────────────────────────────────────

	let config = $state<McpConfig | null>(null);
	let loading = $state(true);
	let online = $state(true);

	let expandedTool = $state<string | null>(null);
	let copiedKey = $state<string | null>(null);
	let rotatingToken = $state(false);
	let newToken = $state<string | null>(null);

	// ─── Data loading ─────────────────────────────────────────────────────────

	onMount(async () => {
		try {
			config = await getMcpConfig();
		} catch {
			online = false;
		}
		loading = false;
	});

	// ─── Helpers ──────────────────────────────────────────────────────────────

	async function copy(text: string, key: string) {
		await navigator.clipboard.writeText(text);
		copiedKey = key;
		setTimeout(() => (copiedKey = null), 1500);
	}

	async function rotateToken() {
		rotatingToken = true;
		newToken = null;
		try {
			const result = await rotateMcpToken();
			newToken = result.token;
		} finally {
			rotatingToken = false;
		}
	}

	// ─── Config snippets ──────────────────────────────────────────────────────

	const activeToken = $derived(newToken ?? config?.token ?? "");

	const claudeConfig = $derived(
		config
			? JSON.stringify(
					{
						mcpServers: {
							nomox: {
								command: "C:\\Windows\\System32\\cmd.exe",
								args: [
									"/c",
									"npx",
									"mcp-remote",
									config.server_url + "/sse",
									"--header",
									`X-API-Token: ${activeToken}`,
								],
							},
						},
					},
					null,
					2
				)
			: ""
	);

	const cursorConfig = $derived(
		config
			? JSON.stringify(
					{
						mcpServers: {
							nomox: {
								url: config.server_url + "/sse",
								headers: { "X-API-Token": activeToken },
							},
						},
					},
					null,
					2
				)
			: ""
	);
</script>

<div class="flex h-full flex-col">
	<!-- Header -->
	<header class="border-border flex h-14 shrink-0 items-center border-b px-6">
		<h1 class="text-base font-semibold">MCP</h1>
		<p class="text-muted-foreground ml-3 text-sm">Model Context Protocol server configuration</p>
		{#if !loading}
			<span
				class={cn(
					"ml-3 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
					online && config
						? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
						: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
				)}
			>
				{#if online && config}
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
				<div class="grid grid-cols-2 gap-4">
					<Skeleton class="h-36 rounded-xl" />
					<Skeleton class="h-36 rounded-xl" />
				</div>
				<div class="grid grid-cols-2 gap-4">
					<Skeleton class="h-40 rounded-xl" />
					<Skeleton class="h-40 rounded-xl" />
				</div>
				<Skeleton class="h-48 rounded-xl" />
			</div>
		{:else}
			<div class="mx-auto max-w-section space-y-4 p-6">

				<!-- ── Row 1: Server + Token ───────────────────────────────────── -->
				<div class="grid grid-cols-2 gap-4">

					<!-- Server -->
					<section class="border-border rounded-xl border">
						<div class="border-border flex items-center gap-2 border-b px-4 py-3">
							<h2 class="text-sm font-semibold">Server</h2>
						</div>
						<div class="divide-border divide-y px-4">
							<div class="flex items-center gap-3 py-2.5">
								<span class="text-muted-foreground w-24 shrink-0 text-xs">URL</span>
								<code class="bg-muted min-w-0 flex-1 truncate rounded px-2 py-1 font-mono text-xs">
									{config?.server_url}/sse
								</code>
								<button
									type="button"
									class="text-muted-foreground hover:text-foreground shrink-0 transition-colors"
									title="Copy URL"
									onclick={() => copy((config?.server_url ?? "") + "/sse", "url")}
								>
									<CopyIcon class={cn("size-3.5", copiedKey === "url" && "text-emerald-500")} />
								</button>
							</div>
							<div class="flex items-center gap-3 py-2.5">
								<span class="text-muted-foreground w-24 shrink-0 text-xs">Transport</span>
								<span class="font-mono text-xs uppercase">SSE</span>
							</div>
							<div class="flex items-center gap-3 py-2.5">
								<span class="text-muted-foreground w-24 shrink-0 text-xs">Auth header</span>
								<code class="font-mono text-xs">X-API-Token</code>
							</div>
							<div class="flex items-center gap-3 py-2.5">
								<span class="text-muted-foreground w-24 shrink-0 text-xs">Tools</span>
								<span class="text-xs">{config?.tools.length ?? 0} exposed</span>
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
									{newToken ?? config?.masked_token}
								</code>
								<button
									type="button"
									class="text-muted-foreground hover:text-foreground shrink-0 transition-colors"
									title="Copy token"
									onclick={() => copy(activeToken, "token")}
								>
									<CopyIcon class={cn("size-3.5", copiedKey === "token" && "text-emerald-500")} />
								</button>
							</div>
							{#if newToken}
								<p class="text-xs text-amber-600 dark:text-amber-400">
									Copy this token now-it will not be shown again.
								</p>
							{:else}
								<p class="text-muted-foreground/60 text-xs">
									Sent as <code class="font-mono">X-API-Token</code> in every MCP request. Set via <code class="font-mono">MCP_API_TOKEN</code> env var.
								</p>
							{/if}
							<button
								type="button"
								class="border-border hover:bg-accent inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50"
								disabled={rotatingToken}
								onclick={rotateToken}
							>
								<RefreshCwIcon class={cn("size-3", rotatingToken && "animate-spin")} />
								{rotatingToken ? "Rotating…" : "Rotate token"}
							</button>
						</div>
					</section>
				</div>

				<!-- ── Row 2: Config snippets ──────────────────────────────────── -->
				<div class="grid grid-cols-2 gap-4">

					<!-- Claude Desktop -->
					<section class="border-border rounded-xl border">
						<div class="border-border flex items-center gap-2 border-b px-4 py-3">
							<h2 class="text-sm font-semibold">Claude Desktop</h2>
							<span class="text-muted-foreground ml-auto text-xs">claude_desktop_config.json · mcp-remote</span>
							<button
								type="button"
								class="text-muted-foreground hover:text-foreground transition-colors"
								title="Copy config"
								onclick={() => copy(claudeConfig, "claude")}
							>
								<CopyIcon class={cn("size-3.5", copiedKey === "claude" && "text-emerald-500")} />
							</button>
						</div>
						<pre class="text-muted-foreground overflow-x-auto px-4 py-3 font-mono text-xs leading-relaxed">{claudeConfig}</pre>
					</section>

					<!-- Cursor -->
					<section class="border-border rounded-xl border">
						<div class="border-border flex items-center gap-2 border-b px-4 py-3">
							<h2 class="text-sm font-semibold">Cursor</h2>
							<span class="text-muted-foreground ml-auto text-xs">.cursor/mcp.json</span>
							<button
								type="button"
								class="text-muted-foreground hover:text-foreground transition-colors"
								title="Copy config"
								onclick={() => copy(cursorConfig, "cursor")}
							>
								<CopyIcon class={cn("size-3.5", copiedKey === "cursor" && "text-emerald-500")} />
							</button>
						</div>
						<pre class="text-muted-foreground overflow-x-auto px-4 py-3 font-mono text-xs leading-relaxed">{cursorConfig}</pre>
					</section>
				</div>

				<!-- ── Row 3: Tools (full width) ───────────────────────────────── -->
				<section class="border-border rounded-xl border">
					<div class="border-border flex items-center gap-2 border-b px-4 py-3">
						<h2 class="text-sm font-semibold">Exposed tools</h2>
						<span class="text-muted-foreground ml-auto text-xs">{config?.tools.length ?? 0} tools</span>
					</div>
					<div class="divide-border divide-y">
						{#each (config?.tools ?? []) as tool (tool.name)}
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
