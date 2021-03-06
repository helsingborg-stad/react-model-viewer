import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import WebXRPolyfill from "webxr-polyfill";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import GQLClient from "./services/GQLClient";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@google/model-viewer/dist/model-viewer";

const polyfill = new WebXRPolyfill();
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
