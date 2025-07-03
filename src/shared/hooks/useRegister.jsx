import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { register as registerRequest } from "../../services/api"; 

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const register = async ({ name, username, email, password, role }) => {
    setIsLoading(true);

    try {
      const userData = {
        name,
        username,
        email,
        password,
        role,
      };

      const response = await registerRequest(userData);

      if (!response.data || !response.data.userDetails) {
        throw new Error("Error al obtener datos del usuario.");
      }

      toast.success("Usuario registrado correctamente 🎉 (pendiente activación)");
      navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.msg ||
          "Ocurrió un error al registrar, intenta de nuevo ❌"
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
  };
};
