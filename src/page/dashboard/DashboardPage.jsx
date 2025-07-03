import { FloatingDockDemo } from "../../components/FloatingDockDemo";
import './dashboardPage.css';

export const DashboardPage = () => {
  return (
    <div className="dashboard-page-content">
      <div className="dashboard-wrapper">
        <div className="sidebar">
          <FloatingDockDemo />
        </div>

        <div className="dashboard-main">
          <h1 className="dashboard-title">Bienvenido al Panel</h1>
          <p className="dashboard-subtitle">
            Selecciona una opción del menú para comenzar.
          </p>

          <div className="dashboard-video-card">
            <h2 className="video-card-title">Video Destacado</h2>
            <div className="dashboard-video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Video de ejemplo"
                frameBorder="1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
