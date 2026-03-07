<script lang="ts">
	import { page } from "$app/stores";
	import { chatState } from "$lib/stores/chat.svelte.js";
	import ChatMessage from "./chat-message.svelte";
	import { Button } from "$lib/components/ui/button/index.js";
	import MessageCircleIcon from "@lucide/svelte/icons/message-circle";
	import XIcon from "@lucide/svelte/icons/x";
	import SendIcon from "@lucide/svelte/icons/send";
	import LoaderIcon from "@lucide/svelte/icons/loader";
	import { tick } from "svelte";

	let inputValue = $state("");
	let messagesContainer: HTMLDivElement | null = $state(null);

	async function scrollToBottom() {
		await tick();
		if (messagesContainer) {
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}
	}

	$effect(() => {
		if (chatState.messages.length > 0) {
			scrollToBottom();
		}
	});

	async function handleSend() {
		const content = inputValue.trim();
		if (!content || chatState.isLoading) return;
		inputValue = "";
		await chatState.sendMessage(content, $page.url.pathname);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	}
</script>

<!-- Floating chat bubble button -->
{#if !chatState.isOpen}
	<Button
		variant="default"
		size="icon-lg"
		class="fixed bottom-6 right-6 z-50 rounded-full shadow-lg"
		onclick={() => chatState.toggle()}
	>
		<MessageCircleIcon class="size-5" />
	</Button>
{/if}

<!-- Chat panel -->
{#if chatState.isOpen}
	<div
		class="bg-card border-border fixed bottom-6 right-6 z-50 flex h-[32rem] w-96 flex-col rounded-lg border shadow-xl"
	>
		<!-- Header -->
		<div class="border-border flex shrink-0 items-center justify-between border-b px-4 py-3">
			<div class="flex items-center gap-2">
				<MessageCircleIcon class="text-primary size-4" />
				<h3 class="text-sm font-semibold">Nomox Assistant</h3>
			</div>
			<Button variant="ghost" size="icon-sm" onclick={() => chatState.toggle()}>
				<XIcon class="size-4" />
			</Button>
		</div>

		<!-- Messages -->
		<div bind:this={messagesContainer} class="flex-1 overflow-y-auto px-4 py-3">
			{#if chatState.messages.length === 0}
				<div class="text-muted-foreground flex h-full items-center justify-center text-center text-sm">
					<p>
						Hi! I'm the Nomox Assistant.<br />
						Ask me to navigate, sort, filter, or guide you through the app.
					</p>
				</div>
			{:else}
				{#each chatState.messages as message (message.id)}
					<ChatMessage {message} />
				{/each}
			{/if}

			{#if chatState.isLoading}
				<div class="mb-3 flex justify-start">
					<div class="bg-muted rounded-lg px-3 py-2">
						<LoaderIcon class="text-muted-foreground size-4 animate-spin" />
					</div>
				</div>
			{/if}
		</div>

		<!-- Input -->
		<div class="border-border flex shrink-0 items-center gap-2 border-t px-4 py-3">
			<input
				type="text"
				bind:value={inputValue}
				onkeydown={handleKeydown}
				placeholder="Ask me anything..."
				disabled={chatState.isLoading}
				class="bg-background border-border text-foreground placeholder:text-muted-foreground flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
			/>
			<Button
				variant="default"
				size="icon-sm"
				onclick={handleSend}
				disabled={chatState.isLoading || !inputValue.trim()}
			>
				<SendIcon class="size-4" />
			</Button>
		</div>
	</div>
{/if}
