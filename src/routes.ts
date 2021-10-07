// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Notifications from '@material-ui/icons/Notifications';
// core components/views for Admin layout
import DashboardPage from './components/admin/views/Dashboard/Dashboard';
import TableList from './components/admin/views/TableList/TableList';
import NotificationsPage from './components/admin/views/Notifications/Notifications';
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
    path: '/preguntas',
    name: 'Preguntas',
    icon: 'content_paste',
    component: TableList,
    layout: '/admin'
  },
  {
    path: '/preguntas/:pregunta',
    name: 'Pregunta',
    icon: 'content_paste',
    component: TableList,
    layout: '/admin',
    invisible: true
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
