<script lang="ts">
	import { fadeUp } from '$lib/actions/fade-up';
	import PostgresqlIcon from '$lib/assets/icons/postgresql-icon.svelte';
	import MongodbIcon from '$lib/assets/icons/mongodb-icon.svelte';
	import SnowflakeIcon from '$lib/assets/icons/snowflake.svelte';
	import McpIcon from '$lib/assets/icons/mcp.svelte';
</script>

<section class="border-b border-border bg-background">
	<div class="mx-auto max-w-section">
		<div class="grid grid-cols-1 divide-y border-border md:grid-cols-3 md:divide-x md:divide-y-0 md:min-h-[560px]">

			<!-- Describe -->
			<a
				href="/product/semantic-catalog"
				data-fade-up="pending"
				use:fadeUp={{ delay: 0 }}
				class="group relative flex flex-col px-8 pt-14 pb-0 overflow-hidden transition-colors hover:bg-muted/20"
			>
				<!-- Big step number watermark -->
				<span class="absolute right-6 top-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">01</span>

				<div class="flex items-center gap-2 mb-3">
					<span class="size-1.5 rounded-full bg-primary"></span>
					<span class="font-mono text-[10px] uppercase tracking-widest text-primary">Describe</span>
				</div>

				<h2 class="text-foreground text-3xl tracking-tight flex items-baseline gap-3">
					Read &amp; infer.<span class="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-primary">→</span>
				</h2>
				<p class="text-muted-foreground mt-4 text-sm leading-relaxed max-w-xs">
					Nomox reads your schemas and infers business meaning for every column, table and source - automatically.
				</p>

				<!-- Visual: schema rows with inferred labels — terminal styling -->
				<div class="mt-8 flex-1 rounded-t-xl border border-b-0 border-border bg-background overflow-hidden group-hover:border-primary/30 transition-colors">
					<div class="border-b border-border px-4 py-2.5 flex items-center justify-between">
						<div class="flex items-center gap-2">
							<span class="size-2 rounded-full bg-emerald-500"></span>
							<span class="text-muted-foreground font-mono text-[10px] uppercase tracking-widest">Schema inference</span>
						</div>
						<span class="font-mono text-[10px] text-muted-foreground">4 / 4</span>
					</div>
					<div class="divide-y divide-border">
						{#each [
							{ col: 'customer_id',  label: 'Customer ID',                conf: 99 },
							{ col: 'rev_arr',       label: 'Annual Recurring Revenue',  conf: 96 },
							{ col: 'churn_risk',    label: 'Churn Risk Score',          conf: 92 },
							{ col: 'acq_channel',   label: 'Acquisition Channel',       conf: 94 },
						] as row, i}
							<div class="px-4 py-2.5 flex items-center justify-between gap-3">
								<span class="font-mono text-[11px] text-foreground/60 shrink-0">{row.col}</span>
								<div class="flex items-center gap-2 min-w-0">
									<span class="size-1 rounded-full bg-primary shrink-0"></span>
									<span class="text-xs text-primary font-medium truncate text-right">{row.label}</span>
								</div>
								<span class="font-mono text-[10px] text-muted-foreground shrink-0 tabular-nums">{row.conf}%</span>
							</div>
						{/each}
					</div>
				</div>
			</a>

			<!-- Integrate -->
			<a
				href="/product/mcp"
				data-fade-up="pending"
				use:fadeUp={{ delay: 100 }}
				class="group relative flex flex-col px-8 pt-14 pb-0 overflow-hidden transition-colors hover:bg-muted/20"
			>
				<span class="absolute right-6 top-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">02</span>

				<div class="flex items-center gap-2 mb-3">
					<span class="size-1.5 rounded-full bg-primary"></span>
					<span class="font-mono text-[10px] uppercase tracking-widest text-primary">Integrate</span>
				</div>

				<h2 class="text-foreground text-3xl tracking-tight flex items-baseline gap-3">
					Connect &amp; expose.<span class="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-primary">→</span>
				</h2>
				<p class="text-muted-foreground mt-4 text-sm leading-relaxed max-w-xs">
					Connect any data source and expose your catalog to Claude, Cursor or any MCP-compatible AI tool with one toggle.
				</p>

				<!-- Visual: source + MCP connection card -->
				<div class="mt-8 flex-1 rounded-t-xl border border-b-0 border-border bg-background overflow-hidden group-hover:border-primary/30 transition-colors">
					<div class="border-b border-border px-4 py-2.5 flex items-center justify-between">
						<div class="flex items-center gap-2">
							<span class="size-2 rounded-full bg-emerald-500"></span>
							<span class="text-muted-foreground font-mono text-[10px] uppercase tracking-widest">Connected sources</span>
						</div>
						<span class="font-mono text-[10px] text-muted-foreground">3 + 1</span>
					</div>
					<div class="p-4 flex flex-col gap-3">
						<div class="flex items-center gap-3">
							<div class="size-7 rounded-md border border-border bg-background flex items-center justify-center shrink-0">
								<PostgresqlIcon class="size-4" />
							</div>
							<span class="font-mono text-xs text-foreground/80 flex-1 truncate">production-db</span>
							<span class="text-[10px] font-medium rounded-full px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">synced</span>
						</div>
						<div class="flex items-center gap-3">
							<div class="size-7 rounded-md border border-border bg-background flex items-center justify-center shrink-0">
								<MongodbIcon class="size-4" />
							</div>
							<span class="font-mono text-xs text-foreground/80 flex-1 truncate">analytics-mongo</span>
							<span class="text-[10px] font-medium rounded-full px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">synced</span>
						</div>
						<div class="flex items-center gap-3">
							<div class="size-7 rounded-md border border-border bg-background flex items-center justify-center shrink-0 text-[16px] leading-none">
								<SnowflakeIcon />
							</div>
							<span class="font-mono text-xs text-foreground/80 flex-1 truncate">warehouse</span>
							<span class="indexing-pill text-[10px] font-medium rounded-full px-2 py-0.5 bg-muted text-muted-foreground">indexing</span>
						</div>
						<div class="mt-1 pt-3 border-t border-dashed border-border flex items-center gap-3">
							<div class="size-7 rounded-md border border-primary/30 bg-primary/5 flex items-center justify-center shrink-0 text-[16px] leading-none">
								<McpIcon />
							</div>
							<span class="font-mono text-xs text-foreground flex-1">MCP server</span>
							<span class="text-[10px] font-medium rounded-full px-2 py-0.5 bg-primary/10 text-primary">active</span>
						</div>
					</div>
				</div>
			</a>

			<!-- Explore -->
			<a
				href="/product/bi"
				data-fade-up="pending"
				use:fadeUp={{ delay: 200 }}
				class="group relative flex flex-col px-8 pt-14 pb-0 overflow-hidden transition-colors hover:bg-muted/20"
			>
				<span class="absolute right-6 top-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">03</span>

				<div class="flex items-center gap-2 mb-3">
					<span class="size-1.5 rounded-full bg-primary"></span>
					<span class="font-mono text-[10px] uppercase tracking-widest text-primary">Explore</span>
				</div>

				<h2 class="text-foreground text-3xl tracking-tight flex items-baseline gap-3">
					Browse &amp; query.<span class="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-primary">→</span>
				</h2>
				<p class="text-muted-foreground mt-4 text-sm leading-relaxed max-w-xs">
					Browse, search and query your data landscape through a shared catalog your whole team can understand.
				</p>

				<!-- Visual: catalog browse with mini-bars -->
				<div class="mt-8 flex-1 rounded-t-xl border border-b-0 border-border bg-background overflow-hidden group-hover:border-primary/30 transition-colors">
					<div class="border-b border-border px-4 py-2.5 flex items-center justify-between">
						<div class="flex items-center gap-2">
							<span class="size-2 rounded-full bg-emerald-500"></span>
							<span class="text-muted-foreground font-mono text-[10px] uppercase tracking-widest">Catalog</span>
						</div>
						<span class="font-mono text-[10px] text-muted-foreground">4 tables</span>
					</div>
					<div class="divide-y divide-border">
						{#each [
							{ table: 'customers',    domain: 'CRM',       cols: 14, bar: 60 },
							{ table: 'orders',       domain: 'Commerce',  cols: 22, bar: 95 },
							{ table: 'events',       domain: 'Analytics', cols: 9,  bar: 38 },
							{ table: 'subscriptions',domain: 'Billing',   cols: 17, bar: 72 },
						] as item}
							<div class="px-4 py-2.5 flex items-center gap-3">
								<div class="flex-1 min-w-0">
									<div class="flex items-center gap-2">
										<p class="text-xs font-medium text-foreground truncate">{item.table}</p>
										<span class="text-[10px] text-muted-foreground">·</span>
										<p class="text-[10px] text-muted-foreground">{item.domain}</p>
									</div>
									<!-- mini cardinality bar -->
									<div class="mt-1.5 h-[3px] w-full rounded-full bg-muted overflow-hidden">
										<div class="h-full bg-primary/60" style="width:{item.bar}%"></div>
									</div>
								</div>
								<span class="text-[10px] text-muted-foreground shrink-0 tabular-nums">{item.cols} cols</span>
							</div>
						{/each}
					</div>
				</div>
			</a>

		</div>
	</div>
</section>

<style>
	/* Subtle pulse for the "indexing" pill */
	.indexing-pill {
		animation: indexing-pulse 1.6s ease-in-out infinite;
	}
	@keyframes indexing-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.55; }
	}
</style>
