// ─── Enums ───────────────────────────────────────────────────────────────────

export enum ConnectorType {
  MONGODB = "mongodb",
  POSTGRESQL = "postgresql",
}

export enum CheckIntervalUnit {
  HOURS = "hours",
  DAYS = "days",
  WEEKS = "weeks",
  MONTHS = "months",
  YEARS = "years",
}

export enum AuthServerType {
  JWT_HS256 = "jwt_hs256",
  JWT_RS256 = "jwt_rs256",
  OAUTH2 = "oauth2",
  LDAP = "ldap",
  KERBEROS = "kerberos",
  CERTIFICATE = "certificate",
  PASSWORD_FILE = "password_file",
}

export enum CatalogManagement {
  DYNAMIC = "dynamic",
  STATIC = "static",
}

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

// ─── Connector Models ─────────────────────────────────────────────────────────

interface BaseConnectorModel {
  /** Trino catalog name-must be unique */
  connector_id: string
  connector_type: ConnectorType
  description?: string
}

export interface MongoDBConnectorModel extends BaseConnectorModel {
  connector_type: ConnectorType.MONGODB
  /** mongodb+srv://username:password@host */
  connection_url: string
  /** Restrict schema visibility to a single database */
  database?: string
  /** default: "_schema" */
  schema_collection?: string
  /** default: false */
  case_insensitive_name_matching?: boolean
}

export interface PostgreSQLConnectorModel extends BaseConnectorModel {
  connector_type: ConnectorType.POSTGRESQL
  host: string
  /** default: 5432 */
  port?: number
  database: string
  username: string
  password: string
}

export type AnyConnectorModel = MongoDBConnectorModel | PostgreSQLConnectorModel

// ─── Connector Config Models ──────────────────────────────────────────────────

export interface CheckSchedule {
  /** default: true */
  enabled?: boolean
  /** default: 1, >= 1 */
  every?: number
  /** default: "months" */
  unit?: CheckIntervalUnit
}

export interface ConnectorConfigModel {
  connector: AnyConnectorModel
  check_schedule?: CheckSchedule
}

export interface ListConnectorConfigsResponse {
  connector_ids: string[]
}

// ─── Auth Server Models ───────────────────────────────────────────────────────

interface BaseAuthServerModel {
  name: string
  auth_server_type: AuthServerType
  description?: string
  /** default: true */
  enabled?: boolean
}

export interface JWTHs256AuthServerModel extends BaseAuthServerModel {
  auth_server_type: AuthServerType.JWT_HS256
  shared_secret: string
  issuer?: string
  audience?: string
  /** default: "sub" */
  principal_field?: string
}

export interface JWTRs256AuthServerModel extends BaseAuthServerModel {
  auth_server_type: AuthServerType.JWT_RS256
  jwks_uri: string
  issuer?: string
  audience?: string
  /** default: "sub" */
  principal_field?: string
  /** seconds, default: 60 */
  jwks_refresh_interval?: number
}

export interface OAuth2AuthServerModel extends BaseAuthServerModel {
  auth_server_type: AuthServerType.OAUTH2
  issuer: string
  authorization_endpoint: string
  token_endpoint: string
  jwks_uri: string
  client_id: string
  client_secret: string
  /** default: ["openid", "email", "profile"] */
  scopes?: string[]
  /** default: "sub" */
  principal_field?: string
  groups_field?: string
  audience?: string
}

export interface LDAPAuthServerModel extends BaseAuthServerModel {
  auth_server_type: AuthServerType.LDAP
  ldap_url: string
  bind_dn?: string
  bind_password?: string
  user_base_dn: string
  /** default: "(uid={0})" */
  user_search_filter?: string
  group_base_dn?: string
  group_search_filter?: string
  ssl_trust_certificate?: string
  /** default: false */
  allow_insecure?: boolean
}

export interface KerberosAuthServerModel extends BaseAuthServerModel {
  auth_server_type: AuthServerType.KERBEROS
  /** default: "/etc/krb5.conf" */
  kerberos_config_path?: string
  keytab_path: string
  /** default: "trino" */
  service_name?: string
  principal: string
  realm: string
  kdc: string
}

export interface CertificateAuthServerModel extends BaseAuthServerModel {
  auth_server_type: AuthServerType.CERTIFICATE
  ca_cert_path: string
  /** default: "CN" */
  principal_field?: string
}

export interface PasswordFileAuthServerModel extends BaseAuthServerModel {
  auth_server_type: AuthServerType.PASSWORD_FILE
  password_file_path: string
}

export type AnyAuthServerModel =
  | JWTHs256AuthServerModel
  | JWTRs256AuthServerModel
  | OAuth2AuthServerModel
  | LDAPAuthServerModel
  | KerberosAuthServerModel
  | CertificateAuthServerModel
  | PasswordFileAuthServerModel

// ─── Trino Config Models ──────────────────────────────────────────────────────

export interface TrinoConfigModel {
  /** default: true */
  coordinator?: boolean
  /** default: true */
  node_scheduler_include_coordinator?: boolean
  /** default: 8080 */
  http_port?: number
  /** default: false */
  https_enabled?: boolean
  /** default: 8443 */
  https_port?: number
  https_keystore_path?: string
  https_keystore_key?: string
  /** default: "dynamic" */
  catalog_management?: CatalogManagement
  /** default: "1GB" */
  query_max_memory?: string
  /** default: "512MB" */
  query_max_memory_per_node?: string
  /** default: "768MB" */
  query_max_total_memory_per_node?: string
  /** default: true */
  web_ui_enabled?: boolean
  /** default: "http://localhost:8080" */
  discovery_uri?: string
  /** default: "2m" */
  shutdown_query_grace_period?: string
  /** default: "2m" */
  http_server_graceful_shutdown_timeout?: string
  /** default: "1GB" */
  memory_heap_headroom_per_node?: string
  task_max_worker_threads: number
  extra_properties?: Record<string, string>
}

export interface TrinoJvmConfigModel {
  /** default: "2G" */
  max_heap?: string
  /** default: "512m" */
  min_heap?: string
  /** default: true */
  use_g1gc?: boolean
  /** default: "32M" */
  g1_heap_region_size?: string
  /** default: true */
  use_gc_overhead_limit?: boolean
  /** default: true */
  explicit_gc_invoke_concurrent?: boolean
  /** default: true */
  heap_dump_on_oom?: boolean
  /** default: true */
  exit_on_oom?: boolean
  extra_flags?: string[]
}

export interface TrinoNodeConfigModel {
  /** default: "dev" */
  environment?: string
  /** default: "nomox-trino-node-1" */
  node_id?: string
  /** default: "/data/trino" */
  data_dir?: string
}

export interface TrinoLogConfigModel {
  /** default: "INFO" */
  root_level?: LogLevel
  component_levels?: Record<string, LogLevel>
}

export interface TrinoServerConfigModel {
  config?: TrinoConfigModel
  jvm?: TrinoJvmConfigModel
  node?: TrinoNodeConfigModel
  log?: TrinoLogConfigModel
}
