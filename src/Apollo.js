import "react-perfect-scrollbar/dist/css/styles.css";

import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "src/components/GlobalStyles";
import "src/mixins/chartjs";
import theme from "src/theme";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
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
import NavigationRoute from './NavigationRoute'
import { Nav } from "react-bootstrap";

 const upLoadLink = createUploadLink({
    uri: "http://192.168.1.152:4000/graphql",
    // headers:{
    //   Authorization: localStorage.getItem('token')
    // }
  })


// const httpLink = new HttpLink({
//   uri: 'http://192.168.1.152:7000/graphql',

// });

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