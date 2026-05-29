import { useState } from "react";

import UploadZone from "../components/UploadZone";
import JobPoller from "../components/JobPoller";

import { uploadPaper } from "../services/jobsApi";

import { useJobPolling } from "../hooks/useJobPolling";

import UploadProgress from "../components/UploadProgress";

import UploadSuccess from "../components/UploadSuccess";

// Upload screen page
export default function UploadPage() {

  const [jobId, setJobId] =
    useState<string | null>(null);


  const { jobStatus } =
    useJobPolling(jobId);

    const [
      uploadProgress,
      setUploadProgress,
    ] = useState(0);

    const [
        uploadedFilename,
        setUploadedFilename,
      ] = useState("");


  // Upload selected PDF
  const handleFileSelect = async (
    file: File
  ) => {

    try {

      const data =
        await uploadPaper(
          file,
          setUploadProgress
      );

      {uploadProgress > 0 && (
        <UploadProgress
          progress={uploadProgress}
        />
      )}

      console.log(data);

      setJobId(data.job_id);

    } catch (error) {

      console.error(error);

    }
  };


  return (
    <div style={{ padding: "40px" }}>

      <h1>
        Upload Page
      </h1>

      <UploadZone
        onFileSelect={
          handleFileSelect
        }
      />

      <JobPoller
        jobStatus={jobStatus}
      />

      {jobStatus?.status ===
        "complete" && (
        <UploadSuccess
          filename={
            uploadedFilename
          }
          questionsStored={
            jobStatus.questions_stored
          }
        />
      )}

    </div>
  );
}