import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Restaurants } from "../pages/client/restaurant";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { ConfirmEmail } from "../pages/confirm-email";
import { NotFound } from "../pages/404";

const ClientRoutes = [
  <Route key={1} path="/" exact>
    <Restaurants />
  </Route>,
  <Route key={2} path="/confirm" exact>
    <ConfirmEmail />
  </Route>,
];

  export const LoggedInRouter = () => {
    const {
      data,
      loading,
      error
    } = useMe();
    // console.log('meQuery data :', data)
    // console.log('token error :', error);
    if (!data || loading || error) {
      return (
        <div className="h-screen flex justify-center items-center">
          <span className="font-medium text-xl tracking-wide">Loading...</span>
        </div>
      );
    }

    return (
      <Router>
        <Header />
        <Switch>
          {data.me.role === "Client" && ClientRoutes}
          {/* <Redirect to="/" /> */}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    );    
  }
  

