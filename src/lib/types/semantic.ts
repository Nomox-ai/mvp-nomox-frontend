// ─── Type Aliases ────────────────────────────────────────────────────────────

export type FullyQualifiedName = string;
export type ColumnId = string;
export type TableId = string;
export type SourceId = string;
export type EntityId = string;
export type SqlExpression = string;
export type JsonPath = string;

// ─── Base Models ─────────────────────────────────────────────────────────────

export interface NamedModel {
  id: string;
  name: string;
  description: string;
}

// ─── Enums: Columns ──────────────────────────────────────────────────────────

export enum SemanticCategory {
  IDENTIFIER = "IDENTIFIER",
  TIMESTAMP = "TIMESTAMP",
  CURRENCY = "CURRENCY",
  QUANTITY = "QUANTITY",
  PERCENTAGE = "PERCENTAGE",
  CATEGORICAL = "CATEGORICAL",
  TEXT = "TEXT",
  BOOLEAN = "BOOLEAN",
  GEOSPATIAL = "GEOSPATIAL",
  JSON = "JSON",
  BINARY = "BINARY",
  UNKNOWN = "UNKNOWN",
}

export enum SemanticTypeInference {
  COLUMN_NAME = "COLUMN_NAME",
  DATA_PATTERN = "DATA_PATTERN",
  VALUE_DISTRIBUTION = "VALUE_DISTRIBUTION",
  FOREIGN_KEY = "FOREIGN_KEY",
  EXPERT_OVERRIDE = "EXPERT_OVERRIDE",
}

export enum ReferenceType {
  FOREIGN_KEY = "FOREIGN_KEY",
  INFERRED = "INFERRED",
  SOFT_REFERENCE = "SOFT_REFERENCE",
}

// ─── Column Models ────────────────────────────────────────────────────────────

export interface SemanticType {
  category: SemanticCategory;
  subtype: string | null;
  inferred_from: SemanticTypeInference;
  /** 0.0–1.0 */
  confidence: number;
}

export interface AllowedValue {
  value: string;
  description: string;
  /** 0.0–1.0 */
  frequency: number;
  is_active: boolean;
}

export interface ColumnReference {
  target_table_id: TableId;
  target_column_id: ColumnId;
  relationship_type: ReferenceType;
  /** 0.0–1.0 */
  confidence: number;
}

export interface ValueFrequency {
  value: string;
  count: number;
  /** 0.0–100.0 */
  percentage: number;
}

export interface ColumnProfiling {
  distinct_count: number | null;
  null_count: number | null;
  null_percentage: number | null;
  min_value: string | null;
  max_value: string | null;
  avg_value: number | null;
  median_value: number | null;
  std_dev: number | null;
  most_common_values: ValueFrequency[];
  value_pattern: string | null;
  profiled_at: string | null;
}

export interface SampleValue {
  value: string;
  is_shuffled: boolean;
  context: string;
}

export interface Column extends NamedModel {
  ordinal_position: number;
  data_type: string;
  is_nullable: boolean;
  default_value: string | null;
  semantic_type: SemanticType;
  business_meaning: string;
  is_primary_key: boolean;
  is_partition_key: boolean;
  is_clustering_key: boolean;
  is_categorical: boolean;
  allowed_values: AllowedValue[];
  unit: string | null;
  precision_notes: string;
  is_foreign_key: boolean;
  references: ColumnReference | null;
  is_derived: boolean;
  derivation_logic: string;
  profiling: ColumnProfiling | null;
  sample_values: SampleValue[];
  common_filters: string[];
  is_sensitive: boolean;
}

// ─── Enums: Confidence ───────────────────────────────────────────────────────

export enum ConfidenceObjectType {
  TABLE = "TABLE",
  COLUMN = "COLUMN",
  RELATIONSHIP = "RELATIONSHIP",
  ENTITY = "ENTITY",
  ATTRIBUTE = "ATTRIBUTE",
  SOURCE = "SOURCE",
}

// ─── Confidence Models ────────────────────────────────────────────────────────

export interface LowConfidenceItem {
  object_type: ConfidenceObjectType;
  object_id: string;
  object_name: string;
  /** 0.0–1.0 */
  score: number;
  reason: string;
  suggested_clarification: string;
}

export interface ConfidenceScore {
  /** 0.0–1.0 */
  overall: number;
  schema_understanding: number | null;
  semantic_typing: number | null;
  relationship_detection: number | null;
  description_quality: number | null;
  /** default 0.7 */
  threshold: number;
  low_confidence_items: LowConfidenceItem[];
}

// ─── Enums: Entities ─────────────────────────────────────────────────────────

export enum ManifestationRole {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
  DERIVED = "DERIVED",
}

export enum ResolutionStrategy {
  PREFER_PRIMARY = "PREFER_PRIMARY",
  MOST_RECENT = "MOST_RECENT",
  COALESCE = "COALESCE",
  CUSTOM = "CUSTOM",
}

export enum EntityStatus {
  DRAFT = "DRAFT",
  STAGING = "STAGING",
  CONFIRMED = "CONFIRMED",
  DEPRECATED = "DEPRECATED",
}

// ─── Entity Models ────────────────────────────────────────────────────────────

export interface AttributeSource {
  source_id: SourceId;
  table_id: TableId;
  column_id: ColumnId;
  fully_qualified_column: string;
  transformation: SqlExpression | null;
  priority: number;
  freshness: string;
}

export interface UnifiedAttribute extends NamedModel {
  semantic_type: SemanticType;
  sources: AttributeSource[];
  resolution_strategy: ResolutionStrategy;
  resolution_expression: SqlExpression | null;
  /** 0.0–1.0 */
  confidence: number;
}

export interface EntityManifestation {
  source_id: SourceId;
  table_id: TableId;
  fully_qualified_name: FullyQualifiedName;
  role: ManifestationRole;
  key_column_id: ColumnId;
  key_transformation: SqlExpression | null;
  freshness_notes: string;
  usage_guidance: string;
  /** 0.0–1.0 */
  confidence: number;
}

export interface SemanticEntity extends NamedModel {
  business_context: string;
  domain: string;
  canonical_id_name: string;
  canonical_id_format: string;
  canonical_id_description: string;
  manifestations: EntityManifestation[];
  unified_attributes: UnifiedAttribute[];
  cross_source_join_hint: string;
  /** 0.0–1.0 */
  cross_source_confidence: number;
  active_filter: SqlExpression | null;
  status: EntityStatus;
  common_queries: string[];
}

// ─── Enums: Entity Relationships ─────────────────────────────────────────────

export enum Cardinality {
  ONE_TO_ONE = "ONE_TO_ONE",
  ONE_TO_MANY = "ONE_TO_MANY",
  MANY_TO_MANY = "MANY_TO_MANY",
}

export enum JoinType {
  INNER = "INNER",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  FULL = "FULL",
}

// ─── Entity Relationship Models ───────────────────────────────────────────────

export interface JoinStep {
  from_table: FullyQualifiedName;
  from_column: string;
  to_table: FullyQualifiedName;
  to_column: string;
  join_type: JoinType;
  additional_conditions: SqlExpression | null;
}

export interface JoinPath extends NamedModel {
  steps: JoinStep[];
  use_when: string;
  performance_notes: string;
  freshness: string;
}

export interface EntityRelationship extends NamedModel {
  from_entity_id: EntityId;
  to_entity_id: EntityId;
  cardinality: Cardinality;
  join_paths: JoinPath[];
  recommended_path_id: string | null;
  path_selection_guidance: string;
  /** 0.0–1.0 */
  confidence: number;
}

// ─── Enums: Glossary ─────────────────────────────────────────────────────────

export enum GlossaryScope {
  GLOBAL = "GLOBAL",
  DOMAIN = "DOMAIN",
  SOURCE = "SOURCE",
}

export enum GlossaryCreator {
  LEVEL_1_AGENT = "LEVEL_1_AGENT",
  LEVEL_2_AGENT = "LEVEL_2_AGENT",
  EXPERT = "EXPERT",
}

// ─── Glossary Models ──────────────────────────────────────────────────────────

export interface GlossaryTerm extends NamedModel {
  term: string;
  definition: string;
  scope: GlossaryScope;
  domain: string | null;
  source_id: SourceId | null;
  related_entities: EntityId[];
  related_columns: ColumnId[];
  synonyms: string[];
  related_terms: string[];
  abbreviation: string | null;
  created_by: GlossaryCreator;
  /** 0.0–1.0 */
  confidence: number;
}

// ─── Enums: Indexing ─────────────────────────────────────────────────────────

export enum IndexingStatus {
  INDEXING = "INDEXING",
  PARTIAL = "PARTIAL",
  COMPLETE = "COMPLETE",
  STALE = "STALE",
}

export enum ReindexJobType {
  FULL = "FULL",
  INCREMENTAL = "INCREMENTAL",
  SOURCE_UPDATE = "SOURCE_UPDATE",
  EXPERT_FEEDBACK = "EXPERT_FEEDBACK",
  CASCADE = "CASCADE",
}

export enum ReindexJobStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum ReindexTriggerType {
  INITIAL_INDEX = "INITIAL_INDEX",
  SCHEMA_CHANGE = "SCHEMA_CHANGE",
  NEW_TABLE = "NEW_TABLE",
  EXPERT_OVERRIDE = "EXPERT_OVERRIDE",
  DEPENDENCY_CASCADE = "DEPENDENCY_CASCADE",
  MANUAL = "MANUAL",
  SCHEDULED = "SCHEDULED",
}

// ─── Indexing Models ──────────────────────────────────────────────────────────

export interface ReindexTrigger {
  type: ReindexTriggerType;
  source_id: SourceId | null;
  changed_objects: string[];
  expert_feedback_id: string | null;
}

export interface ReindexJob {
  id: string;
  job_type: ReindexJobType;
  status: ReindexJobStatus;
  triggered_by: ReindexTrigger;
  target_source_ids: SourceId[];
  cascade_to_source_ids: SourceId[];
  /** 1 or 2 */
  level: number;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
  error: string | null;
  retry_count: number;
  max_retries: number;
}

export interface IndexingState {
  overall_status: IndexingStatus;
  last_full_index_at: string | null;
  last_incremental_index_at: string | null;
  pending_reindex_jobs: ReindexJob[];
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export interface ModelMetadata {
  id: string;
  /** semantic version e.g. "1.0.0" */
  version: string;
  organization_id: string;
  created_at: string;
  updated_at: string;
  /** default "1.0.0" */
  schema_version: string;
}

// ─── Enums: Overrides ────────────────────────────────────────────────────────

export enum OverrideStatus {
  ACTIVE = "ACTIVE",
  SUPERSEDED = "SUPERSEDED",
  REVERTED = "REVERTED",
}

export enum ReindexScope {
  THIS_OBJECT = "THIS_OBJECT",
  THIS_SOURCE = "THIS_SOURCE",
  DEPENDENT_SOURCES = "DEPENDENT_SOURCES",
  FULL = "FULL",
}

export enum FeedbackType {
  CORRECTION = "CORRECTION",
  CLARIFICATION = "CLARIFICATION",
  ENHANCEMENT = "ENHANCEMENT",
  APPROVAL = "APPROVAL",
}

export enum FeedbackPriority {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export enum FeedbackAssessment {
  APPROVED = "APPROVED",
  NEEDS_WORK = "NEEDS_WORK",
  REJECTED = "REJECTED",
}

// ─── Override Models ──────────────────────────────────────────────────────────

export interface ExpertOverride {
  id: string;
  created_at: string;
  created_by: string;
  object_type: ConfidenceObjectType;
  object_id: string;
  field_path: JsonPath;
  original_value: unknown;
  override_value: unknown;
  reason: string;
  additional_context: string;
  should_trigger_reindex: boolean;
  reindex_scope: ReindexScope;
  status: OverrideStatus;
  superseded_by: string | null;
}

export interface FeedbackItem {
  object_type: ConfidenceObjectType;
  object_id: string;
  feedback_type: FeedbackType;
  field_path: JsonPath;
  current_value: unknown;
  suggested_value: unknown;
  explanation: string;
  priority: FeedbackPriority;
}

export interface ExpertFeedback {
  id: string;
  source_id: SourceId;
  created_at: string;
  expert_id: string;
  items: FeedbackItem[];
  overall_assessment: FeedbackAssessment;
  general_notes: string;
  processed: boolean;
  reindex_job_id: string | null;
  processed_at: string | null;
}

// ─── Enums: Internal Relationships ───────────────────────────────────────────

export enum RelationshipType {
  ONE_TO_ONE = "ONE_TO_ONE",
  ONE_TO_MANY = "ONE_TO_MANY",
  MANY_TO_MANY = "MANY_TO_MANY",
}

export enum DetectionMethod {
  DECLARED_FK = "DECLARED_FK",
  NAMING_CONVENTION = "NAMING_CONVENTION",
  VALUE_OVERLAP = "VALUE_OVERLAP",
  EXPERT_DEFINED = "EXPERT_DEFINED",
}

export enum JoinHint {
  INNER = "INNER",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  FULL = "FULL",
}

// ─── Internal Relationship Models ─────────────────────────────────────────────

export interface InternalRelationship extends NamedModel {
  from_table_id: TableId;
  from_column_id: ColumnId;
  to_table_id: TableId;
  to_column_id: ColumnId;
  relationship_type: RelationshipType;
  detection_method: DetectionMethod;
  join_hint: JoinHint;
  cardinality_notes: string;
  /** 0.0–1.0 */
  confidence: number;
}

// ─── Enums: Sources ───────────────────────────────────────────────────────────

export enum SourceType {
  TRANSACTIONAL = "TRANSACTIONAL",
  ANALYTICAL = "ANALYTICAL",
  OPERATIONAL = "OPERATIONAL",
  EXTERNAL = "EXTERNAL",
  STAGING = "STAGING",
  DERIVED = "DERIVED",
}

export enum SourceState {
  DISCOVERED = "DISCOVERED",
  INDEXING = "INDEXING",
  STAGING = "STAGING",
  CONFIRMED = "CONFIRMED",
  DEPRECATED = "DEPRECATED",
  ERROR = "ERROR",
}

// ─── Source Models ────────────────────────────────────────────────────────────

export interface SourceStatus {
  state: SourceState;
  state_reason: string;
  last_indexed_at: string | null;
  pending_expert_review: boolean;
}

export interface ConnectionInfo {
  connector_type: string;
  update_frequency: string;
  typical_latency: string;
}

export interface ProfilingMetadata {
  last_profiled_at: string | null;
  row_counts_available: boolean;
  sampling_enabled: boolean;
  sample_size: number | null;
  shuffled_copy_available: boolean;
}

export interface SourceDependency {
  depends_on_source_id: SourceId;
  linking_objects: string[];
  notes: string;
}

export interface DataSource extends NamedModel {
  trino_catalog: string;
  trino_schema: string;
  fully_qualified_prefix: string;
  source_type: SourceType;
  business_context: string;
  owner_team: string;
  owner_contact: string;
  domain: string;
  connection_info: ConnectionInfo | null;
  confidence: ConfidenceScore | null;
  status: SourceStatus;
  tables: Table[];
  internal_relationships: InternalRelationship[];
  profiling: ProfilingMetadata;
  dependencies: SourceDependency[];
}

// ─── Enums: Tables ────────────────────────────────────────────────────────────

export enum TableType {
  TABLE = "TABLE",
  VIEW = "VIEW",
  MATERIALIZED_VIEW = "MATERIALIZED_VIEW",
  EXTERNAL_TABLE = "EXTERNAL_TABLE",
}

export enum SemanticRole {
  FACT = "FACT",
  DIMENSION = "DIMENSION",
  BRIDGE = "BRIDGE",
  STAGING = "STAGING",
  AGGREGATE = "AGGREGATE",
  SNAPSHOT = "SNAPSHOT",
  LOG = "LOG",
  LOOKUP = "LOOKUP",
  UNKNOWN = "UNKNOWN",
}

export enum TemporalGrain {
  EVENT = "EVENT",
  SNAPSHOT = "SNAPSHOT",
  SLOWLY_CHANGING = "SLOWLY_CHANGING",
  ACCUMULATING = "ACCUMULATING",
  STATIC = "STATIC",
}

// ─── Table Models ─────────────────────────────────────────────────────────────

export interface TemporalInfo {
  grain: TemporalGrain;
  primary_timestamp_column: ColumnId | null;
  event_time_column: ColumnId | null;
  ingestion_time_column: ColumnId | null;
  valid_from_column: ColumnId | null;
  valid_to_column: ColumnId | null;
  timezone: string;
  partition_column: ColumnId | null;
}

export interface PrimaryKey {
  columns: ColumnId[];
  is_composite: boolean;
  is_surrogate: boolean;
  /** 0.0–1.0 */
  confidence: number;
}

export interface TableProfiling {
  row_count: number | null;
  row_count_as_of: string | null;
  size_bytes: number | null;
  partition_count: number | null;
  last_modified_at: string | null;
  is_empty: boolean;
}

export interface Table extends NamedModel {
  fully_qualified_name: FullyQualifiedName;
  table_type: TableType;
  semantic_role: SemanticRole;
  business_purpose: string;
  usage_notes: string;
  caveats: string[];
  temporal_info: TemporalInfo;
  columns: Column[];
  primary_key: PrimaryKey | null;
  profiling: TableProfiling | null;
  common_queries: string[];
}

// ─── Semantic Model ───────────────────────────────────────────────────────────

export interface SemanticModel {
  metadata: ModelMetadata;
  sources: DataSource[];
  entities: SemanticEntity[];
  entity_relationships: EntityRelationship[];
  glossary: GlossaryTerm[];
  overrides: ExpertOverride[];
  indexing_state: IndexingState;
}

// ─── API View Types ───────────────────────────────────────────────────────────

export interface ModelView {
  model: SemanticModel;
}

export interface SourceView {
  source: DataSource;
  entities: SemanticEntity[];
  entity_relationships: EntityRelationship[];
  glossary: GlossaryTerm[];
  overrides: ExpertOverride[];
}

export interface TableView {
  table: Table;
  internal_relationships: InternalRelationship[];
  entities: SemanticEntity[];
  entity_relationships: EntityRelationship[];
  glossary: GlossaryTerm[];
  overrides: ExpertOverride[];
}

export interface ColumnView {
  column: Column;
  entities: SemanticEntity[];
  glossary: GlossaryTerm[];
  overrides: ExpertOverride[];
}