import { http } from "./client.js";
import type { AnyConnectorModel, ConnectorConfigModel, ListConnectorConfigsResponse } from "$lib/types/connector.js";

// ─── List ─────────────────────────────────────────────────────────────────────

export async function listConnectorIds(): Promise<string[]> {
  const res = await http.get<ListConnectorConfigsResponse>("/admin/config/list_connectors");
  return res.connector_ids;
}

// ─── Get ──────────────────────────────────────────────────────────────────────

export async function getConnector(connectorId: string): Promise<ConnectorConfigModel> {
  return http.get<ConnectorConfigModel>(`/admin/config/connector/${connectorId}`);
}

// ─── Create ───────────────────────────────────────────────────────────────────

export async function createConnector(connector: AnyConnectorModel): Promise<void> {
  return http.post<void>("/admin/config/connector", { connector });
}

// ─── Update ───────────────────────────────────────────────────────────────────

export async function updateConnector(
  connectorId: string,
  connector: AnyConnectorModel
): Promise<void> {
  return http.put<void>(`/admin/config/connector/${connectorId}`, { connector });
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function deleteConnector(connectorId: string): Promise<void> {
  return http.delete(`/admin/config/connector/${connectorId}`);
}
