<script lang="ts">
	import { cn } from "$lib/utils.js";
	let { class: className, children, ...restProps }: { class?: string; children?: import("svelte").Snippet } = $props();
</script>

<div class="relative w-full overflow-auto">
	<table class={cn("w-full caption-bottom text-sm", className)} {...restProps}>
		{@render children?.()}
	</table>
</div>
