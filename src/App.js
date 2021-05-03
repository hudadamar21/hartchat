import { useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { Button, CircularProgress } from '@material-ui/core';
import './App.css';

import Main from './pages/Main';

function App() {
  const {loginWithRedirect, getIdTokenClaims, isAuthenticated, isLoading} = useAuth0()
  const [token, setToken] = useState("")

  getIdTokenClaims().then(resp => {
    if(resp){
      setToken(resp.__raw)
    }
  })

  if(isLoading){
    return <CircularProgress/>
  }

  const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_GRAPHQL_WEBSOCKET,
    options: {
      reconnect: true,
      lazy: true,
      connectionParams: {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      },
    },
  });
  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  });
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local cookie if it exists
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authLink, splitLink]),
  }); 

  return (
    <ApolloProvider client={client}>

      {
        isAuthenticated 
          ? <Main/>
          : (
            <div className="App">
              <header className="App-header">
               <h1>HARTCHAT</h1>
                <Button
                  style={{
                    color: 'black',
                    background: 'white'
                  }}
                  onClick={() => loginWithRedirect()}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contianed" 
                  color="primary"
                > 
                  Login / Register
                </Button>
              </header>
            </div>
          )
      }
      
    </ApolloProvider>
  );
}

export default App;
