// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Notifications from '@material-ui/icons/Notifications';
// core components/views for Admin layout
import DashboardPage from './components/admin/views/Dashboard/Dashboard';
import Questions from './components/admin/views/Questions//Questions';
import NotificationsPage from './components/admin/views/Notifications/Notifications';
import Question from './components/admin/views/Questions/Question/Question';
import CreateQuestion from './components/admin/views/Questions/CreateQuestion/CreateQuestion';
import EditQuestion from './components/admin/views/Questions/EditQuestion/EditQuestion';
import Respondents from './components/admin/views/Respondents/Respondents';
import Respondent from './components/admin/views/Respondents/Respondent/Respondent';
import User from './components/admin/views/User/User';

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
    component: Questions,
    layout: '/admin'
  },
  {
    path: '/encuestados/:encuestado',
    name: 'Encuestado',
    icon: 'content_paste',
    component: Respondent, 
    layout: '/admin',
    invisible: true
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
  },
  {
    path: '/usuario',
    name: 'Usuario',
    icon: 'content_paste',
    component: User,
    layout: '/admin',
    invisible: true
  }
];

export default dashboardRoutes;


export type URLParams = {
  pregunta: string,
  encuestado: string
}