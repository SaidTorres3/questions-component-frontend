// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Notifications from '@material-ui/icons/Notifications';
// core components/views for Admin layout
import DashboardPage from './components/admin/views/Dashboard/Dashboard';
import TableList from './components/admin/views/TableList/TableList';
import NotificationsPage from './components/admin/views/Notifications/Notifications';
import Question from './components/admin/views/TableList/Question/Question';
import CreateQuestion from './components/admin/views/TableList/CreateQuestion/CreateQuestion';
import EditQuestion from './components/admin/views/TableList/EditQuestion/EditQuestion';
import Respondents from './components/admin/views/Respondents/Respondents';

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
    name: 'Crear pregunta',
    icon: 'content_paste',
    component: CreateQuestion,
    layout: '/admin',
    invisible: true
  },
  {
    path: '/preguntas/:pregunta/editar',
    name: 'Editar pregunta',
    icon: 'content_paste',
    component: EditQuestion,
    layout: '/admin',
    invisible: true
  },
  {
    path: '/preguntas/:pregunta',
    name: 'Ver pregunta',
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
    path: '/encuestados',
    name: 'Encuestados',
    icon: 'content_paste',
    component: Respondents,
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


export type URLParams = {
  pregunta: string
}