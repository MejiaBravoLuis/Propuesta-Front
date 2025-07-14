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

const routes = [
  
  { path: '/dashboard', element: <DashboardPage/> },
  { path: '/auth', element: <Auth/> },
  { path: '/arte', element: <ArtPage/> },
  { path: '/tecno', element: <TechnologyPage/> },
  { path: '/biolo', element: <BiologyPage/> },
  { path: '/math', element: <MathPage/> },
  { path: '/cn', element: <NaturalSciencesPage/> },
  { path: '/cs', element: <SocialSciencesPage/> },
  { path: '/language', element: <LanguagePage/> },
  { path: '/progress', element: <ProgressPage/> },
  { path: '/', element: <Navigate to={'/auth'} /> }
]

export default routes;