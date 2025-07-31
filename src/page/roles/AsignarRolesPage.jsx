import { useEffect, useState } from "react";
import { Table, Select, message } from "antd";
import apiClient from "../../services/api";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import "./asignarRoles.css";

export const AsignarRolesPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiClient.get("/user"); 
        setUsers(res.data.users || []); 
      } catch (error) {
        message.error("Error al cargar usuarios");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleChangeRole = async (userId, newRole) => {
    try {
      await apiClient.put(`/user/change-role/${userId}`, { role: newRole }); 
      setUsers((prev) =>
        prev.map((u) => (u.uid === userId ? { ...u, role: newRole } : u)) 
      );
      message.success("Rol actualizado correctamente");
    } catch (err) {
      message.error("Error al actualizar el rol");
    }
  };

  const columns = [
    { title: "Nombre", dataIndex: "name", key: "name" },
    { title: "Usuario", dataIndex: "username", key: "username" },
    { title: "Rol", dataIndex: "role", key: "role" },
    {
      title: "Asignar nuevo rol",
      render: (_, record) => (
        <Select
          value={record.role}
          onChange={(value) => handleChangeRole(record.uid, value)} // ✅ usamos uid
          options={[
            { label: "ADMIN", value: "ADMIN" },
            { label: "TUTOR", value: "TUTOR" },
            { label: "STUDENT", value: "STUDENT" },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="dashboard-page-content">
      <Sidebar />
      <div className="main-content">
        <h2>Asignar Roles a Usuarios</h2>
        <Table
          columns={columns}
          dataSource={users}
          loading={loading}
          rowKey="uid" 
        />
      </div>
    </div>
  );
};
