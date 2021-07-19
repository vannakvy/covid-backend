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

 const upLoadLink = createUploadLink({
    uri: "http://192.168.1.152:4000/graphql",
    headers:{
      Authorization: tokens
    }
    
  })

const wsLink = new WebSocketLink({
  uri: 'ws://192.168.1.152:4000/graphql',
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
