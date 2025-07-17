import { useState } from "react";
import {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} from "../../services/api";

export const useMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllMaterials = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllMaterials();
      setMaterials(data);
    } catch (err) {
      setError(err.message || "Error fetching materials");
    } finally {
      setLoading(false);
    }
  };

  const fetchMaterialById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMaterialById(id);
      setMaterial(data);
    } catch (err) {
      setError(err.message || "Error fetching material");
    } finally {
      setLoading(false);
    }
  };

  const createNewMaterial = async (materialData) => {
    setLoading(true);
    setError(null);
    try {
      const created = await createMaterial(materialData);
      setMaterials((prev) => [...prev, created]);
    } catch (err) {
      setError(err.message || "Error creating material");
    } finally {
      setLoading(false);
    }
  };

  const updateExistingMaterial = async (id, materialData) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateMaterial(id, materialData);
      setMaterials((prev) =>
        prev.map((m) => (m._id === id ? updated : m))
      );
    } catch (err) {
      setError(err.message || "Error updating material");
    } finally {
      setLoading(false);
    }
  };

  const deleteExistingMaterial = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteMaterial(id);
      setMaterials((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      setError(err.message || "Error deleting material");
    } finally {
      setLoading(false);
    }
  };

  return {
    materials,
    material,
    loading,
    error,
    fetchAllMaterials,
    fetchMaterialById,
    createNewMaterial,
    updateExistingMaterial,
    deleteExistingMaterial,
  };
};