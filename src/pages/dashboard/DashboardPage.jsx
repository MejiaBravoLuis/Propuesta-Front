import { SidebarDemo } from "../../components/navbars/sidevbar";
import { LoadingSpinner } from "../../components/loadingSpinner";
import './dashboardPage.css';

export const DashboardPage = () => {
  return (
    
  <div className="dashboard-page-content">
      <div className="dashboard-wrapper">
        <SidebarDemo />
        <div className="dashboard-main">
          <h1 className="dashboard-title">Bienvenido al Panel</h1>
          <p className="dashboard-subtitle">Selecciona una opción del menú para comenzar.</p>
        </div>
      </div>
    </div>
  );
};
