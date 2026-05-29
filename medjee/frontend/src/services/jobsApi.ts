import apiClient from "./apiClient";

// Upload PDF to backend
// Upload PDF with progress tracking
export const uploadPaper = async (
  file: File,
  onUploadProgress?: (
    progress: number
  ) => void
) => {

  const formData = new FormData();

  formData.append("file", file);


  const response =
    await apiClient.post(
      "/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },

        onUploadProgress: (
          progressEvent
        ) => {

          if (
            !progressEvent.total
          ) {
            return;
          }

          const progress =
            Math.round(
              (
                progressEvent.loaded /
                progressEvent.total
              ) * 100
            );

          onUploadProgress?.(
            progress
          );
        },
      }
    );

  return response.data;
};


// Fetch current processing job status
export const getJobStatus = async (
  jobId: string
) => {
  const response = await apiClient.get(
    `/job/${jobId}/status`
  );

  return response.data;
};