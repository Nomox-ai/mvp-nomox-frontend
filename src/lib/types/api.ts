// ─── Enums ───────────────────────────────────────────────────────────────────

export enum JobType {
  FULL = "full",
  INCREMENTAL = "incremental",
  SOURCE_UPDATE = "source_update",
  EXPERT_FEEDBACK = "expert_feedback",
  CASCADE = "cascade",
}

export enum TriggerType {
  INITIAL_INDEX = "initial_index",
  SCHEMA_CHANGE = "schema_change",
  NEW_TABLE = "new_table",
  EXPERT_OVERRIDE = "expert_override",
  DEPENDENCY_CASCADE = "dependency_cascade",
  MANUAL = "manual",
  SCHEDULED = "scheduled",
}

export enum JobStatus {
  PENDING = "pending",
  RUNNING = "running",
  COMPLETED = "completed",
  FAILED = "failed",
}

// ─── Data Layer Responses ─────────────────────────────────────────────────────

export interface ExecuteQueryRequest {
  query: string;
  params?: Record<string, unknown>;
}

export interface ExecuteQueryResponse {
  results: Record<string, unknown>[];
}

export interface SampleRowsResponse {
  connector_id: string;
  table: string;
  rows: Record<string, unknown>[];
}

export interface SampleColumnsResponse {
  connector_id: string;
  table: string;
  column: string;
  values: Record<string, unknown>[];
}

export interface ListConnectorsResponse {
  connectors: string[];
}

export interface ListTablesResponse {
  connector_id: string;
  tables: string[];
}

export interface ColumnInfo {
  name: string;
  ordinal_position: number;
  data_type: string;
  is_nullable: boolean;
}

export interface ListColumnsResponse {
  connector_id: string;
  table_id: string;
  columns: ColumnInfo[];
}

// ─── Indexer Job Models ───────────────────────────────────────────────────────

export interface CreateJobRequest {
  job_type: JobType;
  /** 1 or 2 */
  level: number;
  /** required for level 1 */
  connector_id?: string;
  /** required for level 1 */
  schema_name?: string;
  /** required for level 2 */
  target_source_ids?: string[];
  /** default: "manual" */
  trigger_type?: TriggerType;
}

export interface UpdateJobProgressRequest {
  /** 0–100 */
  progress: number;
}

export interface UpdateJobStatusRequest {
  status: JobStatus;
  error?: string;
}

export interface JobResponse {
  job_id: string;
  job_type: string;
  level: number;
  status: string;
  progress: number;
  connector_id?: string;
  schema_name?: string;
  target_source_ids?: string[];
  trigger_type?: string;
  created_at: string;
  started_at?: string;
  completed_at?: string;
  error?: string;
  retry_count?: number;
  max_retries?: number;
}

export interface JobListResponse {
  jobs: JobResponse[];
  total: number;
}
