import { useState, useEffect } from 'react';
import { getCourseByName } from '../../services/api'; 

export const useMaterials = (courseName) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseByName(courseName);  // Llamamos al método de API
        setCourse(data.course);  // Guardamos los detalles del curso en el estado
      } catch (error) {
        setError(error.message);  // Capturamos cualquier error
      } finally {
        setLoading(false);  // Terminamos de cargar
      }
    };

    fetchCourse();
  }, [courseName]);  // Se vuelve a ejecutar si el courseName cambia

  return { course, loading, error };  // Retornamos los detalles del curso, loading y error
};