import React, { useEffect } from "react";
import { Layout, Spin, Alert, Card } from "antd"; 

import { Sidebar } from "../../components/Sidebar/Sidebar";  

export const ArtPage = () => {

  return (
    <Layout>
      <div className="course-page-wrapper">
        <Sidebar />
        
      </div>
    </Layout>
  );
};
