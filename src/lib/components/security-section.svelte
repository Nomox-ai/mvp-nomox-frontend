<script lang="ts">
	import { fadeUp } from '$lib/actions/fade-up';
	import ShieldIcon from '@lucide/svelte/icons/shield-check';
	import LockIcon from '@lucide/svelte/icons/lock-keyhole';
	import ServerIcon from '@lucide/svelte/icons/server';
	import ScanIcon from '@lucide/svelte/icons/scan-eye';
	import UsersIcon from '@lucide/svelte/icons/users';
	import ScrollTextIcon from '@lucide/svelte/icons/scroll-text';

	const pillars = [
		{
			Icon: ScanIcon,
			title: 'Schema-only by default',
			desc: 'Nomox reads table and column structure — not your row data. We never touch customer records, PII, or business values unless you explicitly opt in.',
		},
		{
			Icon: ShieldIcon,
			title: 'Profiling on your terms',
			desc: 'For non-sensitive sources you can enable lightweight profiling — null rates, cardinality, sample values — to improve semantic inference. Always opt-in, never automatic.',
		},
		{
			Icon: ServerIcon,
			title: 'Your infrastructure, your data',
			desc: 'Nomox connects directly to your sources from your own environment. Metadata stays in your stack — nothing is sent to external systems.',
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
			desc: 'Every catalog access, query, and configuration change is logged. Know who looked at what, and when — for compliance and internal review.',
		},
	];
</script>

<section class="border-border border-b">
	<div class="mx-auto max-w-section px-8 py-20">

		<div class="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
			<div>
				<p
					data-fade-up="pending"
					use:fadeUp
					class="text-primary mb-4 font-mono text-xs uppercase tracking-widest"
				>
					Security
				</p>
				<h2
					data-fade-up="pending"
					use:fadeUp={{ delay: 60 }}
					class="text-foreground max-w-sm text-3xl leading-snug tracking-tight"
				>
					Built for teams that take data access seriously.
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

		<div class="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
			{#each pillars as pillar, i}
				<div
					data-fade-up="pending"
					use:fadeUp={{ delay: i * 50 }}
					class="bg-background flex flex-col gap-3 p-8"
				>
					<pillar.Icon class="text-primary size-4 shrink-0" />
					<p class="text-foreground text-sm font-semibold">{pillar.title}</p>
					<p class="text-muted-foreground text-sm leading-relaxed">{pillar.desc}</p>
				</div>
			{/each}
		</div>

	</div>
</section>
