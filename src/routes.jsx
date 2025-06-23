import { Navigate } from "react-router-dom";
import { Auth } from "./page/auth/auth";

const routes = [
  { path: '/auth', element: <Auth/> },
  { path: '/', element: <Navigate to={'/auth'} /> }
]

export default routes;