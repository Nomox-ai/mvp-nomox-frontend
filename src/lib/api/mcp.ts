/**
 * MCP integration API — backed by GET /integrations and POST /integrations/rotate
 */

import { http } from "./client.js"

// ─── Types (mirror backend IntegrationsResponse) ──────────────────────────────

export interface IntegrationToolParam {
  name: string
  type: string
  required: boolean
  description: string
}

export interface IntegrationTool {
  name: string
  description: string
  params: IntegrationToolParam[]
}

export interface ClientConfig {
  label: string
  filename: string
  hint: string
  config_json: string
}

export interface IntegrationsData {
  server_url: string
  masked_token: string
  transport: string
  auth_header: string
  tools: IntegrationTool[]
  client_configs: ClientConfig[]
}

export interface RotateTokenResponse {
  token: string
  masked: string
}

// ─── API calls ────────────────────────────────────────────────────────────────

export async function getIntegrations(): Promise<IntegrationsData> {
  return http.get<IntegrationsData>("/integrations")
}

export async function rotateToken(): Promise<RotateTokenResponse> {
  return http.post<RotateTokenResponse>("/integrations/rotate", {})
}
