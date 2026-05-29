import { useEffect, useState } from "react";

import QuestionCard from "../components/QuestionCard";
import SubjectFilter from "../components/SubjectFilter";
import PaperFilter from "../components/PaperFilter";

import { getQuestions } from "../services/questionsApi";
import { getPapers } from "../services/papersApi";

import Pagination from "../components/Pagination";

import MarksFilter from "../components/MarksFilter";

import type {
  Question,
} from "../types/question";

import type {
  Paper,
} from "../types/paper";

import SearchBar from "../components/SearchBar";

import {
  searchQuestions,
} from "../services/questionsApi";

type Subject =
  | "all"
  | "physics"
  | "chemistry"
  | "maths"
  | "biology";


// Main question bank page
export default function QuestionBankPage() {

  const [questions, setQuestions] =
    useState<Question[]>([]);

  const [papers, setPapers] =
    useState<Paper[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [
    selectedSubject,
    setSelectedSubject,
  ] = useState<Subject>("all");

  const [
    selectedPaperId,
    setSelectedPaperId,
  ] = useState("");

  const [
    searchQuery, 
    setSearchQuery
  ] = useState("");

  const [currentPage, setCurrentPage] =
  useState(1);

  const [
    selectedMarks,
    setSelectedMarks,
  ] = useState<number | "all">(
    "all"
  );

  const questionsPerPage = 10;  

  // Fetch all questions from backend
  const fetchQuestions = async () => {

    try {

      setLoading(true);

      const data =
        await getQuestions();

      setQuestions(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };


  // Fetch uploaded papers
  const fetchPapers = async () => {

    try {

      const data =
        await getPapers();

      setPapers(data);

    } catch (error) {

      console.error(error);

    }
  };


  useEffect(() => {

    fetchQuestions();

    fetchPapers();

  }, []);

  // Search questions from backend
  const handleSearch = async () => {

    try {

      setLoading(true);

      const data =
        await searchQuestions(
          searchQuery
        );

      setQuestions(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };


  // Apply frontend subject filtering
  const filteredQuestions =
    questions.filter((question) => {

      if (
        selectedSubject !== "all" &&
        question.subject !==
          selectedSubject
      ) {
        return false;
      }

      if (
        selectedMarks !== "all" &&
        question.marks !==
          selectedMarks
      ) {
        return false;
      }

      return true;
    });

    // Calculate paginated question list
    const startIndex =
      (currentPage - 1) *
      questionsPerPage;

    const paginatedQuestions =
      filteredQuestions.slice(
        startIndex,
        startIndex + questionsPerPage
      );

    const totalPages = Math.ceil(
      filteredQuestions.length /
        questionsPerPage
    );


  return (
    <div style={{ padding: "40px" }}>

      <h1>
        Question Bank
      </h1>

      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={
          setSearchQuery
        }
        onSearch={handleSearch}
      />

      <SubjectFilter
        selectedSubject={
          selectedSubject
        }
        onSelectSubject={
          setSelectedSubject
        }
      />


      <PaperFilter
        papers={papers}
        selectedPaperId={
          selectedPaperId
        }
        onSelectPaper={
          setSelectedPaperId
        }
      />

      <MarksFilter
        selectedMarks={
          selectedMarks
        }
        onSelectMarks={
          setSelectedMarks
        }
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={
          setCurrentPage
        }
      />


      {loading && (
        <p>
          Loading questions...
        </p>
      )}


      {!loading &&
        paginatedQuestions.map(
          (question) => (
            <QuestionCard
              key={question.id}
              question={question}
            />
          )
        )}

    </div>
  );
}