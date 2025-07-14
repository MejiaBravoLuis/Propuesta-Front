import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProfileImage from "../../assets/img/ye.png";
import { UserProfileModal } from "../../components/UserProfileModal";
import "./naturalSciencesPage.css";

export const NaturalSciencesPage = () => {
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
        <h1>Área de Ciencias Naturales</h1>
        <p>
          Explora el mundo natural a través de lecciones sobre física, química,
          ecología y más. Desarrolla tu curiosidad científica aquí.
        </p>
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
