import { ApolloClient, InMemoryCache } from "@apollo/client";

export default new ApolloClient({
  uri: "https://modul-test.helsingborg.io/barnens-h22/graphql",
  cache: new InMemoryCache(),
  headers: {
    // Origin: "https://barnens-h22.multi.test",
    // "authorization": token
  },
});


  // uri: "",//"""https://modul-test.helsingborg.io/barnens-h22/graphql",
  // uri: my_current_url split at '=' and take the second part
  // split my_current_url at '=' and take the second part