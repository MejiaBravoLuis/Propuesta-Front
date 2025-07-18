import React, { useEffect, useState } from "react";
import { Spin, Alert, Modal, Form, Input, Button } from "antd";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { UserProfileModal } from "../../components/UserProfileModal";
import ProfileImage from "../../assets/img/ye.png";
import AddIcon from "../../assets/icons/create.png"; // Imagen de crear
import { useCategory } from "../../shared/hooks/useCategory"; // Suponiendo que tienes el hook useCategory
import { SpotlightCard } from "../../components/cards/SpotligthCard";
import Waves from "../../components/animations/background/waves/Waves";
import Dock from "../../components/utils/dock/DockItem";
import './CategoryPage.css'

export const CategoryPage = () => {
  const { categories, loading, error, fetchAllCategories, createCategory } =
    useCategory();

  const [user, setUser] = useState(null);
  const [createCategoryModalVisible, setCreateCategoryModalVisible] =
    useState(false); // Modal de agregar categoría
  const [profileModalVisible, setProfileModalVisible] = useState(false); // Modal del perfil
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // Para manejar la categoría seleccionada
  const [form] = Form.useForm(); // Formulario de Ant Design

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const handleCreateClick = () => {
    setCreateCategoryModalVisible(true);
  };

  const handleCancelCreateCategoryModal = () => {
    setCreateCategoryModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setModalLoading(true);
    const { name, description } = values;

    const newCategory = { name, description };

    const createdCategory = await createCategory(newCategory);
    setModalLoading(false);

    if (createdCategory) {
      setCreateCategoryModalVisible(false);
      form.resetFields();
      fetchAllCategories(); // Actualiza la lista de categorías después de crear una
    }
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const items = [
    {
      icon: <img src={AddIcon} alt="Crear" style={{ width: 24, height: 24 }} />,
      label: "Crear",
      onClick: handleCreateClick,
      disabled: false,
    },
  ];

  return (
    <div
      className="category-page-content"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <Waves
        lineColor="rgb(99, 8, 125)"
        backgroundColor="transparent"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
      />
      <div
        className="category-wrapper"
        style={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <Sidebar />
        <div
          className="main-content"
          style={{ flex: 1, paddingBottom: "80px" }}
        >
          <div className="bottom-panel">
            <div className="category-content-area">
              <h1>Categorías disponibles</h1>

              {loading && <Spin size="large" />}
              {error && (
                <Alert
                  message="Error"
                  description={error}
                  type="error"
                  showIcon
                />
              )}

              {!loading && !error && (
                <>
                  {categories.length === 0 ? (
                    <p>No hay categorías disponibles.</p>
                  ) : (
                    <div
                      style={{
                        display: "flex", // Cambiar a flexbox
                        flexDirection: "column", // Asegura que se agreguen abajo
                        gap: "16px", // Espaciado entre las categorías
                      }}
                    >
                      {categories.map((category) => (
                        <SpotlightCard
                          key={category._id}
                          className="custom-spotlight-card"
                          spotlightColor="rgb(99, 8, 125)"
                          onClick={() => handleSelectCategory(category)}
                        >
                          <h3>{category.name}</h3>
                          <p>{category.description}</p>
                        </SpotlightCard>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <Dock
          items={items}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
          style={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            background: "transparent",
          }}
        />

        <Modal
          title="Crear nueva categoría"
          visible={createCategoryModalVisible}
          onCancel={handleCancelCreateCategoryModal}
          onOk={handleSubmit}
          confirmLoading={modalLoading}
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Nombre de la categoría"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el nombre de la categoría",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Descripción"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese una descripción",
                },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={modalLoading}>
                Crear Categoría
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <img
          src={ProfileImage}
          alt="Perfil"
          onClick={() => setProfileModalVisible(true)}
          className="profile-avatar"
        />
        <UserProfileModal
          visible={profileModalVisible}
          onClose={() => setProfileModalVisible(false)}
          user={user}
        />
      </div>
    </div>
  );
};
