import {
  ApolloClient,
  InMemoryCache,
  makeVar,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LOCALSTORAGE_TOKEN } from "./constants";

// 토큰 가져오기 
const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
// 토큰 여부에 따라 Boolean 값을 준다. 
export const isLoggedInVar = makeVar(Boolean(token));
// 그리고 authTokenVar에 토큰값을 저장한다. 
export const authTokenVar = makeVar(token);

// console.log("default value of isLoggedInVar is:", isLoggedInVar());
// console.log("default value of authTokenVar is:", authTokenVar());

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-jwt": authTokenVar() || "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return authTokenVar();
            },
          },
        },
      },
    },
  }),
});