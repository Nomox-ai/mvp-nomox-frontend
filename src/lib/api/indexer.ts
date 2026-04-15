/**
 * Indexer API — backed by POST /indexer/jobs and GET /indexer/jobs
 */

import { http } from "./client.js"

// ─── Types ────────────────────────────────────────────────────────────────────

export type JobStatus = "pending" | "running" | "completed" | "failed" | "waiting_for_user" | "claiming"

export interface Job {
  job_id: string
  job_type: string
  level: number
  status: JobStatus
  progress: number
  connector_id: string | null
  schema: string | null
  target_source_ids: string[]
  trigger_type: string
  created_at: string
  started_at: string | null
  completed_at: string | null
  error: string | null
  retry_count: number
  max_retries: number
}

export interface JobListResponse {
  jobs: Job[]
  total: number
}

// ─── API calls ────────────────────────────────────────────────────────────────

export async function listJobs(): Promise<Job[]> {
  const res = await http.get<JobListResponse>("/indexer/jobs")
  return res.jobs
}

export async function enqueueLevel1Job(connectorId: string): Promise<Job> {
  return http.post<Job>("/indexer/jobs", {
    job_type: "full",
    level: 1,
    connector_id: connectorId,
    trigger_type: "manual",
  })
}

export async function enqueueLevel2Job(targetSourceIds: string[]): Promise<Job> {
  return http.post<Job>("/indexer/jobs", {
    job_type: "full",
    level: 2,
    target_source_ids: targetSourceIds,
    trigger_type: "manual",
  })
}

export async function deleteJob(jobId: string): Promise<void> {
  return http.delete(`/indexer/jobs/${jobId}`)
}
