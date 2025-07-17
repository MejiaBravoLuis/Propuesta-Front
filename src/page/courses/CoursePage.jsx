import React, { useEffect, useState } from "react";
import { Spin, Alert } from "antd";

import { Sidebar } from "../../components/Sidebar/Sidebar";
import { UserProfileModal } from "../../components/UserProfileModal";
import ProfileImage from "../../assets/img/ye.png";
import { useCourse } from "../../shared/hooks/useCourse";
import { SpotlightCard } from "../../components/cards/SpotligthCard";

export const CoursePage = () => {
  const { courses, loading, error, fetchAllCourses } = useCourse();

  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    fetchAllCourses();
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
                  <h1>Cursos disponibles</h1>

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
                      {courses.length === 0 ? (
                        <p>No hay cursos disponibles.</p>
                      ) : (
                        <div style={{ display: "grid", gap: "16px" }}>
                          {courses.map((course) => (
                            <SpotlightCard
                              key={course._id}
                              className="custom-spotlight-card"
                              spotlightColor="rgba(0, 229, 255, 0.2)"
                            >
                              <h3>{course.title}</h3>
                              <p><strong>Nivel:</strong> {course.level}</p>
                              <p><strong>Categoría:</strong> {course.category?.name || "N/A"}</p>
                              <p><strong>Creado por:</strong> {course.createdBy?.username || "N/A"}</p>
                              <p>{course.description}</p>
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
