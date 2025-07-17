import React, { useEffect, useState } from "react";
import { Spin, Alert } from "antd";

import { Sidebar } from "../../components/Sidebar/Sidebar";
import { UserProfileModal } from "../../components/UserProfileModal";
import ProfileImage from "../../assets/img/ye.png";
import { useForums } from "../../shared/hooks/useForums";
import { SpotlightCard } from "../../components/cards/SpotligthCard";

export const ForumPage = () => {
  const { forums, loading, error, fetchAllForums } = useForums();

  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    fetchAllForums();
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
                  <h1>Foros disponibles</h1>

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
                      {forums.length === 0 ? (
                        <p>No hay foros disponibles.</p>
                      ) : (
                        <div
                          style={{
                            display: "grid",
                            gap: "16px",
                            gridTemplateColumns:
                              "repeat(auto-fill, minmax(250px, 1fr))",
                          }}
                        >
                          {forums.map((forum) => (
                            <SpotlightCard
                              key={forum._id}
                              className="custom-spotlight-card"
                              spotlightColor="rgba(0, 229, 255, 0.2)"
                            >
                              <h3>{forum.title}</h3>
                              <p><strong>Categoría:</strong> {forum.category?.name || "N/A"}</p>
                              <p><strong>Por:</strong> {forum.createdBy?.username || "N/A"}</p>
                              <p>{forum.description}</p>
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
