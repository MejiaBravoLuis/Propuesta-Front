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

export const getCourseByName = async (courseName) => {
  try {
    const response = await apiClient.get(`/course/course/${courseName}`);  // Usamos GET y pasamos el nombre del curso en la URL
    return response.data;  // Devuelve la información del curso
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error;
  }
};

export default apiClient;
