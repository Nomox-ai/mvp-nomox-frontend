<script lang="ts">
	import logo from '$lib/assets/logo.svg';
	import WaitlistForm from '$lib/components/waitlist-form.svelte';
	import PublicNav from '$lib/components/public-nav.svelte';
</script>

<div class="bg-background text-foreground flex min-h-screen flex-col">

	<PublicNav />

	<!-- Content -->
	<main class="border-border flex-1 border-b">
		<div class="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 md:divide-x">

			<!-- Left: context -->
			<div class="border-border border-b px-8 py-14 md:border-b-0">
				<p class="text-muted-foreground mb-4 font-mono text-xs">Early access</p>
				<h1 class="text-foreground text-3xl font-semibold tracking-tight leading-tight">
					Join the waitlist.
				</h1>
				<p class="text-muted-foreground mt-4 max-w-xs text-sm leading-relaxed">
					We're onboarding teams selectively. Drop your email and we'll reach out when a spot opens up.
				</p>

				<div class="mt-10 grid gap-5">
					{#each [
						{ num: '01', text: 'Free during early access — no card required.' },
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
			<div class="px-8 py-14">
				<p class="text-muted-foreground mb-6 font-mono text-xs">Request access</p>
				<WaitlistForm />
				<p class="text-muted-foreground mt-4 text-xs">
					No spam. Unsubscribe any time.
				</p>
			</div>

		</div>
	</main>

	<!-- Footer -->
	<footer class="px-8 py-5">
		<div class="mx-auto flex max-w-5xl items-center justify-between">
			<div class="flex items-center gap-2">
				<img src={logo} alt="nomox" class="size-4 opacity-40" />
				<span class="text-muted-foreground text-xs">nomox</span>
			</div>
			<p class="text-muted-foreground text-xs">Semantic data intelligence</p>
		</div>
	</footer>

</div>
