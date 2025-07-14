import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { UserProfileModal } from "../../components/UserProfileModal";
import ProfileImage from "../../assets/img/ye.png";
import "./artPage.css"; // Puedes copiar estilos comunes o dejarlo vacío por ahora

export const ArtPage = () => {
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="art-page-wrapper">
      <Sidebar />
      <div className="art-main-content">
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
        {/* Aquí puedes seguir construyendo la página */}
      </div>
    </div>
  );
};
