import './App.css';
import QuestionsScreen from 'src/components/client/questions/questions';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={QuestionsScreen}></Route>
          <Route path="*" component={QuestionsScreen}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

