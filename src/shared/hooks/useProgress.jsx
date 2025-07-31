import { useState, useEffect } from "react";
import { getUserProgress } from "../../services/api";

export const useProgress = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProgress = async () => {
    setLoading(true);
    const data = await getUserProgress();
    setProgress(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  return { progress, loading };
};
