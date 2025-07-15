import { useState, useEffect, useRef } from "react";
import { FloatingDockDemo } from "../../components/FloatingDockDemo";
import { UserProfileModal } from "../../components/UserProfileModal";
import {Sidebar} from "../../components/Sidebar/Sidebar";
import ProfileImage from "../../assets/img/ye.png";
import Stepper, { Step } from "../../components/utils/Stepper";
import "./dashboardPage.css";

export const DashboardPage = () => {
  const [showWelcomeVideo, setShowWelcomeVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const [textAnimation, setTextAnimation] = useState(false);

  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!sessionStorage.getItem("welcomeVideoViewed")) {
      setShowWelcomeVideo(true);
    }
    // Activar animaciones después de que el componente se monta
    setTimeout(() => setTextAnimation(true), 300);
  }, []);

  const handleSkipWelcomeVideo = () => {
    setShowWelcomeVideo(false);
    sessionStorage.setItem("welcomeVideoViewed", "true");
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="dashboard-page-content">
      {/* Video de bienvenida en pantalla completa */}
      {showWelcomeVideo && (
        <div className="welcome-video-overlay">
          <iframe
            ref={videoRef}
            src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=${
              isMuted ? 1 : 0
            }&controls=0&modestbranding=1&rel=0`}
            title="Video de bienvenida"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="welcome-video-iframe"
          />
          <div className="video-controls">
            <button className="mute-button" onClick={toggleMute}>
              {isMuted ? (
                <span className="icon-text">
                  🔇 <span className="button-text">Activar sonido</span>
                </span>
              ) : (
                <span className="icon-text">
                  🔊 <span className="button-text">Sonido activado</span>
                </span>
              )}
            </button>
            <button
              className="skip-welcome-button"
              onClick={handleSkipWelcomeVideo}
            >
              <span className="button-text">Saltar Introducción</span>
            </button>
          </div>
        </div>
      )}

      <div className="dashboard-wrapper">
        <Sidebar />

        <div className="main-content">
          {/* Video destacado con mensaje de bienvenida superpuesto */}
          <div className="top-video-container">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&controls=0&playlist=dQw4w9WgXcQ"
              title="Video destacado"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="featured-video"
            />
            <div
              className={`welcome-message-overlay ${
                textAnimation ? "animated" : ""
              }`}
            >
              <h1 className="dashboard-title">
                <span className="title-line">Bienvenido al</span>
                <span className="title-line highlight">Panel de Control</span>
              </h1>
              <div className="animated-subtitle">
                <p className="dashboard-subtitle">
                  <span className="subtitle-text">
                    Selecciona una opción del menú para comenzar
                  </span>
                  <span className="typing-cursor">|</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Panel inferior */}
          <div className="bottom-panel">
            <div className="dashboard-content-area">
              <div className="cards-and-stepper">
                <div className="stepper-container">
                  <Stepper
                    initialStep={1}
                    onStepChange={(step) => {
                      console.log(step);
                    }}
                    onFinalStepCompleted={() =>
                      console.log("All steps completed!")
                    }
                    backButtonText="Regresar "
                    nextButtonText="Siguiente"
                  >
                    <Step>
                      <h2>¡Bienvenido a EducaGT!</h2>
                      <p>Para nosotros es un placer tenerte aquí, este es un pequeño
                        tutorial para que veas el funcionamiento de nuestra plataforma!
                      </p>
                    </Step>
                    <Step>
                      <h2>¿Qué es esto?</h2>
                      <p>En EducaGT queremos que refuerces tus conocimientos con el uso
                        de diferentes materiales, tutoriales, prácticas y lecciones que 
                        tomarás a tu gusto.
                      </p>
                    </Step>
                    <Step>
                      <h2>¿Qué hago aquí?</h2>
                      <p>Con nosotros podrás aprender más a cerca de tus materias favoritas
                        tomando lecciones de aprendizaje personalizadas a tu gusto y propio 
                        ritmo.
                      </p>
                    </Step>
                    <Step>
                      <h2>Para maestros</h2>
                      <p>Si eres profesor de alguna institución, aquí podrás publicar tus clases,
                        materiales, notas de clase, impartir cursos y enseñar en general en las materias
                        que más te gusten.
                      </p>
                    </Step>
                  </Stepper>
                  <div className="info-cards">
                  <div className="info-card card-entrance">
                    <div className="card-icon">📊</div>
                    <h3 className="card-title">Analíticas</h3>
                    <p className="card-text">Visualiza tus métricas clave</p>
                  </div>
                  <div
                    className="info-card card-entrance"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <div className="card-icon">⚙️</div>
                    <h3 className="card-title">Configuración</h3>
                    <p className="card-text">Personaliza tu experiencia</p>
                  </div>
                  <div
                    className="info-card card-entrance"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <div className="card-icon">📈</div>
                    <h3 className="card-title">Reportes</h3>
                    <p className="card-text">Genera informes detallados</p>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          src={ProfileImage}
          alt="Perfil"
          onClick={() => setModalVisible(true)}
          className="profile-avatar"
        />
        <UserProfileModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          user={user}
        />
      </div>
    </div>
  );
};
