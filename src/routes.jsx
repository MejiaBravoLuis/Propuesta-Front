import { Navigate } from "react-router-dom";
import { Auth } from "./page/auth/auth";
import { DashboardPage } from "./page/dashboard/DashboardPage";

const routes = [
  
  { path: '/dashboard', element: <DashboardPage/> },
  { path: '/auth', element: <Auth/> },
  { path: '/', element: <Navigate to={'/auth'} /> }
]

export default routes;