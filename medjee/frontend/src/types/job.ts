// Processing job status response
export type JobStatus = {
  job_id: string;

  status:
    | "pending"
    | "processing"
    | "complete"
    | "failed";

  progress?: string;

  questions_stored?: number;
};