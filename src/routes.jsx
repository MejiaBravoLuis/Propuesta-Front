import { Navigate } from "react-router-dom";
import { Auth } from "./page/auth/auth";
import { DashboardPage } from "./page/dashboard/DashboardPage";
import { LanguagePage } from "./page/language/LanguagePage";
import { ProgressPage } from "./page/progress/ProgressPage";
import { AdminCoursePage } from "./page/courses/AdminCoursePage";
import { StudTeachCoursePage } from "./page/courses/StudTeachCoursePage";
import {QuizDetailPage} from "./page/quiz/QuizDPage.jsx"
import { CoursePage } from "./page/courses/CousrePage.jsx";
import { ForumPage } from "./page/foro/ForumPage";
import { MaterialPage } from "./page/material/MaterialPage";
import { CategoryPage } from "./page/category/CategoryPage";
import { QuizPage } from "./page/quiz/QuizPage";

const routes = [
  { path: '/dashboard', element: <DashboardPage/> },
  { path: '/auth', element: <Auth/> },
  { path: '/language', element: <LanguagePage/> },
  { path: '/progreso', element: <ProgressPage/> },
  { path: '/STcursos', element: <StudTeachCoursePage/> },
  { path: '/cursos', element: <AdminCoursePage/> },
  { path: '/Dcursos', element: <CoursePage/> },
  { path: '/foros', element: <ForumPage/> },
  { path: '/material', element: <MaterialPage/> },
  { path: '/category', element: <CategoryPage/> },
  { path: '/cuestionarios', element: <QuizPage/> },
  { path: '/cuestionariosD', element: <QuizDetailPage/> },
  { path: '/', element: <Navigate to={'/auth'} /> }
]

export default routes;