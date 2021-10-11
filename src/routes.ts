// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Notifications from '@material-ui/icons/Notifications';
// core components/views for Admin layout
import DashboardPage from './components/admin/views/Dashboard/Dashboard';
import TableList from './components/admin/views/TableList/TableList';
import NotificationsPage from './components/admin/views/Notifications/Notifications';
import Question from './components/admin/views/TableList/Question/Question';
// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin'
  },
  {
    path: '/preguntas/crear',
    name: 'Pregunta',
    icon: 'content_paste',
    component: Question,
    layout: '/admin',
    invisible: true
  },
  {
    path: '/preguntas',
    name: 'Preguntas',
    icon: 'content_paste',
    component: TableList,
    layout: '/admin'
  },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: Notifications,
    component: NotificationsPage,
    layout: '/admin'
  }
];

export default dashboardRoutes;
