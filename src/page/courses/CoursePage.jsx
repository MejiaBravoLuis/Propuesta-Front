import React, { useEffect, useState } from "react";
import { Spin, Alert, Modal, Form, Input, Select, Button } from "antd";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { UserProfileModal } from "../../components/UserProfileModal";
import ProfileImage from "../../assets/img/ye.png";
import AddIcon from "../../assets/icons/create.png";  // Imagen de crear
import EditIcon from "../../assets/icons/edit.png";  // Imagen de editar
import DeleteIcon from "../../assets/icons/delete.png";  // Imagen de borrar
import { useCourse } from "../../shared/hooks/useCourse";
import { SpotlightCard } from "../../components/cards/SpotligthCard";
import Dock from "../../components/utils/dock/DockItem";

export const CoursePage = () => {
  const { courses, loading, error, fetchAllCourses, createCourse, updateCourse, deleteCourse } = useCourse();

  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);  // Para manejar el curso seleccionado
  const [form] = Form.useForm();  // Formulario de Ant Design

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    fetchAllCourses();
  }, []);

  // Abrir el modal para crear un curso
  const handleCreateClick = () => {
    setModalVisible(true);
  };

  // Cerrar el modal
  const handleCancelModal = () => {
    setModalVisible(false);
    form.resetFields();
  };

  // Manejar el envío del formulario para crear el curso
  const handleSubmit = async (values) => {
    setModalLoading(true);
    const { title, description, category, level } = values;

    const newCourse = {
      title,
      description,
      category,
      level
    };

    const createdCourse = await createCourse(newCourse);
    setModalLoading(false);

    if (createdCourse) {
      setModalVisible(false);  // Cerrar el modal si la creación fue exitosa
      form.resetFields();
    }
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  // Items del dock, con íconos habilitados
  const items = [
    { 
      icon: <img src={AddIcon} alt="Crear" style={{ width: 24, height: 24 }} />,
      label: 'Crear',
      onClick: handleCreateClick,
      disabled: false  // Siempre habilitado
    },
    { 
      icon: <img src={EditIcon} alt="Editar" style={{ width: 24, height: 24 }} />,
      label: 'Editar',
      onClick: () => alert('Editar curso!'),
      disabled: !selectedCourse  // Solo habilitado si hay un curso seleccionado
    },
    { 
      icon: <img src={DeleteIcon} alt="Eliminar" style={{ width: 24, height: 24 }} />,
      label: 'Eliminar',
      onClick: () => alert('Eliminar curso!'),
      disabled: !selectedCourse  // Solo habilitado si hay un curso seleccionado
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
                            onClick={() => handleSelectCourse(course)}  // Permitir seleccionar un curso
                          >
                            <h3>{course.title}</h3>
                            <p><strong>Nivel:</strong> {course.level}</p>
                            <p><strong>Categoría:</strong> {course.category?.name || "N/A"}</p>
                            <p><strong>Creado por:</strong> {course.createdBy?.username || "N/A"}</p>
                            <p>{course.description}</p>
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

        <UserProfileModal visible={modalVisible} onClose={() => setModalVisible(false)} user={user} />

        {/* Modal de Crear Curso */}
        <Modal
          title="Crear nuevo curso"
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
                <Select.Option value="1">Categoría 1</Select.Option>
                <Select.Option value="2">Categoría 2</Select.Option>
                <Select.Option value="3">Categoría 3</Select.Option>
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
                Crear Curso
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};
