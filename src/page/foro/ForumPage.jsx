import React, { useEffect, useState } from "react";
import { Spin, Alert, Modal, Form, Input, Select, Button, message } from "antd";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import AddIcon from "../../assets/icons/create.png";  
import EditIcon from "../../assets/icons/edit.png";  
import DeleteIcon from "../../assets/icons/delete.png";  
import { useForums } from "../../shared/hooks/useForums";
import { useCategory } from "../../shared/hooks/useCategory"; 
import { SpotlightCard } from "../../components/cards/SpotligthCard";
import Dock from "../../components/utils/dock/DockItem";
import UniversalAlert from "../../components/alerts/UniversalAlert";

export const ForumPage = () => {
  const { forums, loading, error, fetchAllForums, createNewForum, updateExistingForum, deleteExistingForum } = useForums();
  const { categories, loading: categoriesLoading, error: categoriesError, fetchAllCategories } = useCategory();

  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false); 
  const [selectedForum, setSelectedForum] = useState(null);  
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
    fetchAllForums(); 
  }, []);

  const handleCreateClick = () => {
    setSelectedForum(null);  
    setModalVisible(true);
  };

  const handleCancelModal = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setModalLoading(true);
    const { title, description, category } = values;

    const forumData = { title, description, category };

    let result;
    if (selectedForum) {
      result = await updateExistingForum(selectedForum._id, forumData);
    } else {
      result = await createNewForum(forumData);
    }

    setModalLoading(false);

    if (result) {
      setModalVisible(false);
      form.resetFields();
      fetchAllForums(); 
    }
  };

  const handleSelectForum = (forum) => {
    setSelectedForum(forum);
    setModalVisible(true); 
    form.setFieldsValue({ 
      title: forum.title,
      description: forum.description,
      category: forum.category._id,
    });
  };

  const handleDeleteForum = (forumId) => {
    setAlertTitle("Eliminar Foro");
    setAlertMessage("¿Estás seguro de que deseas eliminar este foro?");
    setAlertAction(() => async () => {
      const success = await deleteExistingForum(forumId);

      if (success) {
        fetchAllForums();  
        message.success("Foro eliminado con éxito");
      } else {
        setErrorDetail("No se pudo eliminar el foro. Por favor, intenta nuevamente.");
        setAlertTitle("Error al eliminar el foro");
        setAlertMessage("Hubo un problema al eliminar el foro.");
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
    }
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
                  <h1>Foros disponibles</h1>

                  {loading && <Spin size="large" />}
                  {error && (
                    <Alert message="Error" description={error} type="error" showIcon />
                  )}

                  {!loading && !error && (
                    <div style={{ display: "grid", gap: "16px" }}>
                      {forums.length === 0 ? (
                        <p>No hay foros disponibles.</p>
                      ) : (
                        forums.map((forum) => (
                          <SpotlightCard
                            key={forum._id}
                            className="custom-spotlight-card"
                            spotlightColor="rgba(0, 229, 255, 0.2)"
                            onClick={() => handleSelectForum(forum)}
                          >
                            <h3>{forum.title}</h3>
                            <p><strong>Categoría:</strong> {forum.category?.name || "N/A"}</p>
                            <p><strong>Por:</strong> {forum.createdBy?.username || "N/A"}</p>
                            <p>{forum.description}</p>

                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <img
                                src={EditIcon}
                                alt="Editar"
                                style={{ cursor: "pointer", width: 20, height: 20 }}
                                onClick={() => handleSelectForum(forum)}
                              />
                              <img
                                src={DeleteIcon}
                                alt="Eliminar"
                                style={{ cursor: "pointer", width: 20, height: 20 }}
                                onClick={() => handleDeleteForum(forum._id)}
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
          title={selectedForum ? "Editar Foro" : "Crear nuevo foro"}
          visible={modalVisible}
          onCancel={handleCancelModal}
          footer={null}
          destroyOnClose
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Título"
              name="title"
              rules={[{ required: true, message: "Por favor ingrese el título del foro" }]}
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

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={modalLoading}>
                {selectedForum ? "Actualizar Foro" : "Crear Foro"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};
