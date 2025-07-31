import React, { useEffect, useState } from "react";
import {
  Spin,
  Alert,
  Modal,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
} from "antd";
import { useNavigate } from "react-router-dom";     
import { Sidebar } from "../../components/Sidebar/Sidebar";
import AddIcon from "../../assets/icons/create.png";
import EditIcon from "../../assets/icons/edit.png";
import DeleteIcon from "../../assets/icons/delete.png";
import { useUserDetails } from "../../shared/hooks/useUserDetails";
import { useQuiz } from "../../shared/hooks/useQuiz";
import { useCategory } from "../../shared/hooks/useCategory";
import { useCourse } from "../../shared/hooks/useCourse";
import { SpotlightCard } from "../../components/cards/SpotligthCard";
import Dock from "../../components/utils/dock/DockItem";
import UniversalAlert from "../../components/alerts/UniversalAlert";

const { TextArea } = Input;

export const QuizPage = () => {
  const { role } = useUserDetails();
  const navigate = useNavigate();         
  const {
    quizzes,
    loading,
    error,
    fetchAllQuizzes,
    createNewQuiz,
    updateExistingQuiz,
    deleteExistingQuiz,
  } = useQuiz();
  const {
    categories,
    loading: categoriesLoading,
    fetchAllCategories,
  } = useCategory();
  const {
    courses,
    loading: coursesLoading,
    fetchAllCourses,
  } = useCourse();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [form] = Form.useForm();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertAction, setAlertAction] = useState(null);
  const [errorDetail, setErrorDetail] = useState("");

  useEffect(() => {
    fetchAllQuizzes();
    fetchAllCategories();
    fetchAllCourses();
  }, []);

  if (!["ADMIN", "TUTOR"].includes(role)) {
    return <Alert message="Acceso denegado" type="error" />;
  }

  const openCreate = () => {
    setSelectedQuiz(null);
    form.resetFields();
    setModalVisible(true);
  };

  const openEdit = (quiz) => {
    setSelectedQuiz(quiz);
    form.setFieldsValue({
      title:       quiz.title,
      description: quiz.description,
      category:    quiz.category._id,
      level:       quiz.level,
      questions:   quiz.questions.map(q => ({
        ...q,
        options: q.options.join(", "),
      })),
      course:      quiz.course._id,
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const onSubmit = async (values) => {
    setModalLoading(true);
    const questions = values.questions.map(q => ({
      questionText:  q.questionText,
      options:       q.options.split(",").map(o => o.trim()),
      correctAnswer: q.correctAnswer,
    }));

    const quizData = {
      ...values,
      questions
    };

    try {
      if (selectedQuiz) {
        await updateExistingQuiz(selectedQuiz._id, quizData);
      } else {
        await createNewQuiz(quizData);
      }
      closeModal();
      fetchAllQuizzes();
    } catch {
    } finally {
      setModalLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setAlertTitle("Eliminar Quiz");
    setAlertMessage("¿Deseas eliminar este quiz?");
    setAlertAction(() => async () => {
      await deleteExistingQuiz(id);
      fetchAllQuizzes();
    });
    setAlertVisible(true);
  };

  const dockItems = [
    {
      icon: <img src={AddIcon} alt="Crear" style={{ width: 24 }} />,
      label: "Crear",
      onClick: openCreate,
    },
  ];

  return (
    <div className="dashboard-page-content">
      <div className="dashboard-wrapper">
        <Sidebar />

        <div className="main-content">
          <h1>Quizzes disponibles</h1>
          {loading && <Spin size="large" />}
          {error && <Alert message={error} type="error" />}
          {!loading && !error && (
            <>
              {quizzes.length === 0 && <p>No hay quizzes.</p>}
              <div style={{ display: "grid", gap: 16 }}>
                {quizzes.map((q) => (
                  <SpotlightCard
                    key={q._id}
                    spotlightColor="rgba(0,229,255,0.2)"
                    onClick={() => openEdit(q)}
                  >
                    <h3>{q.title}</h3>
                    <p><strong>Nivel:</strong> {q.level}</p>
                    <p><strong>Categoría:</strong> {q.category?.name}</p>
                    <p><strong>Curso:</strong> {q.course?.title}</p>
                    <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                      <Button
                        type="primary"
                        size="small"
                        onClick={() => navigate(`/cuestionariosD?quiz=/${q._id}`)}
                      >
                        Resolver
                      </Button>
                      <img
                        src={EditIcon}
                        alt="Editar"
                        style={{ cursor: "pointer", width: 20 }}
                        onClick={() => openEdit(q)}
                      />
                      <img
                        src={DeleteIcon}
                        alt="Eliminar"
                        style={{ cursor: "pointer", width: 20 }}
                        onClick={() => confirmDelete(q._id)}
                      />
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </>
          )}
        </div>

        <Dock
          items={dockItems}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />

        <UniversalAlert
          visible={alertVisible}
          title={alertTitle}
          message={alertMessage}
          onConfirm={alertAction}
          onCancel={() => setAlertVisible(false)}
          errorDetail={errorDetail}
        />

        <Modal
          title={selectedQuiz ? "Editar Quiz" : "Crear Quiz"}
          visible={modalVisible}
          onCancel={closeModal}
          footer={null}
          destroyOnClose
        >
          <Form form={form} layout="vertical" onFinish={onSubmit}>
            <Form.Item
              label="Título"
              name="title"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Descripción"
              name="description"
              rules={[{ required: true }]}
            >
              <TextArea rows={3} />
            </Form.Item>
            <Form.Item
              label="Categoría"
              name="category"
              rules={[{ required: true }]}
            >
              <Select loading={categoriesLoading}>
                {categories.map((c) => (
                  <Select.Option key={c._id} value={c._id}>
                    {c.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Curso"
              name="course"
              rules={[{ required: true }]}
            >
              <Select loading={coursesLoading}>
                {courses.map((c) => (
                  <Select.Option key={c._id} value={c._id}>
                    {c.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Nivel"
              name="level"
              initialValue="Beginner"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="Beginner">Principiante</Select.Option>
                <Select.Option value="Intermediate">Intermedio</Select.Option>
                <Select.Option value="Advanced">Avanzado</Select.Option>
              </Select>
            </Form.Item>

            <Form.List
              name="questions"
              rules={[
                {
                  validator: async (_, v) =>
                    !v || v.length < 1
                      ? Promise.reject("Agrega al menos 1 pregunta")
                      : Promise.resolve(),
                },
              ]}
            >
              {(fields, { add, remove }) => (
                <>
                  <Button type="dashed" onClick={() => add()}>
                    + Agregar Pregunta
                  </Button>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row gutter={16} key={key} style={{ marginTop: 12 }}>
                      <Col span={8}>
                        <Form.Item
                          {...restField}
                          label="Pregunta"
                          name={[name, "questionText"]}
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="Texto de la pregunta" />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          {...restField}
                          label="Opciones (separadas por coma)"
                          name={[name, "options"]}
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="Opt1, Opt2, Opt3, Opt4" />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          label="Correcta"
                          name={[name, "correctAnswer"]}
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="Respuesta correcta" />
                        </Form.Item>
                      </Col>
                      <Col span={2} style={{ display: "flex", alignItems: "center" }}>
                        <Button danger onClick={() => remove(name)}>
                          Eliminar
                        </Button>
                      </Col>
                    </Row>
                  ))}
                </>
              )}
            </Form.List>

            <Form.Item style={{ marginTop: 16 }}>
              <Button type="primary" htmlType="submit" loading={modalLoading}>
                {selectedQuiz ? "Actualizar" : "Crear"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};
