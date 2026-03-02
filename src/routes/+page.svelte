<script lang="ts">
	import logo from '$lib/assets/logo.svg';
</script>

<div class="bg-background flex min-h-screen flex-col items-center justify-center gap-8 px-4">
	<div class="flex flex-col items-center gap-4">
		<img src={logo} alt="nomox" class="size-16 rounded-2xl" />
		<div class="text-center">
			<h1 class="text-foreground text-3xl font-semibold tracking-tight">nomox</h1>
			<p class="text-muted-foreground mt-1 text-sm">Semantic data catalog</p>
		</div>
	</div>

	<a
		href="/login"
		class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-5 py-2 text-sm font-medium transition-colors"
	>
		Go to admin console
	</a>
</div>
