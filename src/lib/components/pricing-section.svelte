<script lang="ts">
	import { fadeUp } from '$lib/actions/fade-up';
	import CheckIcon from '@lucide/svelte/icons/check';

	const includes = [
		'Full semantic catalog across all sources',
		'Unlimited data source connections',
		'MCP integration for AI tools',
		'BI platform access',
		'Direct access to the founding team',
		'Partner rates locked in before public launch',
	];
</script>

<section class="border-border border-b">
	<div class="mx-auto max-w-section px-8 py-20">
		<div class="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">

			<!-- Left: framing -->
			<div class="flex flex-col justify-center">
				<p
					data-fade-up="pending"
					use:fadeUp
					class="text-primary mb-4 font-mono text-xs uppercase tracking-widest"
				>
					Pricing
				</p>
				<h2
					data-fade-up="pending"
					use:fadeUp={{ delay: 60 }}
					class="text-foreground text-3xl leading-snug tracking-tight"
				>
					Priced by the value it delivers - not by seat count.
				</h2>
				<p
					data-fade-up="pending"
					use:fadeUp={{ delay: 120 }}
					class="text-muted-foreground mt-5 text-sm leading-relaxed"
				>
					We're working with early partners to understand where Nomox creates the most impact.
					Pricing is set in conversation - based on your data footprint and the outcomes that matter
					to your team.
				</p>
				<p
					data-fade-up="pending"
					use:fadeUp={{ delay: 180 }}
					class="text-muted-foreground mt-3 text-sm leading-relaxed"
				>
					Early partners get preferred rates that carry forward - before we move to public pricing.
				</p>
			</div>

			<!-- Right: early partner card -->
			<div data-fade-up="pending" use:fadeUp={{ delay: 100 }}>
				<div class="rounded-2xl border border-border bg-muted/20 p-8">
					<div class="mb-6 flex items-center justify-between">
						<div>
							<p class="text-foreground text-base font-semibold">Early partner access</p>
							<p class="text-muted-foreground mt-0.5 text-sm">Founding cohort · Limited availability</p>
						</div>
						<span class="bg-primary/8 text-primary rounded-full px-3 py-1 font-mono text-xs font-medium">
							Early access
						</span>
					</div>

					<ul class="mb-8 flex flex-col gap-3">
						{#each includes as item}
							<li class="flex items-start gap-3">
								<CheckIcon class="text-primary mt-0.5 size-3.5 shrink-0" />
								<span class="text-foreground/80 text-sm">{item}</span>
							</li>
						{/each}
					</ul>

					<a
						href="/waitlist"
						class="bg-foreground text-background hover:bg-foreground/85 block w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium transition-colors"
					>
						Talk to us about pricing
					</a>
					<p class="text-muted-foreground mt-3 text-center text-xs">
						No commitment - just a conversation.
					</p>
				</div>
			</div>

		</div>
	</div>
</section>
