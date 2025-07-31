import { useState } from "react";
import {
  getAllCategories as apiGetAll,
  createCategory as apiCreate,
  getCategoryById as apiGetById,
  updateCategory as apiUpdate,
  deleteCategory as apiDelete,
} from "../../services/api";

export const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchAllCategories = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const res = await apiGetAll();
    setLoading(false);

    if (res.error) {
      setError("Error al obtener las categorías");
      return;
    }

    setCategories(res.categories || []);
  };

  const fetchCategoryById = async (id) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const res = await apiGetById(id);
    setLoading(false);

    if (res.error) {
      setError("Error al obtener la categoría");
      return;
    }

    setCategory(res.category || null);
  };

  const createCategory = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const res = await apiCreate(data);
    setLoading(false);

    if (res.error) {
      setError("Error al crear la categoría");
      return null;
    }

    setSuccess("Categoría creada correctamente");
    return res.category;
  };

  const updateCategory = async (id, data) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const res = await apiUpdate(id, data);
    setLoading(false);

    if (res.error) {
      setError("Error al actualizar la categoría");
      return null;
    }

    setSuccess("Categoría actualizada correctamente");
    return res.category;
  };

  const deleteCategory = async (id) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const res = await apiDelete(id);
    setLoading(false);

    if (res.error) {
      setError("Error al eliminar la categoría");
      return false;
    }

    setSuccess("Categoría eliminada correctamente");
    return true;
  };

  return {
    categories,
    category,
    loading,
    error,
    success,
    fetchAllCategories,
    fetchCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    setError,
    setSuccess,
  };
};
