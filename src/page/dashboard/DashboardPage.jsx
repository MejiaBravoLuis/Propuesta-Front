import { useState, useEffect, useRef } from 'react';
import { FloatingDockDemo } from "../../components/FloatingDockDemo";
import './dashboardPage.css';

export const DashboardPage = () => {
  const [showWelcomeVideo, setShowWelcomeVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!sessionStorage.getItem('welcomeVideoViewed')) {
      setShowWelcomeVideo(true);
    }
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
              {isMuted ? '🔇 Activar sonido' : '🔊 Sonido activado'}
            </button>
            <button className="skip-welcome-button" onClick={handleSkipWelcomeVideo}>
              Saltar Introducción
            </button>
          </div>
        </div>
      )}

      <div className="dashboard-wrapper">
        <div className="sidebar">
          <FloatingDockDemo />
        </div>

          {/* Video destacado - 1/5 de la pantalla */}
          <div className="featured-video-container">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&controls=0"
              title="Video destacado"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="featured-video"
            />
          </div>
                  <div className="dashboard-main">

          {/* Contenido del dashboard */}
          <div className="dashboard-content-area">
            <h1 className="dashboard-title">Bienvenido al Panel</h1>
            <p className="dashboard-subtitle">
              Selecciona una opción del menú para comenzar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};