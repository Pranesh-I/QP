import apiClient from "./apiClient";


// Fetch paginated questions
export const getQuestions = async () => {

  const response =
    await apiClient.get("/questions");

  return response.data;
};


// Fetch single question details
export const getQuestionById = async (
  questionId: string
) => {

  const response =
    await apiClient.get(
      `/questions/${questionId}`
    );

  return response.data;
};


// Search questions
export const searchQuestions = async (
  query: string
) => {

  const response =
    await apiClient.get(
      `/questions/search?q=${query}`
    );

  return response.data;
};