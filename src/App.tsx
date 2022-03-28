import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import QuestionsScreen from "src/components/client/questions/questions";
import "./App.css";
import { UserContext } from "./auth/authContext";
import useAuth from "./auth/useAuth";
import "./components/admin/assets/css/material-dashboard-react.css";
import Admin from "./components/admin/layouts/Admin";
import Login from "./components/admin/layouts/Login";

function App() {
  const {userData, setUserData} = useAuth()

  return (
    <div className="App">
      <UserContext.Provider value={{ userData, setUserData }}>
        {!userData.uuid ? (
          <Login></Login>
        ) : (
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={QuestionsScreen} />
              <Route path="/admin/dashboard" component={Admin} />
              <Redirect exact from="/admin" to="/admin/dashboard" />
              <Route path="/admin/" component={Admin} />
              <Route path="*" component={QuestionsScreen}></Route>
            </Switch>
          </BrowserRouter>
        )}
      </UserContext.Provider>
    </div>
  );
}

export default App;
