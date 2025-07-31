// StudTeachCoursePage.jsx
import React, { useEffect, useState } from "react";
import { Spin, Alert } from "antd";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { UserProfileModal } from "../../components/UserProfileModal";
import ProfileImage from "../../assets/img/ye.png";
import { useCourse } from "../../shared/hooks/useCourse";
import { SpotlightCard } from "../../components/cards/SpotligthCard";
import "./CoursePage.css";

export const StudTeachCoursePage = () => {
  const location = useLocation();
  const { courses, loading, error, fetchAllCourses } = useCourse();
  const [user, setUser] = useState(null);
  const [profileVisible, setProfileVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    fetchAllCourses();
  }, []);

  const params = new URLSearchParams(location.search);
  const categoryId = params.get("category");

  const displayed = categoryId
    ? courses.filter(c => c.category?._id === categoryId)
    : courses;

  return (
    <div className="dashboard-page-content">
      <div className="dashboard-wrapper">
        <Sidebar />

        <div className="main-content">
          <h1>Cursos</h1>

          {loading && <Spin size="large" />}
          {error && <Alert message="Error" description={error} type="error" showIcon />}

          {!loading && !error && (
            <div className="courses-grid">
              {displayed.length === 0 ? (
                <p>No se encontraron cursos para esta categoría.</p>
              ) : (
                displayed.map(course => (
                  <Link
                    key={course._id}
                    to={`/Dcursos?course=${course._id}`}    
                    style={{ textDecoration: "none" }}
                  >
                    <SpotlightCard
                      className="custom-spotlight-card"
                      spotlightColor="rgba(58,134,255,0.2)"
                    >
                      <h3>{course.title}</h3>
                      <p>{course.description}</p>
                    </SpotlightCard>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

        <img
          src={ProfileImage}
          alt="Perfil"
          className="profile-avatar"
          onClick={() => setProfileVisible(true)}
        />
        <UserProfileModal
          visible={profileVisible}
          onClose={() => setProfileVisible(false)}
          user={user}
        />
      </div>
    </div>
  );
};
