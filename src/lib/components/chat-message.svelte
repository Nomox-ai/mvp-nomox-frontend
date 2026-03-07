<script lang="ts">
	import type { ChatMessage } from "$lib/types/chat.js";
	import { marked } from "marked";
	import NavigationIcon from "@lucide/svelte/icons/navigation";
	import RefreshCwIcon from "@lucide/svelte/icons/refresh-cw";
	import PointerIcon from "@lucide/svelte/icons/pointer";

	let { message }: { message: ChatMessage } = $props();

	const renderedContent = $derived(
		message.role === "assistant" ? marked.parse(message.content, { async: false }) : "",
	);

	const toolIcons: Record<string, typeof NavigationIcon> = {
		go_to: NavigationIcon,
		refresh_site: RefreshCwIcon,
		highlight_element: PointerIcon,
	};

	const toolLabels: Record<string, (args: Record<string, unknown>) => string> = {
		go_to: (args) => `Navigated to ${args.route}`,
		refresh_site: () => "Refreshed page",
		highlight_element: (args) => `Highlighted: ${args.message}`,
	};
</script>

<div class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'} mb-3">
	<div
		class="max-w-[85%] rounded-lg px-3 py-2 text-sm {message.role === 'user'
			? 'bg-primary text-primary-foreground'
			: 'bg-muted text-foreground'}"
	>
		{#if message.role === "assistant"}
			<div class="prose prose-sm dark:prose-invert max-w-none">
				{@html renderedContent}
			</div>
		{:else}
			<p class="whitespace-pre-wrap">{message.content}</p>
		{/if}

		{#if message.toolCalls && message.toolCalls.length > 0}
			<div class="mt-2 flex flex-col gap-1">
				{#each message.toolCalls as tc}
					{#if tc.name === "go_to"}
						<div class="rounded-md bg-background/50 px-2 py-1.5 text-xs">
							<div class="flex items-center gap-1 font-medium">
								<NavigationIcon class="size-3" />
								Navigation
							</div>
							<div class="mt-1 flex flex-col gap-0.5">
								{#if tc.fromRoute}
									<span>
										From: <a href={tc.fromRoute} class="text-primary underline">{tc.fromRoute}</a>
									</span>
								{/if}
								<span>
									To: <a href={tc.args.route as string} class="text-primary underline"
										>{tc.args.route}</a
									>
								</span>
							</div>
						</div>
					{:else}
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
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</div>
