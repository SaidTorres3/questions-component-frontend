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
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin'
  },
  // {
  //   path: '/user',
  //   name: 'User Profile',
  //   rtlName: 'ملف تعريفي للمستخدم',
  //   icon: Person,
  //   component: UserProfile,
  //   layout: '/admin'
  // },
  {
    path: '/preguntas',
    name: 'Preguntas',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: TableList,
    layout: '/admin'
  },
  {
    path: '/notifications',
    name: 'Notifications',
    rtlName: 'إخطارات',
    icon: Notifications,
    component: NotificationsPage,
    layout: '/admin'
  }
];

export default dashboardRoutes;
