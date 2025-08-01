import { useEffect, useState } from "react";
import { getProgressSummary } from "../../services/api";

export const useProgressSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const decodeToken = (token) => {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded.uid || decoded._id;
    } catch {
      return null;
    }
  };

  const fetchSummary = async () => {
    setLoading(true);
    const stored = localStorage.getItem("user");
    const parsed = stored ? JSON.parse(stored) : null;
    const token = parsed?.token;

    const userId = token ? decodeToken(token) : null;
    if (!userId) {
      setLoading(false);
      return;
    }

    const data = await getProgressSummary(userId);
    setSummary(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return { summary, loading };
};
