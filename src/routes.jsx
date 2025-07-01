import { DashboardPage } from './pages/dashboard';
import { Auth } from './pages/auth';



const routes = [
    { path: '/auth', element: <Auth /> },
    { path: '/*', element: <PrivateRoute><DashboardPage /></PrivateRoute> }
  ];
export default routes;
