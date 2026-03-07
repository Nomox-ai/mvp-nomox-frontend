export interface ChatMessage {
	id: string;
	role: "user" | "assistant";
	content: string;
	toolCalls?: ToolCall[];
	timestamp: number;
}

export interface ToolCall {
	name: string;
	args: Record<string, unknown>;
}

export interface ChatResponse {
	response: string;
	tool_calls: ToolCall[];
}
