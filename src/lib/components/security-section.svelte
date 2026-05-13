<script lang="ts">
	import { fadeUp } from '$lib/actions/fade-up';
	import ShieldIcon from '@lucide/svelte/icons/shield-check';
	import LockIcon from '@lucide/svelte/icons/lock-keyhole';
	import ServerIcon from '@lucide/svelte/icons/server';
	import ScanIcon from '@lucide/svelte/icons/scan-eye';
	import UsersIcon from '@lucide/svelte/icons/users';
	import ScrollTextIcon from '@lucide/svelte/icons/scroll-text';

	const small = [
		{
			Icon: ShieldIcon,
			title: 'Profiling on your terms',
			desc: 'For non-sensitive sources you can enable lightweight profiling - null rates, cardinality, sample values - to improve semantic inference. Always opt-in, never automatic.',
		},
		{
			Icon: ServerIcon,
			title: 'Your infrastructure, your data',
			desc: 'Nomox connects directly to your sources from your own environment. Metadata stays in your stack - nothing is sent to external systems.',
		},
		{
			Icon: LockIcon,
			title: 'Encrypted in transit',
			desc: 'All connections to your data sources use TLS. Credentials are stored encrypted and never logged or exposed through the API.',
		},
		{
			Icon: UsersIcon,
			title: 'Role-based access',
			desc: 'Control who can browse the catalog, run queries, or manage sources. Fine-grained permissions keep sensitive metadata visible only to the right people.',
		},
		{
			Icon: ScrollTextIcon,
			title: 'Audit log',
			desc: 'Every catalog access, query, and configuration change is logged. Know who looked at what, and when - for compliance and internal review.',
		},
	];
</script>

<section class="border-b border-border">
	<div class="mx-auto max-w-section px-8 pt-24 pb-16">

		<!-- Header -->
		<div class="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
			<div>
				<div data-fade-up="pending" use:fadeUp class="flex items-center gap-2 mb-3">
					<span class="size-1.5 rounded-full bg-primary"></span>
					<p class="text-primary font-mono text-xs uppercase tracking-widest">Security</p>
				</div>
				<h2
					data-fade-up="pending"
					use:fadeUp={{ delay: 60 }}
					class="text-foreground max-w-md text-3xl leading-snug tracking-tight md:text-4xl"
				>
					Security is not an afterthought.
				</h2>
			</div>
			<p
				data-fade-up="pending"
				use:fadeUp={{ delay: 120 }}
				class="text-muted-foreground max-w-sm text-sm leading-relaxed md:text-right"
			>
				Nomox is designed to give you catalog intelligence without requiring broad access to your data.
			</p>
		</div>

		<!-- Asymmetric bento grid -->
		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">

			<!-- Feature card: spans 2 cols, full-height -->
			<div
				data-fade-up="pending"
				use:fadeUp
				class="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-xl border border-border bg-background p-8 flex flex-col"
			>
				<div class="flex items-start justify-between">
					<div class="flex items-center gap-2.5">
						<div class="inline-flex size-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/5">
							<ScanIcon class="text-primary size-4" />
						</div>
						<span class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Featured</span>
					</div>
					<span class="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900">
						Default
					</span>
				</div>

				<p class="text-foreground text-xl md:text-2xl font-semibold tracking-tight mt-6">
					Schema-only by default
				</p>
				<p class="text-muted-foreground mt-3 text-sm leading-relaxed max-w-md">
					Nomox reads table and column structure - not your row data. We never touch customer records, PII, or business values unless you explicitly opt in.
				</p>

				<!-- Visual: schema (visible) vs row data (redacted as blocks) -->
				<div class="mt-8 rounded-lg border border-border bg-background overflow-hidden">
					<!-- Header bar with two-zone legend -->
					<div class="flex items-stretch border-b border-border">
						<div class="flex items-center gap-2 px-4 py-2 flex-1 border-r border-border">
							<span class="size-1.5 rounded-full bg-primary"></span>
							<span class="font-mono text-[10px] uppercase tracking-widest text-foreground/70">Schema · we read</span>
						</div>
						<div class="flex items-center gap-2 px-4 py-2 flex-1 bg-muted/30">
							<svg viewBox="0 0 12 12" class="size-3 text-muted-foreground" fill="none" stroke="currentColor" stroke-width="1.5">
								<rect x="2.5" y="5" width="7" height="5" rx="0.5" />
								<path d="M4 5 V3.5 a2 2 0 0 1 4 0 V5" />
							</svg>
							<span class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Row data · stays private</span>
						</div>
					</div>

					<!-- Rows: column name + type on left, redacted block on right -->
					{#each [
						{ name: 'id',          type: 'bigint',       w: 30 },
						{ name: 'email',       type: 'varchar(255)', w: 78 },
						{ name: 'created_at',  type: 'timestamp',    w: 52 },
						{ name: 'plan',        type: 'enum',         w: 38 },
					] as row, i}
						<div class="flex items-stretch border-t border-border first:border-t-0">
							<!-- Left: column name + type, fully visible -->
							<div class="flex items-center gap-3 px-4 py-2.5 flex-1 border-r border-border min-w-0">
								<span class="font-mono text-[11px] text-foreground truncate">{row.name}</span>
								<span class="font-mono text-[10px] text-muted-foreground">{row.type}</span>
							</div>

							<!-- Right: redacted value as solid block -->
							<div class="flex items-center px-4 py-2.5 flex-1 bg-muted/30">
								<span class="redact-block" style="width:{row.w}%;" aria-label="redacted"></span>
							</div>
						</div>
					{/each}
				</div>

				<!-- Scattered pixels in corner -->
				<div class="security-pixels" aria-hidden="true">
					{#each Array(16) as _, idx}
						<span
							class="security-pixel"
							style="left:{(idx % 4) * 18}px; top:{Math.floor(idx / 4) * 18}px; opacity:{0.18 + ((idx * 17) % 5) * 0.06};"
						></span>
					{/each}
				</div>
			</div>

			<!-- Small cards -->
			{#each small as item, i}
				<div
					data-fade-up="pending"
					use:fadeUp={{ delay: i * 50 }}
					class="relative overflow-hidden rounded-xl border border-border bg-background p-6 flex flex-col gap-3"
				>
					<div class="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-muted/30">
						<item.Icon class="text-primary size-4 shrink-0" />
					</div>
					<p class="text-foreground text-sm font-semibold">{item.title}</p>
					<p class="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
				</div>
			{/each}

		</div>
	</div>
</section>

<style>
	.security-pixels {
		position: absolute;
		right: 28px;
		bottom: 28px;
		width: 72px;
		height: 72px;
		pointer-events: none;
	}
	.security-pixel {
		position: absolute;
		width: 3px;
		height: 3px;
		background: #2d2df6;
		border-radius: 1px;
	}

	/* Redacted data — a solid block representing a value Nomox never sees.
	   Diagonal hatching drawn as an SVG tile (no gradients). */
	.redact-block {
		display: inline-block;
		height: 10px;
		border-radius: 2px;
		background-color: #c9c9d4;
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='6' height='6'><path d='M-1 7 L 7 -1 M-1 1 L 1 -1 M 5 7 L 7 5' stroke='rgba(0,0,0,0.10)' stroke-width='1.2'/></svg>");
		background-size: 6px 6px;
		max-width: 100%;
	}
</style>
