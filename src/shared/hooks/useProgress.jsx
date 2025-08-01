import { useState, useEffect } from "react";
import { getUserProgress } from "../../services/api";
import apiClient from "../../services/api"; // sigue usando el mismo client configurado

export const useProgress = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProgress = async () => {
    setLoading(true);
    const data = await getUserProgress();
    setProgress(data);
    setLoading(false);
  };

  const createProgress = async ({ user, material, quiz = null, completed = false, score = null }) => {
    try {
      const response = await apiClient.post("/progress", {
        user,
        material,
        quiz,
        completed,
        score,
      });

      if (response.data.success) {
        await fetchProgress(); // refresca el progreso luego de crear
      }

      return response.data;
    } catch (error) {
      console.error("Error creating progress:", error);
      return { error: true, message: error.message };
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  return { progress, loading, createProgress };
};