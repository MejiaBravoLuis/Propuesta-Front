import React from "react";
import { Modal, Avatar, Typography, Space, Button, Divider } from "antd";
import ProfileImage from "../assets/img/ye.png";  // Si el usuario no tiene imagen, usaremos esta predeterminada

const { Text, Title } = Typography;

export const UserProfileModal = ({ visible, onClose, user }) => {
  return (
    <Modal
      title="Información de Perfil"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" type="primary" onClick={onClose}>
          Cerrar
        </Button>,
      ]}
      centered
      width={300} // Ajustamos el tamaño del modal
      
    >
      {user ? (
        <Space
          direction="vertical"
          size="large"
          style={{ width: "100%", alignItems: "center" }}
        >
          <Avatar
            size={150} // Tamaño de avatar más adecuado
            src={user?.profileImage || ProfileImage} // Usamos la imagen predeterminada si no tiene avatar
            alt="Imagen de perfil"
            style={{ marginBottom: 16 }}
          />

          <Title level={4} style={{ marginBottom: 0 }}>
            {user.username || "Usuario"}
          </Title>

          <Divider style={{ margin: "8px 0" }} />

          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Text>
              <b>Rol:</b> {user.role || "No disponible"}
            </Text>
            {user.email && (
              <Text>
                <b>Email:</b> {user.email}
              </Text>
            )}
            {/* Puedes agregar más campos aquí si los tienes */}
          </Space>
        </Space>
      ) : (
        <Text>No hay información disponible</Text>
      )}
    </Modal>
  );
};
