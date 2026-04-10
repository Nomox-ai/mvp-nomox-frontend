<script lang="ts">
	import { fadeUp } from '$lib/actions/fade-up';
	import PostgresqlIcon from '$lib/assets/icons/postgresql-icon.svelte';
	import MongodbIcon from '$lib/assets/icons/mongodb-icon.svelte';
	import SnowflakeIcon from '$lib/assets/icons/snowflake.svelte';
	import McpIcon from '$lib/assets/icons/mcp.svelte';
</script>

<section class="border-border border-b">
	<div class="mx-auto max-w-section">
		<div class="grid grid-cols-1 divide-y border-border md:grid-cols-3 md:divide-x md:divide-y-0 md:min-h-[520px]">

			<!-- Describe -->
			<a
				href="/product/semantic-catalog"
				data-fade-up="pending"
				use:fadeUp={{ delay: 0 }}
				class="group flex flex-col px-8 pt-14 pb-0 overflow-hidden transition-colors hover:bg-muted/30"
			>
				<h2 class="text-foreground text-4xl tracking-tight flex items-baseline gap-3">
					Describe.<span class=" opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">→</span>
				</h2>
				<p class="text-muted-foreground mt-4 text-sm leading-relaxed max-w-xs">
					Nomox reads your schemas and infers business meaning for every column, table and source — automatically.
				</p>

				<!-- Visual: schema rows with inferred labels -->
				<div class="mt-8 flex-1 rounded-t-xl border border-b-0 border-border bg-background overflow-hidden group-hover:border-border/70">
					<div class="border-b border-border px-4 py-2.5 flex items-center gap-2">
						<span class="text-muted-foreground font-mono text-[10px] uppercase tracking-widest">Schema inference</span>
					</div>
					<div class="divide-y divide-border">
						{#each [
							{ col: 'customer_id',  label: 'Customer ID'              },
							{ col: 'rev_arr',       label: 'Annual Recurring Revenue' },
							{ col: 'churn_risk',    label: 'Churn Risk Score'         },
							{ col: 'acq_channel',   label: 'Acquisition Channel'      },
						] as row}
							<div class="px-4 py-2.5 flex items-center justify-between gap-4">
								<span class="font-mono text-xs text-foreground/70 shrink-0">{row.col}</span>
								<span class="text-xs text-primary font-medium truncate text-right">{row.label}</span>
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
				class="group flex flex-col px-8 pt-14 pb-0 overflow-hidden transition-colors hover:bg-muted/30"
			>
				<h2 class="text-foreground text-4xl tracking-tight flex items-baseline gap-3">
					Integrate.<span class="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">→</span>
				</h2>
				<p class="text-muted-foreground mt-4 text-sm leading-relaxed max-w-xs">
					Connect any data source and expose your catalog to Claude, Cursor or any MCP-compatible AI tool with one toggle.
				</p>

				<!-- Visual: source + MCP connection grid -->
				<div class="mt-8 flex-1 rounded-t-xl border border-b-0 border-border bg-background overflow-hidden group-hover:border-border/70">
					<div class="border-b border-border px-4 py-2.5 flex items-center gap-2">
						<span class="text-muted-foreground font-mono text-[10px] uppercase tracking-widest">Connected sources</span>
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
							<span class="text-[10px] font-medium rounded-full px-2 py-0.5 bg-muted text-muted-foreground">indexing</span>
						</div>
						<div class="mt-1 pt-3 border-t border-border flex items-center gap-3">
							<div class="size-7 rounded-md border border-border bg-background flex items-center justify-center shrink-0 text-[16px] leading-none">
								<McpIcon />
							</div>
							<span class="font-mono text-xs text-foreground/80 flex-1">MCP server</span>
							<span class="text-[10px] font-medium rounded-full px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">active</span>
						</div>
					</div>
				</div>
			</a>

			<!-- Explore -->
			<a
				href="/product/bi"
				data-fade-up="pending"
				use:fadeUp={{ delay: 200 }}
				class="group flex flex-col px-8 pt-14 pb-0 overflow-hidden transition-colors hover:bg-muted/30"
			>
				<h2 class="text-foreground text-4xl tracking-tight flex items-baseline gap-3">
					Explore.<span class=" opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">→</span>
				</h2>
				<p class="text-muted-foreground mt-4 text-sm leading-relaxed max-w-xs">
					Browse, search and query your data landscape through a shared catalog your whole team can understand.
				</p>

				<!-- Visual: catalog browse -->
				<div class="mt-8 flex-1 rounded-t-xl border border-b-0 border-border bg-background overflow-hidden group-hover:border-border/70">
					<div class="border-b border-border px-4 py-2.5 flex items-center gap-2">
						<span class="text-muted-foreground font-mono text-[10px] uppercase tracking-widest">Catalog</span>
					</div>
					<div class="divide-y divide-border">
						{#each [
							{ table: 'customers',    domain: 'CRM',       cols: 14 },
							{ table: 'orders',       domain: 'Commerce',  cols: 22 },
							{ table: 'events',       domain: 'Analytics', cols: 9  },
							{ table: 'subscriptions',domain: 'Billing',   cols: 17 },
						] as item}
							<div class="px-4 py-2.5 flex items-center gap-3">
								<div class="flex-1 min-w-0">
									<p class="text-xs font-medium text-foreground truncate">{item.table}</p>
									<p class="text-[10px] text-muted-foreground">{item.domain}</p>
								</div>
								<span class="text-[10px] text-muted-foreground shrink-0">{item.cols} cols</span>
							</div>
						{/each}
					</div>
				</div>
			</a>

		</div>
	</div>
</section>
