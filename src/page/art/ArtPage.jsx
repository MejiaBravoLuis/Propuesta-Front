import React, { useEffect } from "react";
import { Layout, Spin, Alert, Card } from "antd";  // Usamos los componentes de Ant Design
import { useMaterials } from "../../shared/hooks/useMaterials";  // Importamos el hook
import { useParams } from 'react-router-dom';  // Para obtener el nombre del curso de la URL

import { Sidebar } from "../../components/Sidebar/Sidebar";  // Sidebar
import "./artPage.css";  // Estilos específicos de la página de Arte

export const ArtPage = () => {
  const { courseName } = useParams();  // Obtenemos el nombre del curso desde los parámetros de la URL

  // Usamos el hook para obtener los detalles del curso
  const { course, loading, error } = useMaterials(courseName);

  return (
    <Layout>
      <div className="course-page-wrapper">
        <Sidebar />
        <div className="course-main-content">
          {loading ? (
            <Spin size="large" />  // Muestra el spinner mientras carga
          ) : error ? (
            <Alert message="Error" description={error} type="error" />  // Muestra un error si ocurre
          ) : (
            <div>
              <h1>{course.title}</h1>
              <p>{course.description}</p>
              <p><strong>Categoria:</strong> {course.category.name}</p>
              <p><strong>Creado por:</strong> {course.createdBy.username}</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
