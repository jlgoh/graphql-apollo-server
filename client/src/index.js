import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { ApolloProvider, ApolloClient } from "@apollo/client";
import { cache } from "./cache";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.querySelector("#root")
);
