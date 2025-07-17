import React, { useEffect, useState } from "react";
import { Spin, Alert } from "antd";

import { Sidebar } from "../../components/Sidebar/Sidebar";
import { UserProfileModal } from "../../components/UserProfileModal";
import ProfileImage from "../../assets/img/ye.png";
import { useMaterials } from "../../shared/hooks/useMaterials";
import { SpotlightCard } from "../../components/cards/SpotligthCard";

export const MaterialPage = () => {
  const { materials, loading, error, fetchAllMaterials } = useMaterials();

  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    fetchAllMaterials();
  }, []);

  return (
    <div className="dashboard-page-content">
      <div className="dashboard-wrapper">
        <Sidebar />

        <div className="main-content">
          <div className="bottom-panel">
            <div className="dashboard-content-area">
              <div className="cards-and-stepper">
                <div className="stepper-container">
                  <h1>Material disponible</h1>

                  {loading && <Spin size="large" />}
                  {error && (
                    <Alert
                      message="Error"
                      description={error}
                      type="error"
                      showIcon
                    />
                  )}

                  {!loading && !error && (
                    <>
                      {materials.length === 0 ? (
                        <p>No hay material disponible.</p>
                      ) : (
                        <div
                          style={{
                            display: "grid",
                            gap: "16px",
                            gridTemplateColumns:
                              "repeat(auto-fill, minmax(250px, 1fr))",
                          }}
                        >
                          {materials.map((material) => (
                            <SpotlightCard
                              key={material._id}
                              className="custom-spotlight-card"
                              spotlightColor="rgba(0, 229, 255, 0.2)"
                            >
                              <h3>{material.title}</h3>
                              <p><strong>Categoría:</strong> {material.category?.name || "N/A"}</p>
                              <p><strong>Curso:</strong> {material.course?.title || "N/A"}</p>
                              <p><strong>Nivel:</strong> {material.level}</p>
                              <p><strong>Por:</strong> {material.createdBy?.username || "N/A"}</p>
                              <p>{material.description}</p>
                            </SpotlightCard>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
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
    </div>
  );
};
