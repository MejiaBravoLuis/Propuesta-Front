// Sidebar.jsx
import { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUserDetails } from "../../shared/hooks/useUserDetails";

import IconCategoria from "../../assets/icons/reports.png";
import IconQuiz from "../../assets/icons/lecciones.png";
import IconCursos from "../../assets/icons/courses.png";
import IconForos from "../../assets/icons/foros.png";
import IconMaterial from "../../assets/icons/material.png";
import IconStats from "../../assets/icons/stats.png";
import IconLogout from "../../assets/icons/logout.png";

const { Sider } = Layout;

const teacherMenuItems = [
  { key: "category",    label: "Cursos",       icon: <img src={IconCursos}    alt="" style={{ width: 20 }} /> },
  { key: "foros",     label: "Foros",        icon: <img src={IconForos}     alt="" style={{ width: 20 }} /> },
  { key: "material",  label: "Material",     icon: <img src={IconMaterial}  alt="" style={{ width: 20 }} /> },
  { key: "cuestionarios",  label: "Quiz",     icon: <img src={IconQuiz}  alt="" style={{ width: 20 }} /> },
  { key: "progreso",  label: "Mi Progreso",  icon: <img src={IconStats}     alt="" style={{ width: 20 }} /> },
  { key: "logout",    label: "Cerrar sesión",icon: <img src={IconLogout}    alt="" style={{ width: 20 }} /> },
];

const adminMenuItems = [
  { key: "cursos",    label: "Cursos",       icon: <img src={IconCursos}  alt="" style={{ width: 20 }} /> },
  { key: "category", label: "Categorías", icon: <img src={IconCategoria} alt="" style={{ width: 20 }} /> },
  ...teacherMenuItems.slice(0, -1),
  teacherMenuItems[teacherMenuItems.length - 1],
];

const studentMenuItems = [
  { key: "category",    label: "Cursos",       icon: <img src={IconCursos}  alt="" style={{ width: 20 }} /> },
  { key: "progreso",  label: "Mi Progreso",  icon: <img src={IconStats}   alt="" style={{ width: 20 }} /> },
  { key: "logout",    label: "Cerrar sesión",icon: <img src={IconLogout}  alt="" style={{ width: 20 }} /> },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const { role } = useUserDetails();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems =
    role === "ADMIN"   ? adminMenuItems  :
    role === "TUTOR" ? teacherMenuItems:
                         studentMenuItems;

  const onMenuClick = ({ key }) => {
    if (key === "logout") {
      localStorage.clear();
      navigate("/auth");
      return;
    }
    if (key === "edu") {
      navigate("/dashboard");
      return;
    }
    switch (key) {
      case "category":
        navigate("/category");
        break;
      case "usuarios":
        navigate("/usuarios");
        break;
      case "cursos":
        navigate(role === "STUDENT" ? "/STcursos" : "/cursos");
        break;
      default:
        navigate(`/${key}`);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={200}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          background: "#0b1120",
          borderRight: "1px solid #334155",
          boxShadow: "2px 0 10px rgba(0, 0, 0, 0.25)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            height: 64,
            color: "#3B82F6",
            textAlign: "center",
            lineHeight: "64px",
            fontWeight: "bold",
            fontSize: 28,
            cursor: "pointer",
            letterSpacing: 1.5,
            textShadow: "0 0 4px rgba(59, 130, 246, 0.5)",
          }}
          onClick={() => navigate("/dashboard")}
        >
          {!collapsed ? "EducaGT" : "EGT"}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["cursos"]}
          onClick={onMenuClick}
          items={menuItems}
          style={{
            marginTop: 20,
            backgroundColor: "transparent",
            color: "#94a3b8",
          }}
        />
      </Sider>
    </motion.div>
  );
};
