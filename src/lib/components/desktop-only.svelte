<script lang="ts">
	import logo from "$lib/assets/logo.svg";

	let { children } = $props();
</script>

<div class="mobile-message">
	<div class="flex flex-col items-center text-center px-8 max-w-xs">
		<a href="/" class="flex items-center gap-2 mb-12">
			<img src={logo} alt="nomox" class="size-5" />
			<span class="text-sm font-semibold tracking-tight">nomox</span>
		</a>
		<p class="text-muted-foreground font-mono text-xs mb-4">Desktop only</p>
		<h1 class="text-foreground text-xl font-semibold tracking-tight leading-tight mb-3">
			Open on a desktop.
		</h1>
		<p class="text-muted-foreground text-sm leading-relaxed">
			This system is designed for computer use. Please open it on a desktop or laptop for the best experience.
		</p>
	</div>
</div>

<div class="desktop-content">
	{@render children()}
</div>

<style>
	.mobile-message {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100svh;
	}

	.desktop-content {
		display: none;
	}

	@media (min-width: 992px) {
		.mobile-message {
			display: none;
		}

		.desktop-content {
			display: contents;
		}
	}
</style>
