/**
 * MCP integration API
 */

import { http } from "./client.js"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface McpStatus {
  online: boolean
  server_url: string
  transport: "sse" | "stdio"
  tool_count: number
}

export interface McpTool {
  name: string
  description: string
  params: { name: string; type: string; required: boolean; description: string }[]
}

export interface McpActivityEntry {
  id: string
  tool: string
  client_hint: string | null
  called_at: string
  duration_ms: number | null
  success: boolean
}

export interface McpToken {
  /** Always masked — never returns the raw secret */
  masked: string
  created_at: string | null
}

// ─── Internal ─────────────────────────────────────────────────────────────────

interface McpConfigResponse {
  server_url: string
  token: string
  tools: { name: string; description: string }[]
}

export interface McpConfig {
  server_url: string
  /** Raw token — use only for config snippets, never display in full */
  token: string
  masked_token: string
  status: McpStatus
  tools: McpTool[]
}

// Known tool parameter metadata (backend doesn't expose params via API)
const TOOL_PARAMS: Record<string, McpTool["params"]> = {
  get_semantic: [],
  get_samples: [
    { name: "connector_id", type: "string",  required: true,  description: "Trino catalog / connector name (e.g. postgresql_prod)" },
    { name: "table",        type: "string",  required: true,  description: "Fully qualified table name in schema.table format" },
    { name: "limit",        type: "integer", required: false, description: "Number of rows to return (1–100, default 10)" },
  ],
  run_query: [
    { name: "query", type: "string", required: true, description: "SQL query string" },
  ],
}

function maskToken(token: string): string {
  if (token.length <= 8) return "••••••••"
  return "•".repeat(token.length - 4) + token.slice(-4)
}

async function fetchMcpConfig(): Promise<McpConfigResponse> {
  return http.get<McpConfigResponse>("/admin/config/mcp")
}

// ─── Combined (single call) ───────────────────────────────────────────────────

export async function getMcpConfig(): Promise<McpConfig> {
  const raw = await fetchMcpConfig()
  return {
    server_url: raw.server_url,
    token: raw.token,
    masked_token: maskToken(raw.token),
    status: {
      online: true,
      server_url: raw.server_url,
      transport: "sse",
      tool_count: raw.tools.length,
    },
    tools: raw.tools.map((t) => ({
      name: t.name,
      description: t.description,
      params: TOOL_PARAMS[t.name] ?? [],
    })),
  }
}

// ─── Status ───────────────────────────────────────────────────────────────────

export async function getMcpStatus(): Promise<McpStatus> {
  try {
    const config = await fetchMcpConfig()
    return {
      online: true,
      server_url: config.server_url,
      transport: "sse",
      tool_count: config.tools.length,
    }
  } catch {
    return {
      online: false,
      server_url: "",
      transport: "sse",
      tool_count: 0,
    }
  }
}

// ─── Token ────────────────────────────────────────────────────────────────────

export async function getMcpToken(): Promise<McpToken> {
  const config = await fetchMcpConfig()
  return {
    masked: maskToken(config.token),
    created_at: null,
  }
}

/**
 * Rotates the MCP API token and returns the new value unmasked (once).
 * TODO: POST /admin/config/mcp/token/rotate — not yet implemented in backend
 */
export async function rotateMcpToken(): Promise<{ token: string }> {
  const fake = "nmx_" + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
  return { token: fake }
}

// ─── Tools ────────────────────────────────────────────────────────────────────

export async function getMcpTools(): Promise<McpTool[]> {
  const config = await fetchMcpConfig()
  return config.tools.map((t) => ({
    name: t.name,
    description: t.description,
    params: TOOL_PARAMS[t.name] ?? [],
  }))
}

// ─── Activity ─────────────────────────────────────────────────────────────────

/**
 * Returns recent MCP tool-call activity.
 * TODO: GET /admin/mcp/activity?limit=N — not yet implemented in backend
 */
export async function getMcpActivity(limit = 20): Promise<McpActivityEntry[]> {
  const tools = ["get_semantic", "get_samples", "run_query"]
  const clients = ["Claude Desktop", "Cursor", null]
  const now = Date.now()
  return Array.from({ length: Math.min(limit, 8) }, (_, i) => ({
    id: `fake-${i}`,
    tool: tools[i % tools.length],
    client_hint: clients[i % clients.length],
    called_at: new Date(now - i * 4 * 60_000).toISOString(),
    duration_ms: 80 + Math.floor(Math.random() * 400),
    success: i !== 3,
  }))
}
