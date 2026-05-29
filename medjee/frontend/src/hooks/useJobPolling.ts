import { useEffect, useState } from "react";

import { getJobStatus } from "../services/jobsApi";


// Poll backend job status continuously
export const useJobPolling = (
  jobId: string | null
) => {

  const [jobStatus, setJobStatus] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);


  useEffect(() => {

    if (!jobId) return;

    setLoading(true);

    // Fetch latest job status
    const fetchStatus = async () => {
      try {

        const data = await getJobStatus(jobId);

        setJobStatus(data);

        // Stop polling when completed
        if (
          data.status === "complete" ||
          data.status === "failed"
        ) {
          clearInterval(interval);
        }

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

    fetchStatus();

    // Poll every 2 seconds
    const interval = setInterval(
      fetchStatus,
      2000
    );

    return () => clearInterval(interval);

  }, [jobId]);

  return {
    jobStatus,
    loading,
  };
};