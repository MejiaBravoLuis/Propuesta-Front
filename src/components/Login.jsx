import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLogin } from '../shared/hooks/useLogin';
import toast from "react-hot-toast";

import iconEmail from '../assets/icons/3.png';
import iconPassword from '../assets/icons/5.png';

export const Login = () => {
  const { login, isLoading } = useLogin();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data) => {
    if (!data.email) {
      toast.error("El email es obligatorio");
      return;
    }
    if (!data.password) {
      toast.error("La contraseña es obligatoria");
      return;
    }

    try {
      const loginData = {
        email: data.email,
        username: null,
        password: data.password,
      };

      if (data.codigoBanco?.trim()) {
        loginData.codigoBanco = data.codigoBanco;
      }

      await login(loginData);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Correo o contraseña incorrectos");
      } else {
        toast.error("Error al iniciar sesión. Intenta más tarde.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Iniciar Sesión</h2>

      <div className="container-input">
        <img src={iconEmail} alt="icono email" className="input-icon" />
        <input
          type="text"
          placeholder="Correo o usuario"
          {...register("email", { required: true })}
        />
      </div>
      {errors.email && <p style={{ color: "red" }}>Este campo es obligatorio</p>}

      <div className="container-input">
        <img src={iconPassword} alt="icono contraseña" className="input-icon" />
        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", { required: true })}
        />
      </div>
      {errors.password && <p style={{ color: "red" }}>Este campo es obligatorio</p>}
      <a href="/resetPassword">¿Olvidaste tu contraseña?</a>

      <button type="submit" className="button" disabled={isLoading}>
        {isLoading ? "Cargando..." : "Iniciar Sesión"}
      </button>
    </form>
  );
};
