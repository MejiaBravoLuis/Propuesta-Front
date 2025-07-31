import { useState, useEffect } from "react";
import {Sidebar} from "../../components/Sidebar/Sidebar";
import { UserProfileModal } from "../../components/UserProfileModal";
import ProfileImage from "../../assets/img/ye.png";
import './TechnologyPage.css'

export const TechnologyPage = () => {
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
        <h1 style={{ padding: "20px" }}>Tecnología</h1>
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
