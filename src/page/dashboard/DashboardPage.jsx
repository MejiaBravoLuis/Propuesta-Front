import { useState, useEffect, useRef } from "react";
import { FloatingDockDemo } from "../../components/FloatingDockDemo";
import { UserProfileModal } from "../../components/UserProfileModal";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import ProfileImage from "../../assets/img/ye.png";
import MagicBento from "../../components/bento/MagicBento";
import { useUserDetails } from "../../shared/hooks/useUserDetails";
import Stepper, { Step } from "../../components/utils/Stepper";
import ShinyText from "../../components/animations/text/ShinyText";
import "./dashboardPage.css";

export const DashboardPage = () => {
  const [showWelcomeVideo, setShowWelcomeVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [narradorActivo, setNarradorActivo] = useState(true);
  const videoRef = useRef(null);
  const [textAnimation, setTextAnimation] = useState(false);

  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { role } = useUserDetails();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (!sessionStorage.getItem("welcomeVideoViewed")) {
      setShowWelcomeVideo(true);
    }
    setTimeout(() => setTextAnimation(true), 300);
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  const handleSkipWelcomeVideo = () => {
    setShowWelcomeVideo(false);
    sessionStorage.setItem("welcomeVideoViewed", "true");
  };
  const toggleMute = () => setIsMuted((m) => !m);
  const toggleNarrador = () => setNarradorActivo((a) => !a);

  const leerTexto = (texto) => {
    if (narradorActivo && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(texto);
      u.lang = "es-ES";
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="dashboard-page-content">
      {showWelcomeVideo && (
        <div className="welcome-video-overlay">
          <iframe
            ref={videoRef}
            src={`https://www.youtube.com/embed/6pnKlAtALlU?autoplay=1&mute=${
              isMuted ? 1 : 0
            }&controls=0&modestbranding=1&rel=0&loop=1&playlist=6pnKlAtALlU`}
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
          <div className="top-video-container">
            <iframe
              src="https://www.youtube.com/embed/6pnKlAtALlU?autoplay=1&mute=1&loop=1&controls=0&playlist=6pnKlAtALlU"
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
                <span
                  className="title-line"
                  onMouseEnter={() => leerTexto("Bienvenido al")}
                >
                  Bienvenido al
                </span>
                <span
                  className="title-line highlight"
                  onMouseEnter={() => leerTexto("¿Qué es EducaGT?")}
                >
                  ¿Qué es EducaGT?
                </span>
              </h1>
              <div className="animated-subtitle">
                <p
                  className="dashboard-subtitle"
                  onMouseEnter={() =>
                    leerTexto(
                      "En EducaGT buscamos crear una red de personas que busquen superarse en las materias que notan una dificultad."
                    )
                  }
                >
                  <span className="subtitle-text">
                    En EducaGT buscamos crear una red de personas que busquen
                    superarse en las materias que notan una dificultad, este
                    sitio es especial para aprender a tu propio ritmo y gusto.
                    Aquí podrás encontrar material de información para mejorar
                    tu aprendizaje en los temas que más te cuesten, si eres
                    profesor y quieres ayudar a la comunidad de estudiantes
                    puedes publicar tu material para ayudar a mejorar y crecer
                    nuestra plataforma.
                  </span>
                  <span className="typing-cursor">|</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bottom-panel">
            <div className="dashboard-content-area">
              <div className="cards-and-stepper">
                <div className="stepper-container">
                  <Stepper
                    initialStep={1}
                    onStepChange={(step) => {}}
                    onFinalStepCompleted={() =>
                      console.log("All steps completed!")
                    }
                    backButtonText={
                      <span onMouseEnter={() => leerTexto("Regresar")}>
                        Regresar
                      </span>
                    }
                    nextButtonText={
                      <span onMouseEnter={() => leerTexto("Siguiente")}>
                        Siguiente
                      </span>
                    }
                  >
                    <Step>
                      <h2
                        onMouseEnter={() => leerTexto("¡Bienvenido a EducaGT!")}
                      >
                        ¡Bienvenido a EducaGT!
                      </h2>
                      <p
                        onMouseEnter={() =>
                          leerTexto(
                            "Para nosotros es un placer tenerte aquí, este es un pequeño tutorial para que veas el funcionamiento de nuestra plataforma."
                          )
                        }
                      >
                        Para nosotros es un placer tenerte aquí, este es un
                        pequeño tutorial para que veas el funcionamiento de
                        nuestra plataforma!
                      </p>
                    </Step>
                    <Step>
                      <h2 onMouseEnter={() => leerTexto("¿Qué es esto?")}>
                        ¿Qué es esto?
                      </h2>
                      <p
                        onMouseEnter={() =>
                          leerTexto(
                            "En EducaGT queremos que refuerces tus conocimientos con el uso de diferentes materiales, tutoriales, prácticas y lecciones."
                          )
                        }
                      >
                        En EducaGT queremos que refuerces tus conocimientos con
                        el uso de diferentes materiales, tutoriales, prácticas y
                        lecciones que tomarás a tu gusto.
                      </p>
                    </Step>
                    <Step>
                      <h2 onMouseEnter={() => leerTexto("¿Qué hago aquí?")}>
                        ¿Qué hago aquí?
                      </h2>
                      <p
                        onMouseEnter={() =>
                          leerTexto(
                            "Con nosotros podrás aprender más acerca de tus materias favoritas tomando lecciones de aprendizaje personalizadas a tu gusto y propio ritmo."
                          )
                        }
                      >
                        Con nosotros podrás aprender más a cerca de tus materias
                        favoritas tomando lecciones de aprendizaje
                        personalizadas a tu gusto y propio ritmo.
                      </p>
                    </Step>
                    <Step>
                      <h2 onMouseEnter={() => leerTexto("Para maestros")}>
                        Para maestros
                      </h2>
                      <p
                        onMouseEnter={() =>
                          leerTexto(
                            "Si eres profesor, aquí podrás publicar tus clases, materiales, notas de clase, impartir cursos y enseñar en general en las materias que más te gusten."
                          )
                        }
                      >
                        Si eres profesor de alguna institución, aquí podrás
                        publicar tus clases, materiales, notas de clase,
                        impartir cursos y enseñar en general en las materias que
                        más te gusten.
                      </p>
                    </Step>
                  </Stepper>

                  <div className="student-message">
                    <ShinyText
                      text=""
                      disabled={false}
                      speed={3}
                      className="custom-class"
                    />
                  </div>

                  <MagicBento
                    textAutoHide={true}
                    enableStars={true}
                    enableSpotlight={true}
                    enableBorderGlow={true}
                    enableTilt={true}
                    enableMagnetism={true}
                    clickEffect={true}
                    spotlightRadius={300}
                    particleCount={12}
                    glowColor="132, 0, 255"
                  />

                  <div className="student-message">
                    <ShinyText
                      text="Bienvenido a EducaGT, la plataforma para aprender a tu propio ritmo."
                      disabled={false}
                      speed={3}
                      className="custom-class"
                    />
                  </div>

                  {role === "STUDENT" && (
                    <div
                      className="student-message"
                      onMouseEnter={() =>
                        leerTexto(
                          "En EducaGT buscamos crear una red de personas que busquen superarse en las materias que notan una dificultad, este sitio es especial para aprender a tu propio ritmo y gusto. Aquí podrás encontrar material de información para mejorar tu aprendizaje en los temas que más te cuesten."
                        )
                      }
                    >
                      <ShinyText
                        text="En EducaGT buscamos crear una red de personas que busquen superarse en las materias que notan una dificultad, este sitio es especial para aprender a tu propio ritmo y gusto. Aquí podrás encontrar material de información para mejorar tu aprendizaje en los temas que más te cuesten."
                        disabled={false}
                        speed={5}
                        className="student-message-f"
                      />
                    </div>
                  )}
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

      <div
        style={{
          position: "fixed",
          bottom: "120px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <button className="mute-button" onClick={toggleNarrador}>
          {narradorActivo ? "🔊 Narrador On" : "🔇 Narrador Off"}
        </button>
      </div>
    </div>
  );
};
