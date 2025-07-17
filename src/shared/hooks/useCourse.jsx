import { useState } from "react";
import {
  getAllCourses as apiGetAll,
  getCourseById as apiGetById,
  createCourse as apiCreate,
  updateCourse as apiUpdate,
  deleteCourse as apiDelete,
} from "../../services/api";

export const useCourse = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchAllCourses = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const res = await apiGetAll();
    setLoading(false);

    if (res.error) {
      setError("Error al obtener cursos");
      return;
    }

    setCourses(res.courses || []);
  };

  const fetchCourseById = async (id) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const res = await apiGetById(id);
    setLoading(false);

    if (res.error) {
      setError("Error al obtener el curso");
      return;
    }

    setCourse(res.course || null);
  };

  const createCourse = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const res = await apiCreate(data);
    setLoading(false);

    if (res.error) {
      setError("Error al crear el curso");
      return null;
    }

    setSuccess("Curso creado correctamente");
    return res.course;
  };

  const updateCourse = async (id, data) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const res = await apiUpdate(id, data);
    setLoading(false);

    if (res.error) {
      setError("Error al actualizar el curso");
      return null;
    }

    setSuccess("Curso actualizado correctamente");
    return res.course;
  };

  const deleteCourse = async (id) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const res = await apiDelete(id);
    setLoading(false);

    if (res.error) {
      setError("Error al eliminar el curso");
      return false;
    }

    setSuccess("Curso eliminado correctamente");
    return true;
  };

  return {
    courses,
    course,
    loading,
    error,
    success,
    fetchAllCourses,
    fetchCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    setError,
    setSuccess,
  };
};
