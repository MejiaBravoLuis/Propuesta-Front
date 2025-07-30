import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:33/Propuesta/v1/",
  timeout: 5000,
});

apiClient.interceptors.request.use(
  (config) => {
    const useUserDetails = localStorage.getItem("user");

    if (useUserDetails) {
      const token = JSON.parse(useUserDetails).token;
      config.headers["x-token"] = token;
    }

    return config;
  },
  (e) => {
    return Promise.reject(e);
  }
);

export const login = async (data) => {
  try {
    return await apiClient.post("auth/login", data);
  } catch (e) {
    return { error: true, e };
  }
};

export const register = async (data) => {
  try {
    return await apiClient.post("auth/register", data);
  } catch (e) {
    return { error: true, e };
  }
};

export const getAllCategories = async () => {
  try {
    const response = await apiClient.get("category");
    return response.data; 
  } catch (e) {
    console.error("Error fetching categories:", e);
    return { error: true, e };
  }
};

// Crear una nueva categoría
export const createCategory = async (data) => {
  try {
    const response = await apiClient.post("category", data);
    return response.data; 
  } catch (e) {
    console.error("Error creating category:", e);
    return { error: true, e };
  }
};

// Obtener una categoría por ID
export const getCategoryById = async (id) => {
  try {
    const response = await apiClient.get(`category/${id}`);
    return response.data;
  } catch (e) {
    console.error(`Error fetching category ${id}`, e);
    return { error: true, e };
  }
};

// Actualizar una categoría
export const updateCategory = async (id, data) => {
  try {
    const response = await apiClient.put(`category/${id}`, data);
    return response.data;
  } catch (e) {
    console.error(`Error updating category ${id}`, e);
    return { error: true, e };
  }
};

// Eliminar una categoría
export const deleteCategory = async (id) => {
  try {
    const response = await apiClient.delete(`category/${id}`);
    return response.data;
  } catch (e) {
    console.error(`Error deleting category ${id}`, e);
    return { error: true, e };
  }
};

export const getAllCourses = async () => {
  try {
    const response = await apiClient.get("course");
    return response.data;
  } catch (e) {
    console.error("Error fetching courses", e);
    return { error: true, e };
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await apiClient.get(`course/${id}`);
    return response.data;
  } catch (e) {
    console.error(`Error fetching course ${id}`, e);
    return { error: true, e };
  }
};

export const createCourse = async (data) => {
  try {
    const response = await apiClient.post("course", data);
    return response.data;
  } catch (e) {
    console.error("Error creating course", e);
    return { error: true, e };
  }
};

export const updateCourse = async (id, data) => {
  try {
    const response = await apiClient.put(`course/${id}`, data);
    return response.data;
  } catch (e) {
    console.error(`Error updating course ${id}`, e);
    return { error: true, e };
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await apiClient.delete(`course/${id}`);
    return response.data;
  } catch (e) {
    console.error(`Error deleting course ${id}`, e);
    return { error: true, e };
  }
};

export const getAllForums = async () => {
  try {
    const response = await apiClient.get("/forum");
    return response.data.forums;
  } catch (error) {
    console.error("Error fetching forums:", error);
    throw error;
  }
};

export const getForumById = async (id) => {
  try {
    const response = await apiClient.get(`/forum/${id}`);
    return response.data.forum;
  } catch (error) {
    console.error("Error fetching forum by id:", error);
    throw error;
  }
};

export const createForum = async (data) => {
  try {
    const response = await apiClient.post("/forum", data);
    return response.data.forum;
  } catch (error) {
    console.error("Error creating forum:", error);
    throw error;
  }
};

export const updateForum = async (id, data) => {
  try {
    const response = await apiClient.put(`/forum/${id}`, data);
    return response.data.forum;
  } catch (error) {
    console.error("Error updating forum:", error);
    throw error;
  }
};

export const deleteForum = async (id) => {
  try {
    await apiClient.delete(`/forum/${id}`);
  } catch (error) {
    console.error("Error deleting forum:", error);
    throw error;
  }
};

export const getAllMaterials = async () => {
  try {
    const response = await apiClient.get("/material");
    return response.data.materials;
  } catch (error) {
    console.error("Error fetching materials:", error);
    throw error;
  }
};

export const getMaterialById = async (id) => {
  try {
    const response = await apiClient.get(`/material/${id}`);
    return response.data.material;
  } catch (error) {
    console.error("Error fetching material by id:", error);
    throw error;
  }
};

export const createMaterial = async (data) => {
  try {
    const response = await apiClient.post("/material", data);
    return response.data.material;
  } catch (error) {
    console.error("Error creating material:", error);
    throw error;
  }
};

export const updateMaterial = async (id, data) => {
  try {
    const response = await apiClient.put(`/material/${id}`, data);
    return response.data.material;
  } catch (error) {
    console.error("Error updating material:", error);
    throw error;
  }
};

export const deleteMaterial = async (id) => {
  try {
    await apiClient.delete(`/material/${id}`);
  } catch (error) {
    console.error("Error deleting material:", error);
    throw error;
  }
};

export const getAllQuizzes = async () => {
  try {
    const response = await apiClient.get("quiz");
    return response.data.quizzes;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
};

export const getQuizById = async (id) => {
  try {
    const response = await apiClient.get(`quiz/${id}`);
    return response.data.quiz;
  } catch (error) {
    console.error("Error fetching quiz by id:", error);
    throw error;
  }
};

export const createQuiz = async (data) => {
  try {
    const response = await apiClient.post("quiz", data);
    return response.data.quiz;
  } catch (error) {
    console.error("Error creating quiz:", error);
    console.error("Error creating quiz:", error.response?.data || error.message);

    throw error;
  }
};

export const updateQuiz = async (id, data) => {
  try {
    const response = await apiClient.put(`quiz/${id}`, data);
    return response.data.quiz;
  } catch (error) {
    console.error("Error updating quiz:", error);
    throw error;
  }
};

export const deleteQuiz = async (id) => {
  try {
    await apiClient.delete(`quiz/${id}`);
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw error;
  }
};

export const getUserProgress = async () => {
  try {
    const response = await apiClient.get("/progress");
    return response.data.progresses;
  } catch (e) {
    console.error("Error fetching user progress:", e);
    return [];
  }
};

export default apiClient;
