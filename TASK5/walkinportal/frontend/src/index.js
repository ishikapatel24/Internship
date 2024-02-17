import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
});
const authLink = setContext((_, {headers}) => {
    // Get the authentication token from local storage if it exists
    const token = localStorage.getItem('authToken') || "";
    // console.log(localStorage.getItem('authToken'))
    // Return the headers to the context so HTTP link can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `${token}` : '',
        },
    };
});
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
