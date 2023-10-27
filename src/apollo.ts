import {
  ApolloClient,
  InMemoryCache,
  makeVar
} from "@apollo/client";

const token = localStorage.getItem("token")

export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token)

// 기본값. 로그인되면 볼수 있음. 
console.log("default value of isLoggedInVar :", isLoggedInVar())
console.log("default value of authTokenVar :", authTokenVar());

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
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
