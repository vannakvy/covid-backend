import './static/App.css';

import React, { useState } from 'react'
import {cache} from './cache'
import {
  split,
   HttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import Routes from './Routes';

const token =()=>{
  let newToken =  JSON.parse(localStorage.getItem('user'))
  return newToken?.token
}

const tokens = token()
console.log(process.env.React_App_WS,"env")
 const upLoadLink = createUploadLink({
    uri: process.env.React_App_URI,
    headers:{
      Authorization: tokens
    }
  })

const wsLink = new WebSocketLink({
  uri: process.env.React_App_WS,
  options: {
    reconnect: true
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  upLoadLink
);

const client = new ApolloClient({
  cache,
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  },
  link:splitLink
});

function App() {
  
  return (
    <ApolloProvider client={client}>
      <Routes/>
     
    </ApolloProvider>
  );
}

export default App;
