<script lang="ts">
	import PublicNav from '$lib/components/public-nav.svelte';
	import PublicFooter from '$lib/components/public-footer.svelte';
	import LandingCta from '$lib/components/landing-cta.svelte';
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

<div class="bg-background text-foreground flex min-h-screen flex-col">
	<PublicNav />

	<!-- Hero -->
	<section class="border-border border-b">
		<div class="mx-auto max-w-section px-8 py-20 md:pb-24 md:pt-32">
			<div class="mx-auto max-w-2xl text-center">
				<p
					data-fade-up="pending"
					use:fadeUp
					class="text-primary mb-5 font-mono text-xs uppercase tracking-widest"
				>
					Pricing
				</p>
				<h1
					data-fade-up="pending"
					use:fadeUp={{ delay: 60 }}
					class="text-foreground text-5xl leading-[1.1] tracking-tight"
				>
					Priced by the value it delivers.
				</h1>
				<p
					data-fade-up="pending"
					use:fadeUp={{ delay: 140 }}
					class="text-muted-foreground mx-auto mt-6 max-w-lg text-sm leading-relaxed"
				>
					We don't charge by seat count. Pricing is based on your data footprint and the
					outcomes that matter to your team - set in conversation, not on a pricing page.
				</p>
			</div>
		</div>
	</section>

	<!-- Early partner card -->
	<section class="border-border border-b">
		<div class="mx-auto max-w-section px-8 py-20">
			<div class="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">

				<!-- Left: rationale -->
				<div
					data-fade-up="pending"
					use:fadeUp
					class="flex flex-col justify-center"
				>
					<h2 class="text-foreground text-2xl font-semibold leading-snug tracking-tight">
						Why no public price list?
					</h2>
					<p class="text-muted-foreground mt-5 text-sm leading-relaxed">
						Value-based pricing means the right number depends on your situation - how many sources
						you connect, how many people benefit from the catalog, and what replacing your current
						approach actually costs you.
					</p>
					<p class="text-muted-foreground mt-3 text-sm leading-relaxed">
						We're in early access and working directly with our first partners to understand where
						Nomox creates the most impact. A short conversation is worth more than a tier table.
					</p>
					<p class="text-muted-foreground mt-3 text-sm leading-relaxed">
						Early partners get preferred rates that carry forward - before we move to public pricing.
					</p>
				</div>

				<!-- Right: card -->
				<div data-fade-up="pending" use:fadeUp={{ delay: 80 }}>
					<div class="rounded-2xl border border-border bg-muted/20 p-8">
						<div class="mb-6 flex items-start justify-between gap-4">
							<div>
								<p class="text-foreground text-base font-semibold">Early partner access</p>
								<p class="text-muted-foreground mt-0.5 text-sm">Founding cohort · Limited availability</p>
							</div>
							<span class="bg-primary/8 text-primary shrink-0 rounded-full px-3 py-1 font-mono text-xs font-medium">
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

	<LandingCta />
	<PublicFooter />
</div>
