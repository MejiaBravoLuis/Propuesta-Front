import React, { useEffect, useState } from "react";
import { Spin, Alert, Modal, Form, Input, Select, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { UserProfileModal } from "../../components/UserProfileModal";
import ProfileImage from "../../assets/img/ye.png";
import AddIcon from "../../assets/icons/create.png";
import EditIcon from "../../assets/icons/edit.png";
import DeleteIcon from "../../assets/icons/delete.png";
import { useCourse } from "../../shared/hooks/useCourse";
import { useCategory } from "../../shared/hooks/useCategory";
import { SpotlightCard } from "../../components/cards/SpotligthCard";
import Dock from "../../components/utils/dock/DockItem";
import UniversalAlert from "../../components/alerts/UniversalAlert";

export const AdminCoursePage = () => {
  const navigate = useNavigate();
  const { 
    courses, loading, error, fetchAllCourses, 
    createCourse, updateCourse, deleteCourse 
  } = useCourse();
  const { 
    categories, loading: catLoading, error: catError, 
    fetchAllCategories 
  } = useCategory();

  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertAction, setAlertAction] = useState(null);
  const [errorDetail, setErrorDetail] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    fetchAllCategories();
    fetchAllCourses();
  }, []);

  const filteredCourses = selectedCategoryFilter
    ? courses.filter(c => c.category?._id === selectedCategoryFilter)
    : courses;

  const openCreateModal = () => {
    setSelectedCourse(null);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async values => {
    setModalLoading(true);
    const data = {
      title: values.title,
      description: values.description,
      category: values.category,
      level: values.level,
    };
    const result = selectedCourse
      ? await updateCourse(selectedCourse._id, data)
      : await createCourse(data);
    setModalLoading(false);
    if (result) {
      closeModal();
      fetchAllCourses();
    }
  };

  const handleSelectCourse = course => {
    setSelectedCourse(course);
    setModalVisible(true);
    form.setFieldsValue({
      title: course.title,
      description: course.description,
      category: course.category._id,
      level: course.level,
    });
  };

  const handleDeleteCourse = id => {
    setAlertTitle("Eliminar Curso");
    setAlertMessage("¿Seguro que deseas eliminar este curso?");
    setAlertAction(() => async () => {
      const ok = await deleteCourse(id);
      if (ok) fetchAllCourses();
      else {
        setErrorDetail("No se pudo eliminar el curso.");
        setAlertTitle("Error al eliminar");
        setAlertMessage("Hubo un problema al eliminar.");
        setAlertVisible(true);
      }
    });
    setAlertVisible(true);
  };

  const dockItems = [
    {
      icon: <img src={AddIcon} alt="Crear" style={{ width: 24 }} />,
      label: "Crear",
      onClick: openCreateModal,
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
                  <Select
                    placeholder="Filtrar por categoría"
                    allowClear
                    style={{ width: 240, marginBottom: 24 }}
                    onChange={setSelectedCategoryFilter}
                    loading={catLoading}
                    value={selectedCategoryFilter}
                  >
                    {categories.map(cat => (
                      <Select.Option key={cat._id} value={cat._id}>
                        {cat.name}
                      </Select.Option>
                    ))}
                  </Select>

                  {loading && <Spin size="large" />}
                  {(error || catError) && (
                    <Alert
                      message="Error"
                      description={error || catError}
                      type="error"
                      showIcon
                    />
                  )}

                  {!loading && !error && (
                    <div className="courses-grid">
                      {filteredCourses.length === 0 ? (
                        <p>No hay cursos disponibles.</p>
                      ) : (
                        filteredCourses.map(course => (
                          <SpotlightCard
                            key={course._id}
                            className="custom-spotlight-card"
                            spotlightColor="rgba(0, 229, 255, 0.2)"
                            style={{
                              flex: "1 1 calc(33.33% - 16px)",
                              minWidth: "300px",
                            }}
                            onClick={() => handleSelectCourse(course)}
                          >
                            <h3>{course.title}</h3>
                            <p><strong>Nivel:</strong> {course.level}</p>
                            <p><strong>Categoría:</strong> {course.category?.name}</p>
                            <p><strong>Creado por:</strong> {course.createdBy?.username}</p>
                            <p>{course.description}</p>
                            <div className="actions">
                              <img
                                src={EditIcon}
                                alt="Editar"
                                onClick={() => handleSelectCourse(course)}
                                style={{ cursor: "pointer", width: 20, height: 20 }}
                              />
                              <img
                                src={DeleteIcon}
                                alt="Eliminar"
                                onClick={() => handleDeleteCourse(course._id)}
                                style={{ cursor: "pointer", width: 20, height: 20 }}
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

        <Dock items={dockItems} panelHeight={68} baseItemSize={50} magnification={70} />

        <UniversalAlert
          visible={alertVisible}
          onConfirm={alertAction}
          onCancel={() => setAlertVisible(false)}
          title={alertTitle}
          message={alertMessage}
          errorDetail={errorDetail}
        />

        <Modal
          title={selectedCourse ? "Editar Curso" : "Crear Curso"}
          visible={modalVisible}
          onCancel={closeModal}
          footer={null}
          destroyOnClose
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Título"
              name="title"
              rules={[{ required: true, message: "Por favor ingrese el título" }]}
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
              <Select loading={catLoading}>
                {categories.map(cat => (
                  <Select.Option key={cat._id} value={cat._id}>
                    {cat.name}
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
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={modalLoading}>
                {selectedCourse ? "Actualizar Curso" : "Crear Curso"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <img src={ProfileImage} alt="Perfil" className="profile-avatar" />
        <UserProfileModal visible={false} onClose={() => {}} user={user} />
      </div>
    </div>
  );
};
