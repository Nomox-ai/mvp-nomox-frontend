import { http } from "./client.js";

export interface QueryResult {
  columns: string[];
  rows: unknown[][];
  tables_referenced: string[];
}

export async function executeQuery(sql: string): Promise<QueryResult> {
  const res = await http.post<{ results: QueryResult[] }>("/data/query", { query: sql });
  return res.results[0];
}
