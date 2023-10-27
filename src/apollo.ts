import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  makeVar
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const token = localStorage.getItem("token")

export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token)

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
  console.log('headers :', headers)
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // "x-jwt": authTokenVar() || "",
      "x-jwt": authTokenVar() || "",
    },
  };
});
// 기본값. 로그인되면 볼수 있음. 
console.log("default value of isLoggedInVar :", isLoggedInVar())
console.log("default value of authTokenVar :", authTokenVar());

export const client = new ApolloClient({
  link : authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      // Type policy map
      Query: {
        fields: {
          // Field policy map for the Product type
          isLoggedIn: {
            // Field policy for the isLoggedIn field
            read() {
              // The read function for the isLoggedIn field
              // 토큰을 보내준다. 
            //   return Boolean(localStorage.getItem("token"))
            return isLoggedInVar();
            },
          },
          token : {
            read() {
              return authTokenVar();
            }
          }
        },
      },
    },
  }),
});
