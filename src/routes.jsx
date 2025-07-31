import { Navigate } from "react-router-dom";
import { Auth } from "./page/auth/auth";
import { DashboardPage } from "./page/dashboard/DashboardPage";
import { ArtPage } from "./page/art/ArtPage";
import { TechnologyPage } from "./page/tech/TechnologyPage";
import { BiologyPage } from "./page/bio/BiologyPage";
import { MathPage } from "./page/math/MathPage";
import { NaturalSciencesPage } from "./page/cience/NaturalSciencesPage";
import { SocialSciencesPage } from "./page/socials/SocialSciencesPage";
import { LanguagePage } from "./page/language/LanguagePage";
import { ProgressPage } from "./page/progress/ProgressPage";
import { CoursePage } from "./page/courses/CoursePage";
import { ForumPage } from "./page/foro/ForumPage";
import { MaterialPage } from "./page/material/MaterialPage";
import { CategoryPage } from "./page/category/CategoryPage";
import { QuizPage } from "./page/quiz/QuizPage";
import { AsignarRolesPage } from "./page/roles/AsignarRolesPage";
import { PrivateRoute } from "./components/PrivateRoute";

const routes = [
  { path: '/auth', element: <Auth /> },
  { path: '/dashboard', element: <PrivateRoute allowedRoles={["ADMIN", "TUTOR", "STUDENT"]}><DashboardPage /></PrivateRoute> },
  { path: '/arte', element: <PrivateRoute allowedRoles={["ADMIN", "TUTOR", "STUDENT"]}><ArtPage /></PrivateRoute> },
  { path: '/tecno', element: <PrivateRoute allowedRoles={["ADMIN", "TUTOR", "STUDENT"]}><TechnologyPage /></PrivateRoute> },
  { path: '/biolo', element: <PrivateRoute allowedRoles={["ADMIN", "TUTOR", "STUDENT"]}><BiologyPage /></PrivateRoute> },
  { path: '/math', element: <PrivateRoute allowedRoles={["ADMIN", "TUTOR", "STUDENT"]}><MathPage /></PrivateRoute> },
  { path: '/cn', element: <PrivateRoute allowedRoles={["ADMIN", "TUTOR", "STUDENT"]}><NaturalSciencesPage /></PrivateRoute> },
  { path: '/cs', element: <PrivateRoute allowedRoles={["ADMIN", "TUTOR", "STUDENT"]}><SocialSciencesPage /></PrivateRoute> },
  { path: '/language', element: <PrivateRoute allowedRoles={["ADMIN", "TUTOR", "STUDENT"]}><LanguagePage /></PrivateRoute> },
  { path: '/progreso', element: <PrivateRoute allowedRoles={["ADMIN", "TUTOR", "STUDENT"]}><ProgressPage /></PrivateRoute> },
  { path: '/cursos', element: <PrivateRoute allowedRoles={["ADMIN", "TUTOR"]}><CoursePage /></PrivateRoute> },
  { path: '/foros', element: <PrivateRoute allowedRoles={["ADMIN", "TUTOR"]}><ForumPage /></PrivateRoute> },
  { path: '/material', element: <PrivateRoute allowedRoles={["ADMIN", "TUTOR"]}><MaterialPage /></PrivateRoute> },
  { path: '/category', element: <PrivateRoute allowedRoles={["ADMIN"]}><CategoryPage /></PrivateRoute> },
  { path: '/cuestionarios', element: <PrivateRoute allowedRoles={["ADMIN", "TUTOR"]}><QuizPage /></PrivateRoute> },
  { path: '/asignar-roles', element: <PrivateRoute allowedRoles={["ADMIN"]}><AsignarRolesPage /></PrivateRoute> },
  { path: '/', element: <Navigate to={'/auth'} /> }
];

export default routes;
