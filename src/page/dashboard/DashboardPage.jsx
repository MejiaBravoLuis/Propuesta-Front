import { useState, useEffect, useRef } from 'react';
import { FloatingDockDemo } from "../../components/FloatingDockDemo";
import './dashboardPage.css';

export const DashboardPage = () => {
  const [showWelcomeVideo, setShowWelcomeVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const [textAnimation, setTextAnimation] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('welcomeVideoViewed')) {
      setShowWelcomeVideo(true);
    }
    // Activar animaciones después de que el componente se monta
    setTimeout(() => setTextAnimation(true), 300);
  }, []);

  const handleSkipWelcomeVideo = () => {
    setShowWelcomeVideo(false);
    sessionStorage.setItem('welcomeVideoViewed', 'true');
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
            src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&rel=0`}
            title="Video de bienvenida"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="welcome-video-iframe"
          />
          <div className="video-controls">
            <button className="mute-button" onClick={toggleMute}>
              {isMuted ? (
                <span className="icon-text">🔇 <span className="button-text">Activar sonido</span></span>
              ) : (
                <span className="icon-text">🔊 <span className="button-text">Sonido activado</span></span>
              )}
            </button>
            <button className="skip-welcome-button" onClick={handleSkipWelcomeVideo}>
              <span className="button-text">Saltar Introducción</span>
            </button>
          </div>
        </div>
      )}

      <div className="dashboard-wrapper">
        <div className="sidebar">
          <div className="sidebar-content">
            <FloatingDockDemo />
          </div>
        </div>

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
            <div className={`welcome-message-overlay ${textAnimation ? 'animated' : ''}`}>
              <h1 className="dashboard-title">
                <span className="title-line">Bienvenido al</span>
                <span className="title-line highlight">Panel de Control</span>
              </h1>
              <div className="animated-subtitle">
                <p className="dashboard-subtitle">
                  <span className="subtitle-text">Selecciona una opción del menú para comenzar</span>
                  <span className="typing-cursor">|</span>
                </p>
              </div>
            </div>
          </div>

          {/* Panel inferior */}
          <div className="bottom-panel">
            <div className="dashboard-content-area">
              <div className="info-cards">
                <div className="info-card card-entrance">
                  <div className="card-icon">📊</div>
                  <h3 className="card-title">Analíticas</h3>
                  <p className="card-text">Visualiza tus métricas clave</p>
                </div>
                <div className="info-card card-entrance" style={{ animationDelay: '0.2s' }}>
                  <div className="card-icon">⚙️</div>
                  <h3 className="card-title">Configuración</h3>
                  <p className="card-text">Personaliza tu experiencia</p>
                </div>
                <div className="info-card card-entrance" style={{ animationDelay: '0.4s' }}>
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
  );
};