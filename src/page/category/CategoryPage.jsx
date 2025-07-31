import React, { useEffect, useState } from "react";
import {
  Spin,
  Alert,
  Modal,
  Form,
  Input,
  Button,
  Popconfirm,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { UserProfileModal } from "../../components/UserProfileModal";
import ProfileImage from "../../assets/img/ye.png";
import AddIcon from "../../assets/icons/create.png";
import { useCategory } from "../../shared/hooks/useCategory";
import { SpotlightCard } from "../../components/cards/SpotligthCard";
import Waves from "../../components/animations/background/waves/Waves";
import Dock from "../../components/utils/dock/DockItem";
import { useUserDetails } from "../../shared/hooks/useUserDetails";
import "./CategoryPage.css";

export const CategoryPage = () => {
  const navigate = useNavigate();
  const { role } = useUserDetails();
  const {
    categories,
    loading,
    error,
    fetchAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategory();

  const [user, setUser] = useState(null);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [form] = Form.useForm();
  const [profileVisible, setProfileVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const openCreate = () => {
    form.resetFields();
    setCurrentCategory(null);
    setCreateModalVisible(true);
  };
  const closeCreate = () => {
    setCreateModalVisible(false);
    form.resetFields();
  };
  const submitCreate = async (values) => {
    setModalLoading(true);
    await createCategory({ name: values.name, description: values.description });
    setModalLoading(false);
    closeCreate();
    fetchAllCategories();
  };

  const openEdit = (cat) => {
    setCurrentCategory(cat);
    form.setFieldsValue({ name: cat.name, description: cat.description });
    setEditModalVisible(true);
  };
  const closeEdit = () => {
    setEditModalVisible(false);
    form.resetFields();
    setCurrentCategory(null);
  };
  const submitEdit = async (values) => {
    setModalLoading(true);
    await updateCategory(currentCategory._id, {
      name: values.name,
      description: values.description,
    });
    setModalLoading(false);
    closeEdit();
    fetchAllCategories();
  };

  const confirmDelete = async (id) => {
    setModalLoading(true);
    await deleteCategory(id);
    setModalLoading(false);
    fetchAllCategories();
  };

  const dockItems =
    role === "ADMIN"
      ? [
          {
            icon: <img src={AddIcon} alt="Crear" style={{ width: 24 }} />,
            label: "Crear",
            onClick: openCreate,
          },
        ]
      : [];

  return (
    <div className="category-page-content">
      <Waves
        lineColor="rgb(99,8,125)"
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

      <div className="category-wrapper">
        <Sidebar />

        <div className="main-content">
          <h1>Categorías disponibles</h1>

          {loading && <Spin size="large" />}
          {error && <Alert message="Error" description={error} type="error" showIcon />}

          {!loading && !error && (
            categories.length === 0 ? (
              <p>No hay categorías disponibles.</p>
            ) : (
              <div className="category-list">
                {categories.map((cat) => (
                  <Link
                    key={cat._id}
                    to={`/STcursos?category=${cat._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <SpotlightCard
                      className="custom-spotlight-card"
                      spotlightColor="rgb(99,8,125)"
                      style={{ position: "relative", cursor: "pointer" }}
                    >
                      {role === "ADMIN" && (
                        <div
                          style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            display: "flex",
                            gap: 8,
                          }}
                          onClick={(e) => e.preventDefault()}
                        >
                          <Button size="small" onClick={() => openEdit(cat)}>
                            Editar
                          </Button>
                          <Popconfirm
                            title="Eliminar categoría?"
                            onConfirm={() => confirmDelete(cat._id)}
                            okText="Sí"
                            cancelText="No"
                          >
                            <Button size="small" danger>
                              Eliminar
                            </Button>
                          </Popconfirm>
                        </div>
                      )}
                      <h3>{cat.name}</h3>
                      <p>{cat.description}</p>
                    </SpotlightCard>
                  </Link>
                ))}
              </div>
            )
          )}
        </div>

        {dockItems.length > 0 && (
          <Dock
            items={dockItems}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
            style={{
              position: "fixed",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 9999,
            }}
          />
        )}

        {/* Crear Modal */}
        <Modal
          title="Crear nueva categoría"
          visible={createModalVisible}
          onCancel={closeCreate}
          onOk={() => form.submit()}
          confirmLoading={modalLoading}
        >
          <Form form={form} onFinish={submitCreate} layout="vertical">
            <Form.Item
              label="Nombre"
              name="name"
              rules={[{ required: true, message: "Ingrese nombre" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Descripción"
              name="description"
              rules={[{ required: true, message: "Ingrese descripción" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>

        {/* Editar Modal */}
        <Modal
          title="Editar categoría"
          visible={editModalVisible}
          onCancel={closeEdit}
          onOk={() => form.submit()}
          confirmLoading={modalLoading}
        >
          <Form form={form} onFinish={submitEdit} layout="vertical">
            <Form.Item
              label="Nombre"
              name="name"
              rules={[{ required: true, message: "Ingrese nombre" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Descripción"
              name="description"
              rules={[{ required: true, message: "Ingrese descripción" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>

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
    </div>
  );
};
