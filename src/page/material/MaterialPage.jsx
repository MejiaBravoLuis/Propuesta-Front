import React, { useEffect, useState, useRef } from "react";
import { Spin, Alert } from "antd";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { UserProfileModal } from "../../components/UserProfileModal";
import ProfileImage from "../../assets/img/ye.png";
import { useMaterials } from "../../shared/hooks/useMaterials";
import { SpotlightCard } from "../../components/cards/SpotligthCard";
import MagicBento from "../../components/bento/MagicBento";
import './MaterialPage.css'

export const MaterialPage = () => {
  const { materials, loading, error, fetchAllMaterials } = useMaterials();
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    fetchAllMaterials();
  }, []);

  return (
    <div className="dashboard-page-content">
      {/* Este ref marca el área que MagicBento “animará” */}
      <div
        ref={wrapperRef}
        className="dashboard-wrapper"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <Sidebar />

        <div className="container">
          <MagicBento
            container={wrapperRef.current}
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
          />
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
    </div>
  );
};
