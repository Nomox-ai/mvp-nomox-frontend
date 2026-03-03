<script lang="ts">
	import { cn } from "$lib/utils.js";
	let { class: className, children, ...restProps }: { class?: string; children?: import("svelte").Snippet } = $props();
</script>

<th
	class={cn(
		"text-muted-foreground h-10 px-4 text-left align-middle text-xs font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</th>
