import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
// import { MeQuery } from "../__generated__/graphql";
import { Restaurants } from "../pages/client/restaurant";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";

// const ME_QUERY = gql`
//   query me {
//     me {
//       email
//       id
//       role
//       verified
//     }
//   }
// `;

const ClientRoutes = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
];

  export const LoggedInRouter = () => {
    const {
      data,
      loading,
      error
    } = useMe();
    console.log('meQuery data :', data)
    console.log('token error :', error);
    if (!data || loading || error) {
      return (
        <div className="h-screen flex justify-center items-center">
          <span className="font-medium text-xl tracking-wide">Loading...</span>
        </div>
      );
    }
    return (
      // <div>
      //   <h1>{data.me.email}</h1>
      // </div>
      <Router>
        <Header />
        <Switch>
          {data.me.role === "Client" && ClientRoutes}
          <Redirect to="/" />
        </Switch>
      </Router>
    );    
  }
  

