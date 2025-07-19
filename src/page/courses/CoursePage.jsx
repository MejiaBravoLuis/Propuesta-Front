import React, { useEffect, useState } from "react";
import { Spin, Alert, Modal, Form, Input, Select, Button } from "antd";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import AddIcon from "../../assets/icons/create.png";  
import EditIcon from "../../assets/icons/edit.png";  
import DeleteIcon from "../../assets/icons/delete.png";  
import { useCourse } from "../../shared/hooks/useCourse";
import { useCategory } from "../../shared/hooks/useCategory"; 
import { SpotlightCard } from "../../components/cards/SpotligthCard";
import Dock from "../../components/utils/dock/DockItem";
import UniversalAlert from "../../components/alerts/UniversalAlert";

export const CoursePage = () => {
  const { courses, loading, error, fetchAllCourses, createCourse, updateCourse, deleteCourse } = useCourse();
  const { categories, loading: categoriesLoading, error: categoriesError, fetchAllCategories } = useCategory();

  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);  
  const [form] = Form.useForm();  
  const [alertVisible, setAlertVisible] = useState(false); 
  const [alertMessage, setAlertMessage] = useState(""); 
  const [alertTitle, setAlertTitle] = useState(""); 
  const [alertAction, setAlertAction] = useState(null); 
  const [errorDetail, setErrorDetail] = useState(""); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    fetchAllCategories(); 
    fetchAllCourses(); 
  }, []);

  const handleCreateClick = () => {
    setModalVisible(true);
    setSelectedCourse(null); 
  };

  const handleCancelModal = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setModalLoading(true);
    const { title, description, category, level } = values;

    const courseData = {
      title,
      description,
      category,
      level
    };

    let result;
    if (selectedCourse) {
      result = await updateCourse(selectedCourse._id, courseData);
    } else {
      result = await createCourse(courseData);
    }

    setModalLoading(false);

    if (result) {
      setModalVisible(false);  
      form.resetFields();
      fetchAllCourses(); 
    }
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setModalVisible(true); 
    form.setFieldsValue({ 
      title: course.title,
      description: course.description,
      category: course.category._id,
      level: course.level,
    });
  };

  const handleDeleteCourse = (courseId) => {
    setAlertTitle("Eliminar Curso");
    setAlertMessage("¿Estás seguro de que deseas eliminar este curso?");
    setAlertAction(() => async () => {
      const success = await deleteCourse(courseId);

      if (success) {
        fetchAllCourses();  
      } else {
        setErrorDetail("No se pudo eliminar el curso. Por favor, intenta nuevamente.");
        setAlertTitle("Error al eliminar el curso");
        setAlertMessage("Hubo un problema al eliminar el curso.");
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
                    <Alert message="Error" description={error} type="error" showIcon />
                  )}

                  {!loading && !error && (
                    <div style={{ display: "grid", gap: "16px" }}>
                      {courses.length === 0 ? (
                        <p>No hay cursos disponibles.</p>
                      ) : (
                        courses.map((course) => (
                          <SpotlightCard
                            key={course._id}
                            className="custom-spotlight-card"
                            spotlightColor="rgba(0, 229, 255, 0.2)"
                            onClick={() => handleSelectCourse(course)}
                          >
                            <h3>{course.title}</h3>
                            <p><strong>Nivel:</strong> {course.level}</p>
                            <p><strong>Categoría:</strong> {course.category?.name || "N/A"}</p>
                            <p><strong>Creado por:</strong> {course.createdBy?.username || "N/A"}</p>
                            <p>{course.description}</p>

                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <img
                                src={EditIcon}
                                alt="Editar"
                                style={{ cursor: "pointer", width: 20, height: 20 }}
                                onClick={() => handleSelectCourse(course)}
                              />
                              <img
                                src={DeleteIcon}
                                alt="Eliminar"
                                style={{ cursor: "pointer", width: 20, height: 20 }}
                                onClick={() => handleDeleteCourse(course._id)}
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
          title={selectedCourse ? "Editar Curso" : "Crear nuevo curso"}
          visible={modalVisible}
          onCancel={handleCancelModal}
          footer={null}
          destroyOnClose
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Título"
              name="title"
              rules={[{ required: true, message: "Por favor ingrese el título del curso" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Descripción"
              name="description"
              rules={[{ required: true, message: "Por favor ingrese una descripción" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
              label="Categoría"
              name="category"
              rules={[{ required: true, message: "Por favor seleccione una categoría" }]}
            >
              <Select>
                {categoriesLoading ? (
                  <Select.Option value="loading">Cargando categorías...</Select.Option>
                ) : (
                  categories.map((category) => (
                    <Select.Option key={category._id} value={category._id}>
                      {category.name}
                    </Select.Option>
                  ))
                )}
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

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={modalLoading}>
                {selectedCourse ? "Actualizar Curso" : "Crear Curso"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};
