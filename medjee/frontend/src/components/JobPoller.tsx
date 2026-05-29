import type {
  JobStatus,
} from "../types/job";


type JobPollerProps = {
  jobStatus: JobStatus | null;
};


// Display processing job progress
export default function JobPoller({
  jobStatus,
}: JobPollerProps) {

  if (!jobStatus) {
    return null;
  }


  return (
    <div
      style={{
        marginTop: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
      }}
    >

      <h3>
        Processing Status
      </h3>


      <p>
        Status:
        {" "}
        <strong>
          {jobStatus.status}
        </strong>
      </p>


      {jobStatus.progress && (
        <p>
          Progress:
          {" "}
          {jobStatus.progress}
        </p>
      )}


      {jobStatus.status ===
        "complete" && (
        <p>
          Questions Stored:
          {" "}
          {
            jobStatus.questions_stored
          }
        </p>
      )}


      {jobStatus.status ===
        "failed" && (
        <p
          style={{
            color: "red",
          }}
        >
          Processing Failed
        </p>
      )}

    </div>
  );
}