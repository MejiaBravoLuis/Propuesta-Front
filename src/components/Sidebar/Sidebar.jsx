import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import IconArte from "../../assets/icons/arte.png";
import IconTecno from "../../assets/icons/tecnologia.png";
import IconBio from "../../assets/icons/bio.png";
import IconMate from "../../assets/icons/mate.png";
import IconCiencias from "../../assets/icons/ciencias.png";
import IconSociales from "../../assets/icons/sociales.png";
import IconLengua from "../../assets/icons/lenguaje.png";
import IconStats from "../../assets/icons/stats.png";
import IconLogout from "../../assets/icons/logout.png";

import "./sidebar.css";

const links = [
  { title: "Artes", icon: IconArte, to: "/arte" },
  { title: "Tecnología", icon: IconTecno, to: "/tecno" },
  { title: "Biología", icon: IconBio, to: "/biolo" },
  { title: "Matemáticas", icon: IconMate, to: "/math" },
  { title: "CienciaN", icon: IconCiencias, to: "/cn" },
  { title: "Ciencias Sociales", icon: IconSociales, to: "/cs" },
  { title: "Lenguaje", icon: IconLengua, to: "/language" },
  { title: "Mi Progreso", icon: IconStats, to: "/progress" },
];

const HamburgerIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="7" x2="21" y2="7" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="17" x2="21" y2="17" />
  </svg>
);

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  const handleEducagt = () => {
    navigate("/dashboard")
  }

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 60 : 200 }}
      transition={{ duration: 0.3 }}
      className="sidebar"
    >
      <div className="sidebar-toggle">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.h4
              className="sidebar-title"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onClick={handleEducagt}
              
            >
              EducaGT
            </motion.h4>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="toggle-button"
          aria-label="Toggle sidebar"
        >
          <HamburgerIcon />
        </button>
      </div>

      <ul className="sidebar-list">
        {links.map(({ title, icon, to }) => (
          <NavLink
            key={title}
            to={to}
            title={title}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <img src={icon} alt={title} className="sidebar-icon" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  className="sidebar-label"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  {title}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}

        <li
          className="sidebar-item logout-item"
          onClick={handleLogout}
          title="Cerrar sesión"
          style={{ cursor: "pointer" }}
        >
          <img src={IconLogout} alt="Cerrar sesión" className="sidebar-icon" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                className="sidebar-label"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                Cerrar sesión
              </motion.span>
            )}
          </AnimatePresence>
        </li>
      </ul>
    </motion.aside>
  );
}
