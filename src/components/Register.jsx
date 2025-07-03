import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useRegister } from "../shared/hooks/useRegister";
import { useNavigate } from "react-router-dom";

import iconUser from "../assets/icons/4.png";
import iconEmail from "../assets/icons/3.png";
import iconPassword from "../assets/icons/5.png";

const registerSchema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  username: yup.string().required("El username es obligatorio"),
  email: yup.string().email("Debe ser un email válido").required("El email es obligatorio"),
  password: yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("La contraseña es obligatoria"),
});

export const Register = () => {
  const { register: registerUser, isLoading } = useRegister();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      await registerUser({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
      });
      toast.success("Usuario registrado exitosamente");
      navigate("/");
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Ya existe una cuenta con ese correo electrónico");
      } else {
        toast.error("Error al registrar. Intenta de nuevo.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Registrarse</h2>

      <div className="container-input">
        <img src={iconUser} alt="icono nombre" className="input-icon" />
        <input type="text" placeholder="Nombre" {...register("name")} />
      </div>
      {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

      <div className="container-input">
        <img src={iconUser} alt="icono username" className="input-icon" />
        <input type="text" placeholder="Username" {...register("username")} />
      </div>
      {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}

      <div className="container-input">
        <img src={iconEmail} alt="icono email" className="input-icon" />
        <input type="text" placeholder="Email" {...register("email")} />
      </div>
      {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

      <div className="container-input">
        <img src={iconPassword} alt="icono password" className="input-icon" />
        <input type="password" placeholder="Contraseña" {...register("password")} />
      </div>
      {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}

      <button type="submit" className="button" disabled={isLoading}>
        {isLoading ? "Cargando..." : "Registrarse"}
      </button>
    </form>
  );
};
