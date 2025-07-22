import React, { useEffect, useState } from "react";
import { Spin, Alert, Modal, Form, Input, Select, Button, Row, Col } from "antd";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import AddIcon from "../../assets/icons/create.png";  // Aquí importamos el AddIcon
import EditIcon from "../../assets/icons/edit.png";
import DeleteIcon from "../../assets/icons/delete.png";
import { useQuiz } from "../../shared/hooks/useQuiz";
import { useCategory } from "../../shared/hooks/useCategory";
import { useCourse } from "../../shared/hooks/useCourse";
import { SpotlightCard } from "../../components/cards/SpotligthCard";
import Dock from "../../components/utils/dock/DockItem";
import UniversalAlert from "../../components/alerts/UniversalAlert";

const { TextArea } = Input;

export const QuizPage = () => {
  const { quizzes, loading, error, fetchAllQuizzes, createNewQuiz, updateExistingQuiz, deleteExistingQuiz } = useQuiz();
  const { categories, loading: categoriesLoading, error: categoriesError, fetchAllCategories } = useCategory();
  const { courses, loading: coursesLoading, error: coursesError, fetchAllCourses } = useCourse();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [form] = Form.useForm();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertAction, setAlertAction] = useState(null);
  const [errorDetail, setErrorDetail] = useState("");

  useEffect(() => {
    fetchAllQuizzes();
    fetchAllCategories();  // Asegúrate de que las categorías se obtienen al cargar el componente
    fetchAllCourses();  // Cargar los cursos desde la base de datos
  }, []);

  const handleCreateClick = () => {
    setModalVisible(true);
    setSelectedQuiz(null);
  };

  const handleCancelModal = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setModalLoading(true);
    const { title, description, category, level, questions, course } = values;

    // Validar que cada pregunta tiene respuesta correcta
    const questionsWithCorrectAnswer = questions.map(question => {
      if (!question.correctAnswer) {
        message.error("Cada pregunta debe tener una respuesta correcta");
        setModalLoading(false);
        return;
      }
      return question;
    });

    const quizData = {
      title,
      description,
      category,
      level,
      questions: questionsWithCorrectAnswer, // Asegúrate de que las preguntas tengan respuesta correcta
      course,
    };

    let result;
    if (selectedQuiz) {
      result = await updateExistingQuiz(selectedQuiz._id, quizData);
    } else {
      result = await createNewQuiz(quizData);
    }

    setModalLoading(false);

    if (result) {
      setModalVisible(false);
      form.resetFields();
      fetchAllQuizzes();
    }
  };

  const handleSelectQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setModalVisible(true);
    form.setFieldsValue({
      title: quiz.title,
      description: quiz.description,
      category: quiz.category._id,
      level: quiz.level,
      questions: quiz.questions,
      course: quiz.course._id,  // Prellenar el campo del curso
    });
  };

  const handleDeleteQuiz = (quizId) => {
    setAlertTitle("Eliminar Quiz");
    setAlertMessage("¿Estás seguro de que deseas eliminar este quiz?");
    setAlertAction(() => async () => {
      const success = await deleteExistingQuiz(quizId);

      if (success) {
        fetchAllQuizzes();
      } else {
        setErrorDetail("No se pudo eliminar el quiz. Por favor, intenta nuevamente.");
        setAlertTitle("Error al eliminar el quiz");
        setAlertMessage("Hubo un problema al eliminar el quiz.");
        setAlertVisible(true);
      }
    });
    setAlertVisible(true);
  };

  const items = [
    {
      icon: <img src={AddIcon} alt="Crear" style={{ width: 24, height: 24 }} />,
      label: 'Crear',
      onClick: handleCreateClick,
      disabled: false
    },
  ];

  // Lógica para manejar la adición y eliminación de preguntas
  const addQuestion = () => {
    const questions = form.getFieldValue("questions") || [];
    form.setFieldsValue({
      questions: [
        ...questions,
        { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
      ],
    });
  };

  const removeQuestion = (index) => {
    const questions = form.getFieldValue("questions") || [];
    form.setFieldsValue({
      questions: questions.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="dashboard-page-content">
      <div className="dashboard-wrapper">
        <Sidebar />

        <div className="main-content">
          <div className="bottom-panel">
            <div className="dashboard-content-area">
              <div className="cards-and-stepper">
                <div className="stepper-container">
                  <h1>Quizzes disponibles</h1>

                  {loading && <Spin size="large" />}
                  {error && (
                    <Alert message="Error" description={error} type="error" showIcon />
                  )}

                  {!loading && !error && (
                    <div style={{ display: "grid", gap: "16px" }}>
                      {quizzes.length === 0 ? (
                        <p>No hay quizzes disponibles.</p>
                      ) : (
                        quizzes.map((quiz) => (
                          <SpotlightCard
                            key={quiz._id}
                            className="custom-spotlight-card"
                            spotlightColor="rgba(0, 229, 255, 0.2)"
                            onClick={() => handleSelectQuiz(quiz)}
                          >
                            <h3>{quiz.title}</h3>
                            <p><strong>Nivel:</strong> {quiz.level}</p>
                            <p><strong>Categoría:</strong> {quiz.category?.name || "N/A"}</p>
                            <p><strong>Creado por:</strong> {quiz.createdBy?.username || "N/A"}</p>
                            <p>{quiz.description}</p>

                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <img
                                src={EditIcon}
                                alt="Editar"
                                style={{ cursor: "pointer", width: 20, height: 20 }}
                                onClick={() => handleSelectQuiz(quiz)}
                              />
                              <img
                                src={DeleteIcon}
                                alt="Eliminar"
                                style={{ cursor: "pointer", width: 20, height: 20 }}
                                onClick={() => handleDeleteQuiz(quiz._id)}
                              />
                            </div>
                          </SpotlightCard>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Dock
          items={items}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />

        <UniversalAlert
          visible={alertVisible}
          onConfirm={alertAction}
          onCancel={() => setAlertVisible(false)}
          title={alertTitle}
          message={alertMessage}
          errorDetail={errorDetail}
        />

        <Modal
          title={selectedQuiz ? "Editar Quiz" : "Crear nuevo quiz"}
          visible={modalVisible}
          onCancel={handleCancelModal}
          footer={null}
          destroyOnClose
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Título"
              name="title"
              rules={[{ required: true, message: "Por favor ingrese el título del quiz" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Descripción"
              name="description"
              rules={[{ required: true, message: "Por favor ingrese una descripción" }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            {/* Campo para la categoría */}
            <Form.Item
              label="Categoría"
              name="category"
              rules={[{ required: true, message: "Por favor seleccione una categoría" }]}
            >
              <Select
                loading={categoriesLoading}
                placeholder="Seleccionar categoría"
                disabled={categoriesLoading}
              >
                {categories?.map((category) => (
                  <Select.Option key={category._id} value={category._id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {/* Campo para el curso */}
            <Form.Item
              label="Curso"
              name="course"
              rules={[{ required: true, message: "Por favor seleccione un curso" }]}
            >
              <Select
                loading={coursesLoading}
                placeholder="Seleccionar curso"
                disabled={coursesLoading}
              >
                {courses?.map((course) => (
                  <Select.Option key={course._id} value={course._id}>
                    {course.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Nivel"
              name="level"
              initialValue="Beginner"
              rules={[{ required: true, message: "Por favor seleccione un nivel" }]}
            >
              <Select>
                <Select.Option value="Beginner">Principiante</Select.Option>
                <Select.Option value="Intermediate">Intermedio</Select.Option>
                <Select.Option value="Advanced">Avanzado</Select.Option>
              </Select>
            </Form.Item>

            {/* Agregar Preguntas */}
            <Form.Item
              label="Preguntas"
            >
              <Button type="dashed" onClick={addQuestion} icon={<img src={AddIcon} alt="Agregar Pregunta" style={{ width: 24, height: 24 }} />}>
                Agregar Pregunta
              </Button>

              <Form.List
                name="questions"
                initialValue={[]}
                rules={[
                  {
                    validator: async(_, names) => {
                      if (!names || names.length < 1) {
                        return Promise.reject(new Error('Al menos una pregunta debe ser agregada'));
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, fieldKey, name, fieldNames, ...restField }) => (
                      <div key={key} style={{ marginBottom: 10 }}>
                        <Row gutter={16}>
                          <Col span={8}>
                            <Form.Item
                              {...restField}
                              name={[name, 'questionText']}
                              fieldKey={[fieldKey, 'questionText']}
                              label="Texto de la pregunta"
                              rules={[{ required: true, message: 'Por favor ingrese la pregunta' }]}>
                              <Input placeholder="Pregunta" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'options']}
                              fieldKey={[fieldKey, 'options']}
                              label="Opciones"
                              rules={[{ required: true, message: 'Por favor ingrese las opciones' }]}>
                              <Input placeholder="Opciones separadas por comas" />
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item
                              {...restField}
                              name={[name, 'correctAnswer']}
                              fieldKey={[fieldKey, 'correctAnswer']}
                              label="Respuesta Correcta"
                              rules={[{ required: true, message: 'Por favor ingrese la respuesta correcta' }]}>
                              <Input placeholder="Respuesta Correcta" />
                            </Form.Item>
                            <Button
                              type="danger"
                              icon={<img src={DeleteIcon} alt="Eliminar Pregunta" style={{ width: 24, height: 24 }} />}
                              onClick={() => remove(name)}>
                              Eliminar Pregunta
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ))}
                  </>
                )}
              </Form.List>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={modalLoading}>
                {selectedQuiz ? "Actualizar Quiz" : "Crear Quiz"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};
