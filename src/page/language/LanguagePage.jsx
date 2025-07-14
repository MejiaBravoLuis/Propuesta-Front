import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProfileImage from "../../assets/img/ye.png";
import { UserProfileModal } from "../../components/UserProfileModal";
import "./languagePage.css";

export const LanguagePage = () => {
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
        <h1>Área de Lenguaje</h1>
        <p>
          Explora el fascinante mundo de la comunicación, la literatura y la gramática. 
          Aprende a expresarte con claridad y profundidad, tanto de forma oral como escrita.
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
