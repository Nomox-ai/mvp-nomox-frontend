import { http } from "./client.js"
import type { SemanticModel, SourceView } from "$lib/types/semantic.js"

// The backend mounts semantic routes at /semantic/{type}/…
// For the configured (full) model we use type="full".
const TYPE = "full"

// ─── Source state ─────────────────────────────────────────────────────────────

/**
 * Fetch semantic metadata for a single connector.
 * Returns null if the source has not been indexed yet (404) or on any error.
 */
export async function getSourceView(connectorId: string): Promise<SourceView | null> {
  try {
    return await http.get<SourceView>(`/semantic/${TYPE}/source/${connectorId}`)
  } catch {
    return null
  }
}

/**
 * Fetch the full semantic model (all sources, entities, glossary, relationships).
 * Returns null if not yet available or on any error.
 */
export async function getSemanticModel(): Promise<SemanticModel | null> {
  try {
    return await http.get<SemanticModel>(`/semantic/${TYPE}/model`)
  } catch {
    return null
  }
}
