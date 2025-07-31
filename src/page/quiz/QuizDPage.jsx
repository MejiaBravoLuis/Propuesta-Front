// src/pages/QuizDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, Alert, Card, Button } from "antd";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { UserProfileModal } from "../../components/UserProfileModal";
import { useQuiz } from "../../shared/hooks/useQuiz";
import ProfileImage from "../../assets/img/ye.png";

export const QuizDetailPage = () => {
  const { id } = useParams();
  const { fetchQuizById, submitQuizAnswers } = useQuiz();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [profileVisible, setProfileVisible] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const q = await fetchQuizById(id);
        setQuiz(q);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleChange = (questionText, value) => {
    setAnswers((a) => ({ ...a, [questionText]: value }));
  };

  const handleSubmit = async () => {
    const payload = Object.entries(answers).map(([questionText, selected]) => ({
      questionText,
      selected,
    }));
    try {
      const res = await submitQuizAnswers(id, payload);
      setResult(res);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Spin />;
  if (error) return <Alert message={error} type="error" />;
  if (!quiz) return <p>Quiz no encontrado.</p>;

  if (result) {
    return (
      <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
        <h2>
          Puntuación: {result.score} / {result.total} ({result.percentage}
          %)
        </h2>
        {result.results.map((r) => (
          <Card
            key={r.question}
            title={r.question}
            style={{ marginBottom: 12 }}
            bordered={r.isCorrect}
          >
            <p>Tu respuesta: {r.selected ?? "—"}</p>
            {!r.isCorrect && <p>Correcta: {r.correct}</p>}
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="dashboard-page-content">
      <Sidebar />
      <main style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
        <h1>{quiz.title}</h1>
        <p>{quiz.description}</p>
        {quiz.questions.map((q, i) => (
          <Card key={i} style={{ marginBottom: 16 }}>
            <h3>{q.questionText}</h3>
            {q.options.map((opt) => (
              <div key={opt}>
                <label>
                  <input
                    type="radio"
                    name={q.questionText}
                    value={opt}
                    onChange={() => handleChange(q.questionText, opt)}
                  />{" "}
                  {opt}
                </label>
              </div>
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
