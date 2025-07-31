// src/pages/CoursePage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Spin, Alert, Descriptions, Button, Card } from "antd";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { UserProfileModal } from "../../components/UserProfileModal";
import ProfileImage from "../../assets/img/ye.png";
import { useCourse } from "../../shared/hooks/useCourse";
import { useQuiz } from "../../shared/hooks/useQuiz";
import { useMaterials } from "../../shared/hooks/useMaterials";
import "./CoursePage.css";

export const CoursePage = () => {
  const { search } = useLocation();
  const courseId = new URLSearchParams(search).get("course");

  const {
    course,
    error: courseError,
    fetchCourseById,
  } = useCourse();
  const { quizzes, fetchAllQuizzes } = useQuiz();
  const { materials, fetchAllMaterials } = useMaterials();

  const [pageLoading, setPageLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profileVisible, setProfileVisible] = useState(false);

  // Leer usuario
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Carga inicial de datos SOLO cuando cambie courseId
  useEffect(() => {
    const loadAll = async () => {
      setPageLoading(true);

      if (!courseId) {
        // Si no hay courseId, paramero inválido: paramos el spinner y salimos
        setPageLoading(false);
        return;
      }

      try {
        await Promise.all([
          fetchCourseById(courseId),
          fetchAllQuizzes(),
          fetchAllMaterials(),
        ]);
      } catch (e) {
        console.error("Error cargando datos del curso:", e);
      } finally {
        setPageLoading(false);
      }
    };

    loadAll();
  }, [courseId]);  // <-- SOLO courseId como dependencia

  const relatedQuizzes = quizzes.filter((q) => q.course?._id === courseId);
  const relatedMaterials = materials.filter(
    (m) => (m.course?._id || m.course) === courseId
  );

  if (pageLoading) {
    return (
      <div className="spinner-wrapper">
        <Spin size="large" />
      </div>
    );
  }

  if (courseError) {
    return <Alert message="Error" description={courseError} type="error" showIcon />;
  }

  if (!course) {
    return <p className="empty-state">Curso no encontrado.</p>;
  }

  return (
    <div className="course-detail-content">
      <Sidebar />

      <main className="course-detail-main">
        <div className="course-header">
          <h1 className="course-title">{course.title}</h1>
        </div>

        <Card className="course-card" bordered={false}>
          <Descriptions bordered column={1} className="course-descriptions">
            <Descriptions.Item label="Descripción">
              {course.description}
            </Descriptions.Item>
            <Descriptions.Item label="Categoría">
              {course.category?.name ?? "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Nivel">
              {course.level}
            </Descriptions.Item>
            <Descriptions.Item label="Creado por">
              {course.createdBy?.username ?? "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Fecha de creación">
              {new Date(course.createdAt).toLocaleDateString()}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <section>
          <h2 className="section-title">Materiales</h2>
          {relatedMaterials.length > 0 ? (
            <Card className="materials-card" bordered={false}>
              <div className="materials-grid">
                {relatedMaterials.map((mat) => (
                  <div key={mat._id} className="material-card">
                    <h3 className="material-title">{mat.title}</h3>
                    <p className="material-description">{mat.description}</p>
                    <Button
                      className="action-button"
                      onClick={() =>
                        window.open(mat.content || mat.link, "_blank")
                      }
                    >
                      Ver material
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <p className="empty-state">No hay materiales para este curso.</p>
          )}
        </section>

        <section>
          <h2 className="section-title">Quizzes</h2>
          {relatedQuizzes.length > 0 ? (
            <Card className="quizzes-card" bordered={false}>
              <div className="quizzes-grid">
                {relatedQuizzes.map((q) => (
                  <div key={q._id} className="quiz-card">
                    <h3 className="quiz-title">{q.title}</h3>
                    <p className="quiz-description">{q.description}</p>
                    <Link to={`/cuestionariosD?quiz=${q._id}`}>
                      <Button className="action-button">Tomar quiz</Button>
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <p className="empty-state">
              No hay quizzes relacionados a este curso.
            </p>
          )}
        </section>
      </main>

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
  );
};
