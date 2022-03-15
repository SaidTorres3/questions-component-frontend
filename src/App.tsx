import React, { Dispatch, SetStateAction } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import QuestionsScreen from "src/components/client/questions/questions";
import "./App.css";
import "./components/admin/assets/css/material-dashboard-react.css";
import Admin from "./components/admin/layouts/Admin";

export const UserContext = React.createContext<{
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}>(null!);

function App() {
  const [userData, setUserData] = React.useState<UserData>({
    jwt: "",
    uuid: "",
    type: "",
  });

  React.useEffect(() => {
    console.log(userData);
  }, [userData])
  return (
    <div className="App">
      <UserContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={QuestionsScreen} />
            <Route path="/admin/dashboard" component={Admin} />
            <Redirect exact from="/admin" to="/admin/dashboard" />
            <Route path="/admin/" component={Admin} />
            <Route path="*" component={QuestionsScreen}></Route>
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

interface UserData {
  uuid: string;
  type: string;
  jwt: string;
}

export default App;
