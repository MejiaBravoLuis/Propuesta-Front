import { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import ProfileImage from "../../assets/img/ye.png";
import { UserProfileModal } from "../../components/UserProfileModal";
import ReactApexChart from "react-apexcharts";
import { useProgress } from "../../shared/hooks/useProgress";
import "./progressPage.css";

export const ProgressPage = () => {
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const { progress, loading } = useProgress();

  // 📊 Simulación de datos de progreso por curso
  const categories = {};
  progress.forEach((p) => {
    const name = p.material?.category?.name || "Otro";
    if (!categories[name]) categories[name] = { total: 0, completed: 0 };
    categories[name].total += 1;
    if (p.completed) categories[name].completed += 1;
  });

  const chartLabels = Object.keys(categories);
  const chartSeries = Object.values(categories).map((c) =>
    Math.round((c.completed / c.total) * 100)
  );

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="main-content">
        <h1>Mi Progreso</h1>
        <p>
          Aquí podrás visualizar tu avance en las distintas materias y cursos.
          Monitorea tus logros, recibe recomendaciones personalizadas y
          planifica tus próximos pasos.
        </p>

        <div style={{ maxWidth: 600, margin: "40px auto" }}>
          <ReactApexChart
            options={{
              chart: { type: "radialBar" },
              labels: chartLabels,
              plotOptions: {
                radialBar: {
                  dataLabels: {
                    name: { fontSize: "20px" },
                    value: { fontSize: "16px" },
                  },
                },
              },
            }}
            series={chartSeries}
            type="radialBar"
            height={350}
          />
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
  );
};
