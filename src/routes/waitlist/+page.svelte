<script lang="ts">
	import WaitlistForm from '$lib/components/waitlist-form.svelte';
	import PublicNav from '$lib/components/public-nav.svelte';
	import PublicFooter from '$lib/components/public-footer.svelte';
</script>

<div class="bg-background text-foreground flex min-h-screen flex-col">

	<PublicNav />

	<!-- Content -->
	<main class="border-border flex flex-1 items-center border-b">
		<div class="mx-auto grid w-full max-w-section grid-cols-1 md:grid-cols-2 md:divide-x self-stretch">

			<!-- Left: context -->
			<div class="border-border flex flex-col justify-center border-b px-8 py-14 md:border-b-0">
				<p class="text-muted-foreground mb-4 font-mono text-xs">Early access</p>
				<h1 class="text-foreground text-3xl font-semibold tracking-tight leading-tight">
					Request Demo
				</h1>
				<p class="text-muted-foreground mt-4 max-w-xs text-sm leading-relaxed">
					We're launching soon. Leave your email and we'll reach out when we do.
				</p>

				<div class="mt-10 grid gap-5">
					{#each [
						{ num: '01', text: 'Free during early access.' },
						{ num: '02', text: 'Works with PostgreSQL, MongoDB, Trino and more.' },
						{ num: '03', text: 'MCP-ready for Claude, Cursor and any compatible AI client.' },
					] as item}
						<div class="flex items-start gap-3">
							<span class="text-muted-foreground mt-0.5 font-mono text-xs">{item.num}</span>
							<p class="text-muted-foreground text-sm">{item.text}</p>
						</div>
					{/each}
				</div>
			</div>

			<!-- Right: form -->
			<div class="flex flex-col justify-center px-8 py-14">
				<p class="text-muted-foreground mb-6 font-mono text-xs">Request access</p>
				<WaitlistForm />
				<p class="text-muted-foreground mt-4 text-xs leading-relaxed">
					By submitting you agree to our
					<a href="/privacy" class="underline underline-offset-2 hover:text-foreground transition-colors">Privacy Policy</a>.
					No spam. Unsubscribe any time.
				</p>
			</div>

		</div>
	</main>

	<PublicFooter />

</div>
