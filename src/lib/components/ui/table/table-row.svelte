<script lang="ts">
	import { cn } from "$lib/utils.js";
	let { class: className, children, ...restProps }: { class?: string; children?: import("svelte").Snippet } = $props();
</script>

<tr
	class={cn(
		"border-border hover:bg-muted/40 data-[state=selected]:bg-muted border-b transition-colors",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</tr>
