<script lang="ts">
	import type { ChatMessage } from "$lib/types/chat.js";
	import NavigationIcon from "@lucide/svelte/icons/navigation";
	import RefreshCwIcon from "@lucide/svelte/icons/refresh-cw";
	import FilterIcon from "@lucide/svelte/icons/filter";
	import ArrowUpDownIcon from "@lucide/svelte/icons/arrow-up-down";
	import PointerIcon from "@lucide/svelte/icons/pointer";

	let { message }: { message: ChatMessage } = $props();

	const toolIcons: Record<string, typeof NavigationIcon> = {
		go_to: NavigationIcon,
		refresh_site: RefreshCwIcon,
		filter_by: FilterIcon,
		sort_by: ArrowUpDownIcon,
		highlight_element: PointerIcon,
	};

	const toolLabels: Record<string, (args: Record<string, unknown>) => string> = {
		go_to: (args) => `Navigated to ${args.route}`,
		refresh_site: () => "Refreshed page",
		filter_by: (args) => `Filtered by ${args.field}: ${args.value}`,
		sort_by: (args) => `Sorted by ${args.field} (${args.direction})`,
		highlight_element: (args) => `Highlighted: ${args.message}`,
	};
</script>

<div class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'} mb-3">
	<div
		class="max-w-[85%] rounded-lg px-3 py-2 text-sm {message.role === 'user'
			? 'bg-primary text-primary-foreground'
			: 'bg-muted text-foreground'}"
	>
		<p class="whitespace-pre-wrap">{message.content}</p>

		{#if message.toolCalls && message.toolCalls.length > 0}
			<div class="mt-2 flex flex-wrap gap-1">
				{#each message.toolCalls as tc}
					{@const Icon = toolIcons[tc.name]}
					{@const label = toolLabels[tc.name]?.(tc.args) ?? tc.name}
					<span
						class="inline-flex items-center gap-1 rounded-md bg-background/50 px-2 py-0.5 text-xs"
					>
						{#if Icon}
							<Icon class="size-3" />
						{/if}
						{label}
					</span>
				{/each}
			</div>
		{/if}
	</div>
</div>
