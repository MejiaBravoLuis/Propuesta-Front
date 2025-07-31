// src/pages/QuizDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Spin, Alert, Card, Button } from "antd";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { UserProfileModal } from "../../components/UserProfileModal";
import { useQuiz } from "../../shared/hooks/useQuiz";
import { useUserDetails } from "../../shared/hooks/useUserDetails"; 
import ProfileImage from "../../assets/img/ye.png";

export const QuizDetailPage = () => {
  const navigate = useNavigate();
  const { role } = useUserDetails();               
  const { search } = useLocation();
  const quizId = new URLSearchParams(search).get("quiz");

  const { fetchQuizById, submitQuizAnswers } = useQuiz();
  const [quiz, setQuiz]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult]   = useState(null);
  const [profileVisible, setProfileVisible] = useState(false);

  useEffect(() => {
    if (!quizId) {
      setError("ID de quiz no proporcionado");
      setLoading(false);
      return;
    }
    let mounted = true;
    (async () => {
      try {
        const q = await fetchQuizById(quizId);
        if (mounted) setQuiz(q);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [quizId, fetchQuizById]);

  const handleChange = (qText, val) =>
    setAnswers((prev) => ({ ...prev, [qText]: val }));

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = quiz.questions.map((q) => ({
        questionText: q.questionText,
        selected: answers[q.questionText] ?? null,
      }));
      const res = await submitQuizAnswers(quizId, payload);
      setResult(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spin size="large" />;
  if (error)   return <Alert message={error} type="error" showIcon />;
  if (!quiz)   return <p>Quiz no encontrado.</p>;

  if (result) {
    return (
      <div className="quiz-results">
        <h2>
          Puntuación: {result.score} / {result.total} ({result.percentage}
          %)
        </h2>
        {result.results.map((r) => (
          <Card
            key={r.question}
            title={r.question}
            style={{ marginBottom: 12 }}
            bordered={!r.isCorrect}
          >
            <p>Tu respuesta: {r.selected ?? "—"}</p>
            {!r.isCorrect && <p>Correcta: {r.correct}</p>}
          </Card>
        ))}

        <Button
          style={{ marginTop: 16, marginRight: 8 }}
          onClick={() => navigate(`/Dcursos?course=${quiz.course._id}`)}
        >
          Volver al curso
        </Button>

        {role === "TUTOR" && (
          <Button
            style={{ marginTop: 16 }}
            onClick={() => navigate("/cuestionarios")}
          >
            Volver a Quizzes
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="quiz-detail-page">
      <Sidebar />
      <main className="quiz-detail-main">
        <h1>{quiz.title}</h1>
        <p>{quiz.description}</p>
        {quiz.questions.map((q, i) => (
          <Card key={i} style={{ marginBottom: 16 }}>
            <h3>{`${i + 1}. ${q.questionText}`}</h3>
            {q.options.map((opt) => (
              <label key={opt} className="quiz-option">
                <input
                  type="radio"
                  name={q.questionText}
                  value={opt}
                  onChange={() => handleChange(q.questionText, opt)}
                />{" "}
                {opt}
              </label>
            ))}
          </Card>
        ))}
        <Button type="primary" onClick={handleSubmit}>
          Enviar respuestas
        </Button>
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
      />
    </div>
  );
};
