/**
 * MCP integration API
 *
 * Placeholder implementations returning dummy data until the backend
 * admin endpoints are wired up. Real endpoint paths are noted in comments.
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

// ─── Status ───────────────────────────────────────────────────────────────────

/**
 * Returns live MCP server status and config.
 * TODO: GET /admin/mcp/status
 */
export async function getMcpStatus(): Promise<McpStatus> {
  // return await http.get<McpStatus>("/admin/mcp/status")
  return {
    online: true,
    server_url: `${window.location.protocol}//${window.location.hostname}:8000/mcp`,
    transport: "sse",
    tool_count: 3,
  }
}

// ─── Token ────────────────────────────────────────────────────────────────────

/**
 * Returns the current MCP API token (masked).
 * TODO: GET /admin/mcp/token
 */
export async function getMcpToken(): Promise<McpToken> {
  // return await http.get<McpToken>("/admin/mcp/token")
  return {
    masked: "••••••••••••••••••••••••change-this-mcp-token",
    created_at: null,
  }
}

/**
 * Rotates the MCP API token and returns the new value unmasked (once).
 * TODO: POST /admin/mcp/token/rotate
 */
export async function rotateMcpToken(): Promise<{ token: string }> {
  // return await http.post<{ token: string }>("/admin/mcp/token/rotate")
  const fake = "nmx_" + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
  return { token: fake }
}

// ─── Tools ────────────────────────────────────────────────────────────────────

/**
 * Returns the list of tools exposed by the MCP server.
 * TODO: GET /admin/mcp/tools  (or derive from the FastMCP registry)
 */
export async function getMcpTools(): Promise<McpTool[]> {
  // return await http.get<McpTool[]>("/admin/mcp/tools")
  return [
    {
      name: "get_semantic",
      description:
        "Return the full semantic model for all data sources — connectors, tables and columns annotated with business descriptions and semantic metadata. Use this before writing queries to understand what data is available.",
      params: [],
    },
    {
      name: "get_samples",
      description:
        "Return sample rows from a table to help understand its contents and shape.",
      params: [
        { name: "connector_id", type: "string",  required: true,  description: "Trino catalog / connector name (e.g. postgresql_prod)" },
        { name: "table",        type: "string",  required: true,  description: "Fully-qualified table name in schema.table format" },
        { name: "limit",        type: "integer", required: false, description: "Number of rows to return (1–100, default 10)" },
      ],
    },
    {
      name: "run_query",
      description:
        "Execute a read-only SQL query against the Trino data layer. Use get_semantic first to discover available tables, and get_samples to understand contents before constructing queries.",
      params: [
        { name: "query", type: "string", required: true, description: "SQL query string" },
      ],
    },
  ]
}

// ─── Activity ─────────────────────────────────────────────────────────────────

/**
 * Returns recent MCP tool-call activity.
 * TODO: GET /admin/mcp/activity?limit=N
 */
export async function getMcpActivity(limit = 20): Promise<McpActivityEntry[]> {
  // return await http.get<McpActivityEntry[]>(`/admin/mcp/activity?limit=${limit}`)
  const tools = ["get_semantic", "get_samples", "run_query"]
  const clients = ["Claude Desktop", "Cursor", null]
  const now = Date.now()
  return Array.from({ length: 8 }, (_, i) => ({
    id: `fake-${i}`,
    tool: tools[i % tools.length],
    client_hint: clients[i % clients.length],
    called_at: new Date(now - i * 4 * 60_000).toISOString(),
    duration_ms: 80 + Math.floor(Math.random() * 400),
    success: i !== 3,
  }))
}
