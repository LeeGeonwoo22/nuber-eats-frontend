import React from 'react';
import { LoggedOutRouter } from './routers/logged-out-router';
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { LoggedInRouter } from './routers/logged-in-router';
import { isLoggedInVar } from './apollo';


// const IS_LOGGED_IN = gql`
//   query isLoggedIn {
//     isLoggedIn @client
//   }
// `

function App() {
  // const {data : {isLoggedIn}} = useQuery(IS_LOGGED_IN);
  // console.log(data) -  데이터 받아옴. 

  // const {
  //   data : {isLoggedIn},
  // } = useQuery(IS_LOGGED_IN)
  
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return  (
    isLoggedIn ?<LoggedInRouter /> : <LoggedOutRouter />
  )
    
  ;
}

export default App;
