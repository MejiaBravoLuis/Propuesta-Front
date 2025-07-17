import { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import IconCursos from "../../assets/icons/courses.png";
import IconForos from "../../assets/icons/foros.png";
import IconMaterial from "../../assets/icons/material.png";
import IconStats from "../../assets/icons/stats.png";
import IconLogout from "../../assets/icons/logout.png";

const { Sider } = Layout;

const menuItems = [
  { key: "cursos", label: "Cursos", icon: <img src={IconCursos} alt="" style={{ width: 20 }} /> },
  { key: "foros", label: "Foros", icon: <img src={IconForos} alt="" style={{ width: 20 }} /> },
  { key: "material", label: "Material", icon: <img src={IconMaterial} alt="" style={{ width: 20 }} /> },
  { key: "progreso", label: "Mi Progreso", icon: <img src={IconStats} alt="" style={{ width: 20 }} /> },
  { key: "logout", label: "Cerrar sesión", icon: <img src={IconLogout} alt="" style={{ width: 20 }} /> },
];

export const Sidebar = () => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

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

    navigate(`/${key}`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={200}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          background: "#001529",
          zIndex: 10,
        }}
      >
        <div
          style={{
            height: 64,
            color: "white",
            textAlign: "center",
            lineHeight: "64px",
            fontWeight: "bold",
            fontSize: 28,
            cursor: "pointer",
          }}
          onClick={() => onMenuClick({ key: "edu" })}
        >
          {!collapsed ? "EducaGT" : "EGT"}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["cursos"]}
          onClick={onMenuClick}
          items={menuItems}
          style={{ marginTop: 20 }}
        />
      </Sider>
    </motion.div>
  );
};
