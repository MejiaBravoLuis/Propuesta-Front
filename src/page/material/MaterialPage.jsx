// src/pages/MaterialPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { Spin, Alert, Modal, Form, Input, Select, Button, message } from "antd";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { UserProfileModal } from "../../components/UserProfileModal";
import ProfileImage from "../../assets/img/ye.png";
import AddIcon from "../../assets/icons/create.png";
import EditIcon from "../../assets/icons/edit.png";
import DeleteIcon from "../../assets/icons/delete.png";
import { useMaterials } from "../../shared/hooks/useMaterials";
import { useCategory } from "../../shared/hooks/useCategory";
import { useCourse } from "../../shared/hooks/useCourse";
import { SpotlightCard } from "../../components/cards/SpotligthCard";
import Dock from "../../components/utils/dock/DockItem";
import "./MaterialPage.css";

export const MaterialPage = () => {
  // Hooks de datos
  const {
    materials,
    loading,
    error,
    fetchAllMaterials,
    createNewMaterial,
    updateExistingMaterial,
    deleteExistingMaterial,
  } = useMaterials();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchAllCategories,
  } = useCategory();
  const {
    courses: courseList,
    loading: coursesLoading,
    error: coursesError,
    fetchAllCourses,
  } = useCourse();

  // Estados locales
  const [user, setUser] = useState(null);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [materialModalVisible, setMaterialModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [form] = Form.useForm();
  const wrapperRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Cargar user y datos iniciales
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchAllCategories();
    fetchAllCourses();
    fetchAllMaterials();
  }, []);

  // Abrir modal para agregar
  const openModalForAdd = () => {
    setSelectedMaterial(null);
    form.resetFields();
    setMaterialModalVisible(true);
  };

  // Abrir modal para editar
  const openModalForEdit = (material) => {
    setSelectedMaterial(material);
    form.setFieldsValue({
      title: material.title,
      description: material.description,
      content: material.content,
      category: material.category._id,
      course: material.course._id,
      level: material.level,
    });
    setMaterialModalVisible(true);
  };

  // Eliminar material
  const handleDelete = async (id) => {
    try {
      await deleteExistingMaterial(id);
      message.success("Material eliminado");
    } catch (err) {
      console.error("Error eliminando material:", err);
      message.error("Error al eliminar material");
    }
  };

  // Crear / actualizar material
  const handleSubmit = async (values) => {
    setModalLoading(true);
    try {
      if (selectedMaterial) {
        await updateExistingMaterial(selectedMaterial._id, values);
        message.success("Material actualizado");
      } else {
        await createNewMaterial(values);
        message.success("Material creado");
      }
      setMaterialModalVisible(false);
      form.resetFields();
      fetchAllMaterials();
    } catch (err) {
      console.error("Error saving material:", err);
      const msg = err.response?.data?.message || err.message;
      message.error(`Error al guardar material: ${msg}`);
    } finally {
      setModalLoading(false);
    }
  };

  // Dock item
  const dockItems = [
    {
      icon: (
        <img src={AddIcon} alt="Agregar" style={{ width: 24, height: 24 }} />
      ),
      label: "Agregar",
      onClick: openModalForAdd,
    },
  ];

  const filteredMaterials = materials.filter((mat) => {
    const matchCategory = selectedCategory
      ? mat.category?._id === selectedCategory
      : true;
    const matchCourse = selectedCourse
      ? mat.course?._id === selectedCourse
      : true;
    return matchCategory && matchCourse;
  });

  return (
    <div className="dashboard-page-content">
      <div ref={wrapperRef} className="dashboard-wrapper">
        <Sidebar />

        <div style={{ padding: "24px" }}>
          <h1 style={{ textAlign: "center", marginBottom: "24px" }}>
            Lista de material
          </h1>
          <div
            style={{
              display: "flex",
              gap: 16,
              marginBottom: 24,
              justifyContent: "center",
            }}
          >
            <Select
              placeholder="Filtrar por categoría"
              allowClear
              style={{ width: 200 }}
              onChange={(value) => setSelectedCategory(value || null)}
              loading={categoriesLoading}
              value={selectedCategory}
            >
              {categories.map((cat) => (
                <Select.Option key={cat._id} value={cat._id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>

            <Select
              placeholder="Filtrar por curso"
              allowClear
              style={{ width: 200 }}
              onChange={(value) => setSelectedCourse(value || null)}
              loading={coursesLoading}
              value={selectedCourse}
            >
              {courseList.map((course) => (
                <Select.Option key={course._id} value={course._id}>
                  {course.title}
                </Select.Option>
              ))}
            </Select>
          </div>

          {loading && (
            <Spin
              size="large"
              style={{ display: "block", margin: "40px auto" }}
            />
          )}
          {(error || categoriesError || coursesError) && (
            <Alert
              message="Error al cargar datos"
              description={error || categoriesError || coursesError}
              type="error"
              showIcon
              style={{ margin: "24px 0" }}
            />
          )}

          {!loading &&
            !(error || categoriesError || coursesError) &&
            (filteredMaterials.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: "16px",
                }}
              >
                {filteredMaterials.map((mat) => (
                  <SpotlightCard
                    key={mat._id}
                    className="custom-spotlight-card"
                    spotlightColor="rgba(0, 229, 255, 0.2)"
                    style={{ borderRadius: "8px" }}
                  >
                    <h3>{mat.title}</h3>
                    <p>{mat.description}</p>
                    <p>
                      <strong>Categoría:</strong>{" "}
                      {mat.category?.name || "Sin categoría"}
                    </p>
                    <p>
                      <strong>Curso:</strong> {mat.course?.title || "Sin curso"}
                    </p>

                    {mat.content?.startsWith("http") && (
                      <div style={{ marginTop: 12 }}>
                        <a
                          href={mat.content}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontWeight: "bold", color: "#1890ff" }}
                        >
                          Ver contenido ↗
                        </a>
                      </div>
                    )}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "8px",
                        marginTop: 8,
                      }}
                    >
                      <img
                        src={EditIcon}
                        alt="Editar"
                        style={{ cursor: "pointer", width: 20, height: 20 }}
                        onClick={() => openModalForEdit(mat)}
                      />
                      <img
                        src={DeleteIcon}
                        alt="Eliminar"
                        style={{ cursor: "pointer", width: 20, height: 20 }}
                        onClick={() => handleDelete(mat._id)}
                      />
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", marginTop: 48 }}>
                <p style={{ fontSize: 18, color: "#888" }}>
                  Lo sentimos, parece ser que no tenemos este material, pero estamos trabajando 
                  para que esté disponible próximamente
                </p>
              </div>
            ))}
        </div>

        <Dock
          items={dockItems}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />

        {/* Modal agregar/editar material */}
        <Modal
          title={selectedMaterial ? "Editar Material" : "Agregar Material"}
          visible={materialModalVisible}
          onCancel={() => setMaterialModalVisible(false)}
          footer={null}
          destroyOnClose
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Título"
              name="title"
              rules={[{ required: true, message: "Ingresa un título" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Descripción"
              name="description"
              rules={[{ required: true, message: "Ingresa una descripción" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
              label="Contenido (URL o texto)"
              name="content"
              rules={[
                {
                  required: true,
                  message: "Ingresa el contenido del material",
                },
              ]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item
              label="Categoría"
              name="category"
              rules={[{ required: true, message: "Selecciona una categoría" }]}
            >
              <Select placeholder="Elige categoría" loading={categoriesLoading}>
                {categories.map((cat) => (
                  <Select.Option key={cat._id} value={cat._id}>
                    {cat.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Curso"
              name="course"
              rules={[{ required: true, message: "Selecciona un curso" }]}
            >
              <Select placeholder="Elige curso" loading={coursesLoading}>
                {courseList.map((c) => (
                  <Select.Option key={c._id} value={c._id}>
                    {c.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Nivel" name="level" initialValue="Beginner">
              <Select>
                <Select.Option value="Beginner">Beginner</Select.Option>
                <Select.Option value="Intermediate">Intermediate</Select.Option>
                <Select.Option value="Advanced">Advanced</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={modalLoading}>
                {selectedMaterial ? "Actualizar" : "Crear"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal perfil de usuario */}
        <UserProfileModal
          visible={profileModalVisible}
          onClose={() => setProfileModalVisible(false)}
          user={user}
        />

        <img
          src={ProfileImage}
          alt="Perfil"
          onClick={() => setProfileModalVisible(true)}
          className="profile-avatar"
        />
      </div>
    </div>
  );
};
