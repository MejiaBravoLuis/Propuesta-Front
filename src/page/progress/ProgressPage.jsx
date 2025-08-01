import { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import ProfileImage from "../../assets/img/ye.png";
import { UserProfileModal } from "../../components/UserProfileModal";
import ReactApexChart from "react-apexcharts";
import { useProgressSummary } from "../../shared/hooks/useProgressSumary";
import "./ProgressPage.css";

export const ProgressPage = () => {
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { summary, loading } = useProgressSummary();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const chartLabels = ["Materiales", "Quizzes"];
  const chartSeries = summary ? [
    Math.round(summary.materialProgress),
    Math.round(summary.quizProgress)
  ] : [];

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="main-content">
        <h1>Mi Progreso</h1>
        <p>
          Visualiza tu avance general en EducaGT. Este progreso se calcula en base a los materiales y quizzes completados.
        </p>

        {loading ? (
          <p style={{ textAlign: "center" }}>Cargando progreso...</p>
        ) : summary ? (
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

            <div className="progress-details">
              <p>Total de materiales: {summary.totalMaterials}</p>
              <p>Completados: {summary.completedMaterials}</p>
              <p>Total de quizzes: {summary.totalQuizzes}</p>
              <p>Completados: {summary.completedQuizzes}</p>
            </div>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>No se pudo cargar el progreso.</p>
        )}
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
