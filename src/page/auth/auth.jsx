import { useRef, useEffect } from "react";
import { Login } from "../../components/Login";
import { Register } from "../../components/Register";
import "./styleAuth.css";
import iconSwitch from "../../assets/icons/1.png";
import Galaxy from "../../components/animations/background/galaxy/Galaxy";

export const Auth = () => {
  const containerRef = useRef(null);

  const handleSignInClick = () => {
    containerRef.current?.classList.remove("toggle");
  };

  const handleSignUpClick = () => {
    containerRef.current?.classList.add("toggle");
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.lineicons.com/4.0/lineicons.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="app">
      {/* Galaxy background */}
      <div className="galaxy-background">
        <Galaxy mouseRepulsion={true} mouseInteraction={true} density={1.5} />
      </div>

      <div className="container" ref={containerRef}>
        <div className="container-form sign-in-container">
          <Login />
        </div>

        <div className="container-form sign-up-container">
          <Register />
        </div>

        <div className="container-welcome">
          <div className="welcome welcome-sign-up">
            <h3>¡Bienvenido!</h3>
            <p>¿Aún no tienes una cuenta?</p>
            <button className="button" onClick={handleSignUpClick}>
              <img
                src={iconSwitch}
                alt="icono cambiar"
                className="input-icon"
              />
              Registrarse <i className="lni lni-arrow-left login"></i>
            </button>
          </div>

          <div className="welcome welcome-sign-in">
            <h3>¡Hola de nuevo!</h3>
            <p>¿Ya tienes una cuenta?</p>
            <button className="button" onClick={handleSignInClick}>
              <img
                src={iconSwitch}
                alt="icono cambiar"
                className="input-icon"
              />
              Iniciar Sesión <i className="lni lni-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
