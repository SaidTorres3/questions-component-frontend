import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import QuestionsScreen from 'src/components/client/questions/questions';

import Admin from './components/admin/layouts/Admin';
import './components/admin/assets/css/material-dashboard-react.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={QuestionsScreen} />
          <Route path="/admin/dashboard" component={Admin} />
          <Redirect exact from="/admin" to="/admin/dashboard" />
          <Route path="/admin/" component={Admin} />
          <Route path="*" component={QuestionsScreen}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

