import { useState } from "react";
import {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
} from "../../services/api";

export const useQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllQuizzes = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedQuizzes = await getAllQuizzes();
      setQuizzes(fetchedQuizzes);
    } catch (err) {
      setError("Error fetching quizzes");
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const quiz = await getQuizById(id);
      return quiz;
    } catch (err) {
      setError("Error fetching quiz");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createNewQuiz = async (quizData) => {
    setLoading(true);
    setError(null);
    try {
      const newQuiz = await createQuiz(quizData);
      setQuizzes((prev) => [...prev, newQuiz]);
      return newQuiz;
    } catch (err) {
      setError("Error creating quiz");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateExistingQuiz = async (id, quizData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedQuiz = await updateQuiz(id, quizData);
      setQuizzes((prev) =>
        prev.map((q) => (q._id === id ? updatedQuiz : q))
      );
      return updatedQuiz;
    } catch (err) {
      setError("Error updating quiz");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteExistingQuiz = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteQuiz(id);
      setQuizzes((prev) => prev.filter((q) => q._id !== id));
      return true;
    } catch (err) {
      setError("Error deleting quiz");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const submitQuizAnswers = async (quizId, answers) => {
    setLoading(true);
    setError(null);
    try {
      const response = await submitQuiz(quizId, { answers });
      return response;
    } catch (err) {
      setError(err.message || "Error submitting quiz");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    quizzes,
    loading,
    error,
    fetchAllQuizzes,
    fetchQuizById,
    createNewQuiz,
    updateExistingQuiz,
    deleteExistingQuiz,
    submitQuizAnswers,
  };
};
