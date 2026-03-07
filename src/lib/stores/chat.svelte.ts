import { goto, invalidateAll } from "$app/navigation";
import { sendChatMessage } from "$lib/api/chat.js";
import type { ChatMessage, ToolCall } from "$lib/types/chat.js";

class ChatState {
	messages = $state<ChatMessage[]>([]);
	isOpen = $state(false);
	isLoading = $state(false);
	highlightTarget = $state<{ selector: string; message: string } | null>(null);

	toggle() {
		this.isOpen = !this.isOpen;
	}

	async sendMessage(content: string, currentRoute: string) {
		const userMessage: ChatMessage = {
			id: crypto.randomUUID(),
			role: "user",
			content,
			timestamp: Date.now(),
		};
		this.messages.push(userMessage);
		this.isLoading = true;

		try {
			const response = await sendChatMessage(this.messages, currentRoute);

			const assistantMessage: ChatMessage = {
				id: crypto.randomUUID(),
				role: "assistant",
				content: response.response,
				toolCalls: response.tool_calls,
				timestamp: Date.now(),
			};
			this.messages.push(assistantMessage);

			if (response.tool_calls.length > 0) {
				this.executeToolCalls(response.tool_calls);
			}
		} catch (e) {
			const errorMessage: ChatMessage = {
				id: crypto.randomUUID(),
				role: "assistant",
				content: "Sorry, something went wrong. Please try again.",
				timestamp: Date.now(),
			};
			this.messages.push(errorMessage);
		} finally {
			this.isLoading = false;
		}
	}

	executeToolCalls(toolCalls: ToolCall[]) {
		for (const tc of toolCalls) {
			switch (tc.name) {
				case "go_to":
					goto(tc.args.route as string);
					break;
				case "refresh_site":
					invalidateAll();
					break;
				case "sort_by":
					document.dispatchEvent(
						new CustomEvent("chat:sort", { detail: tc.args }),
					);
					break;
				case "filter_by":
					document.dispatchEvent(
						new CustomEvent("chat:filter", { detail: tc.args }),
					);
					break;
				case "highlight_element":
					this.highlightTarget = {
						selector: tc.args.selector as string,
						message: tc.args.message as string,
					};
					break;
			}
		}
	}

	clearHighlight() {
		this.highlightTarget = null;
	}
}

export const chatState = new ChatState();
