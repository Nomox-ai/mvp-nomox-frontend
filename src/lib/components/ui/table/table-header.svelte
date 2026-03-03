<script lang="ts">
	import { cn } from "$lib/utils.js";
	let { class: className, children, ...restProps }: { class?: string; children?: import("svelte").Snippet } = $props();
</script>

<thead class={cn("[&_tr]:border-b", className)} {...restProps}>
	{@render children?.()}
</thead>
