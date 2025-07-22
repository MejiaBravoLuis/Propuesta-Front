import { useState } from "react";
import {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from "../../services/api"

export const useQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todos los quizzes
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

  // Obtener un quiz por ID
  const fetchQuizById = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const quiz = await getQuizById(id);
      return quiz;
    } catch (err) {
      setError("Error fetching quiz");
    } finally {
      setLoading(false);
    }
  };

  // Crear un nuevo quiz
  const createNewQuiz = async (quizData) => {
    setLoading(true);
    setError(null);

    try {
      const newQuiz = await createQuiz(quizData);
      setQuizzes((prevQuizzes) => [...prevQuizzes, newQuiz]);
      return newQuiz;
    } catch (err) {
      setError("Error creating quiz");
    } finally {
      setLoading(false);
    }
  };

  // Actualizar un quiz existente
  const updateExistingQuiz = async (id, quizData) => {
    setLoading(true);
    setError(null);

    try {
      const updatedQuiz = await updateQuiz(id, quizData);
      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((quiz) =>
          quiz._id === id ? updatedQuiz : quiz
        )
      );
      return updatedQuiz;
    } catch (err) {
      setError("Error updating quiz");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un quiz
  const deleteExistingQuiz = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await deleteQuiz(id);
      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz._id !== id)
      );
    } catch (err) {
      setError("Error deleting quiz");
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
  };
};