<script lang="ts">
	import { cn } from "$lib/utils.js";
	let { class: className, children, ...restProps }: { class?: string; children?: import("svelte").Snippet } = $props();
</script>

<td
	class={cn(
		"px-4 py-3 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</td>
