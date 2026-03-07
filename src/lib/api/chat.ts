import { http } from "./client.js";
import type { ChatMessage, ChatResponse } from "$lib/types/chat.js";

export async function sendChatMessage(
	messages: ChatMessage[],
	currentRoute: string,
): Promise<ChatResponse> {
	return http.post<ChatResponse>("/chat/message", {
		messages: messages.map((m) => ({ role: m.role, content: m.content })),
		current_route: currentRoute,
	});
}
