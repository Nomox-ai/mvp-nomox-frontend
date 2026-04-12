<script lang="ts">
	import logo from '$lib/assets/logo.svg';
</script>

<footer class="mt-auto px-8 py-5">
	<div class="mx-auto flex max-w-section items-center justify-between">
		<div class="flex items-center gap-2">
			<img src={logo} alt="nomox" class="size-4 opacity-40" />
			<span class="text-muted-foreground text-xs">nomox</span>
		</div>
		<div class="flex items-center gap-6">
			<a href="mailto:team@get-nomox.com" class="text-muted-foreground hover:text-foreground text-xs transition-colors">team@get-nomox.com</a>
			<a href="/privacy" class="text-muted-foreground hover:text-foreground text-xs transition-colors">Privacy Policy</a>
		</div>
	</div>
</footer>
