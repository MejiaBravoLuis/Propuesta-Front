import React from "react";
import { Modal } from "antd";

const UniversalAlert = ({ visible, onConfirm, onCancel, title, message, errorDetail }) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Aceptar"
      cancelText="Cerrar"
    >
      <p>{message}</p>
      {errorDetail && <pre style={{ color: "red", whiteSpace: "pre-wrap" }}>{errorDetail}</pre>}
    </Modal>
  );
};

export default UniversalAlert;
