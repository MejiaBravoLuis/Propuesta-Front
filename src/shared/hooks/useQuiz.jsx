// src/shared/hooks/useQuiz.jsx
import { useState, useRef, useEffect, useCallback } from "react";
import {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz as deleteQuizAPI,
  submitQuiz as submitQuizAPI,
} from "../../services/api";

export const useQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const safeSet = (setter) => (value) => {
    if (isMounted.current) setter(value);
  };
  const _setQuizzes = safeSet(setQuizzes);
  const _setLoading = safeSet(setLoading);
  const _setError = safeSet(setError);


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

  const fetchQuizById = useCallback(async (id) => {
    _setLoading(true);
    _setError(null);
    try {
      const res = await getQuizById(id);          
      return res.quiz ?? res;
    } catch (err) {
      _setError(
        err.response?.data?.message ||
        err.message ||
        "Error fetching quiz"
      );
      throw err;
    } finally {
      _setLoading(false);
    }
  }, []);

  const createNewQuiz = useCallback(async (quizData) => {
    _setLoading(true);
    _setError(null);
    try {
      const res = await createQuiz(quizData);      
      const newQuiz = res.quiz;
      _setQuizzes((prev) => [...prev, newQuiz]);
      return newQuiz;
    } catch (err) {
      _setError(
        err.response?.data?.message ||
        err.message ||
        "Error creating quiz"
      );
      throw err;
    } finally {
      _setLoading(false);
    }
  }, []);

  const updateExistingQuiz = useCallback(async (id, quizData) => {
    _setLoading(true);
    _setError(null);
    try {
      const res = await updateQuiz(id, quizData);   
      const updatedQuiz = res.quiz;
      _setQuizzes((prev) =>
        prev.map((q) => (q._id === id ? updatedQuiz : q))
      );
      return updatedQuiz;
    } catch (err) {
      _setError(
        err.response?.data?.message ||
        err.message ||
        "Error updating quiz"
      );
      throw err;
    } finally {
      _setLoading(false);
    }
  }, []);

  const deleteExistingQuiz = useCallback(async (id) => {
    _setLoading(true);
    _setError(null);
    try {
      await deleteQuizAPI(id);                      
      _setQuizzes((prev) => prev.filter((q) => q._id !== id));
      return true;
    } catch (err) {
      _setError(
        err.response?.data?.message ||
        err.message ||
        "Error deleting quiz"
      );
      return false;
    } finally {
      _setLoading(false);
    }
  }, []);

  const submitQuizAnswers = useCallback(
    async (quizId, answersParam) => {
      _setLoading(true);
      _setError(null);
      try {
        const answersArray = Array.isArray(answersParam)
          ? answersParam
          : Object.entries(answersParam).map(([questionText, selected]) => ({
              questionText,
              selected,
            }));

        const res = await submitQuizAPI(quizId, { answers: answersArray });
        return res;
      } catch (err) {
        _setError(
          err.response?.data?.message ||
          err.message ||
          "Error submitting quiz"
        );
        throw err;
      } finally {
        _setLoading(false);
      }
    },
    []
  );

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
