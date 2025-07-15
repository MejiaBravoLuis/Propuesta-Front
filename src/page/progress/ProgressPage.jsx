import { useState, useEffect } from "react";
import {Sidebar} from "../../components/Sidebar/Sidebar";
import ProfileImage from "../../assets/img/ye.png";
import { UserProfileModal } from "../../components/UserProfileModal";
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

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="main-content">
        <h1>Mi Progreso</h1>
        <p>
          Aquí podrás visualizar tu avance en las distintas materias y cursos.
          Monitorea tus logros, recibe recomendaciones personalizadas y planifica tus próximos pasos.
        </p>
        {/* Aquí podrías agregar más componentes, gráficos o listas de progreso */}
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
