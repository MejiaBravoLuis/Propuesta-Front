import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Spin, Alert, Descriptions, Button, Card } from "antd";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { UserProfileModal } from "../../components/UserProfileModal";
import ProfileImage from "../../assets/img/ye.png";
import { useCourse } from "../../shared/hooks/useCourse";
import { useQuiz } from "../../shared/hooks/useQuiz";
import { useMaterials } from "../../shared/hooks/useMaterials"; 
import "./CoursePage.css";

export const CoursePage = () => {
  const location = useLocation();
  const {
    course,
    loading: courseLoading,
    error: courseError,
    fetchCourseById,
  } = useCourse();
  const {
    quizzes,
    loading: quizLoading,
    error: quizError,
    fetchAllQuizzes,
  } = useQuiz();
  const {
    materials,
    loading: matLoading,
    error: matError,
    fetchAllMaterials,
  } = useMaterials(); // <-- nuevo

  const [user, setUser] = useState(null);
  const [profileVisible, setProfileVisible] = useState(false);

  // Obtener el ID de la query string
  const params = new URLSearchParams(location.search);
  const courseId = params.get("course");

  // Cargar curso, quizzes y materiales cuando cambie courseId
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));

    if (courseId) {
      fetchCourseById(courseId);
      fetchAllQuizzes();
      fetchAllMaterials(); // <-- nuevo: obtenemos todo y luego filtramos
    }
  }, [location.search]);

  // Filtrar quizzes y materiales por courseId
  const relatedQuizzes = quizzes.filter((q) => q.course?._id === courseId);
  const relatedMaterials = materials.filter(
    (m) => (m.course?._id || m.course) === courseId
  );

  const loadingAny = courseLoading || quizLoading || matLoading;

  return (
    <div className="course-detail-content">
      <Sidebar />

      <main className="course-detail-main">
        {loadingAny ? (
          <Spin size="large" />
        ) : courseError ? (
          <Alert message="Error" description={courseError} type="error" showIcon />
        ) : !course ? (
          <p className="empty-state">Curso no encontrado.</p>
        ) : (
          <>
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
              {matError && (
                <Alert message="Error" description={matError} type="error" showIcon />
              )}
              <Card className="materials-card" bordered={false}>
                {relatedMaterials.length > 0 ? (
                  <div className="materials-grid">
                    {relatedMaterials.map((mat) => (
                      <div key={mat._id} className="material-card">
                        <h3 className="material-title">{mat.title}</h3>
                        <p className="material-description">{mat.description}</p>
                        <Button
                          className="action-button"
                          onClick={() => window.open(mat.content || mat.link, "_blank")}
                        >
                          Ver material
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="empty-state">No hay materiales para este curso.</p>
                )}
              </Card>
            </section>

            <section>
              <h2 className="section-title">Quizzes</h2>
              {quizError && (
                <Alert message="Error" description={quizError} type="error" showIcon />
              )}
              <Card className="quizzes-card" bordered={false}>
                {relatedQuizzes.length > 0 ? (
                  <div className="quizzes-grid">
                    {relatedQuizzes.map((q) => (
                      <div key={q._id} className="quiz-card">
                        <h3 className="quiz-title">{q.title}</h3>
                        <p className="quiz-description">{q.summary}</p>
                        <Button
                          className="action-button"
                          onClick={() => window.location.href = `/cuestionariosD/${q._id}`}
                        >
                          Tomar quiz
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="empty-state">No hay quizzes relacionados a este curso.</p>
                )}
              </Card>
            </section>
          </>
        )}
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
