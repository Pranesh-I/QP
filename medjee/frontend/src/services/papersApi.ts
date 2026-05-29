import apiClient from "./apiClient";


// Fetch all uploaded papers
export const getPapers = async () => {

  const response =
    await apiClient.get("/papers");

  return response.data;
};


// Trigger paper reprocessing
export const reprocessPaper = async (
  paperId: string
) => {

  const response =
    await apiClient.post(
      `/papers/${paperId}/reprocess`
    );

  return response.data;
};