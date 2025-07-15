import { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import IconArte from "../../assets/icons/arte.png";
import IconTecno from "../../assets/icons/tecnologia.png";
import IconBio from "../../assets/icons/bio.png";
import IconMate from "../../assets/icons/mate.png";
import IconCiencias from "../../assets/icons/ciencias.png";
import IconSociales from "../../assets/icons/sociales.png";
import IconLengua from "../../assets/icons/lenguaje.png";
import IconStats from "../../assets/icons/stats.png";
import IconLogout from "../../assets/icons/logout.png";

const { Sider } = Layout;

const menuItems = [
  { key: "arte", label: "Artes", icon: <img src={IconArte} alt="" style={{ width: 20 }} /> },
  { key: "tecno", label: "Tecnología", icon: <img src={IconTecno} alt="" style={{ width: 20 }} /> },
  { key: "biolo", label: "Biología", icon: <img src={IconBio} alt="" style={{ width: 20 }} /> },
  { key: "math", label: "Matemáticas", icon: <img src={IconMate} alt="" style={{ width: 20 }} /> },
  { key: "cn", label: "CienciaN", icon: <img src={IconCiencias} alt="" style={{ width: 20 }} /> },
  { key: "cs", label: "Ciencias Sociales", icon: <img src={IconSociales} alt="" style={{ width: 20 }} /> },
  { key: "language", label: "Lenguaje", icon: <img src={IconLengua} alt="" style={{ width: 20 }} /> },
  { key: "progress", label: "Mi Progreso", icon: <img src={IconStats} alt="" style={{ width: 20 }} /> },
  { key: "logout", label: "Cerrar sesión", icon: <img src={IconLogout} alt="" style={{ width: 20 }} /> },
];

export const Sidebar = () => {
  const navigate = useNavigate();  // Usamos el hook de react-router-dom para la navegación

  const [collapsed, setCollapsed] = useState(false);

  const onMenuClick = ({ key }) => {
    if (key === "logout") {
      localStorage.clear();
      navigate("/auth"); // Redirige a la página de autenticación al cerrar sesión
      return;
    }

    if (key === "edu") {  // Si el usuario hace clic en "EducaGT", lo redirigimos al Dashboard
      navigate("/dashboard");
      return;
    }

    navigate(`/${key}`); // Para todas las otras rutas
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={200}
        style={{
          position: "fixed", // Fija la sidebar en la pantalla
          top: 0,
          left: 0,
          height: "100vh", // Ocupa toda la altura de la pantalla
          background: "#001529",
          zIndex: 10, // Asegura que esté encima del contenido
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
            cursor: "pointer", // Hace clic en "EducaGT" para redirigir al Dashboard
          }}
          onClick={() => onMenuClick({ key: "edu" })}  // Aquí manejamos el clic en el título
        >
          {!collapsed ? "EducaGT" : "EGT"}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["arte"]}
          onClick={onMenuClick}
          items={menuItems}
          style={{ marginTop: 20 }}
        />
      </Sider>
    </motion.div>
  );
};
