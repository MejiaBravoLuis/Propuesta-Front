import { useState } from "react";
import {
  getAllForums,
  getForumById,
  createForum,
  updateForum,
  deleteForum,
} from "../../services/api";

export const useForums = () => {
  const [forums, setForums] = useState([]);
  const [forum, setForum] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllForums = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllForums();
      setForums(data);
    } catch (err) {
      setError(err.message || "Error fetching forums");
    } finally {
      setLoading(false);
    }
  };

  const fetchForumById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getForumById(id);
      setForum(data);
    } catch (err) {
      setError(err.message || "Error fetching forum");
    } finally {
      setLoading(false);
    }
  };

  const createNewForum = async (forumData) => {
    setLoading(true);
    setError(null);
    try {
      const created = await createForum(forumData);
      setForums((prev) => [...prev, created]);
    } catch (err) {
      setError(err.message || "Error creating forum");
    } finally {
      setLoading(false);
    }
  };

  const updateExistingForum = async (id, forumData) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateForum(id, forumData);
      setForums((prev) =>
        prev.map((f) => (f._id === id ? updated : f))
      );
    } catch (err) {
      setError(err.message || "Error updating forum");
    } finally {
      setLoading(false);
    }
  };

  const deleteExistingForum = async (id) => {
  setLoading(true);
  setError(null);
  try {
    // Si esto no lanza, ¡operación exitosa!
    await deleteForum(id);
    setForums(prev => prev.filter(f => f._id !== id));
    return true;
  } catch (err) {
    setError(err.message || "Error al eliminar el foro");
    return false;
  } finally {
    setLoading(false);
  }
};

  return {
    forums,
    forum,
    loading,
    error,
    fetchAllForums,
    fetchForumById,
    createNewForum,
    updateExistingForum,
    deleteExistingForum,
  };
};
