import './static/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import React, { useState } from 'react'
import { Layout } from 'antd'
import MenuHeader from './dynamic/menu';
import Navbar from './dynamic/navbar';

import HeaderContext from './context/headerContext';
import DashBoardContext from './context/dashboardContext'
import CaseContext from './context/caseContext'
import UserContext from './context/userContext';
import QuarantineContext from './context/quarantineContext';
import HospitalContext from './context/hospitalContext';

import Dashboard from './page/dashboard';
import Case from './page/case'
import SubCase from './component/case/subCase';
import User from './page/user';
import Quarantine from './page/quarantine'
import SubQuarantine from './component/quarantine/subQuarantine';
import PeopleContext from './context/peopleContext';
import People from './page/people';
import SubPeople from './component/people/subPeople';
import Hospital from './page/hospital';
import SubHospital from './component/hospital/subHospital';
import Login from './page/login'
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


 const upLoadLink = createUploadLink({
    uri: "http://192.168.1.152:7000/graphql",
    // headers:{
    //   Authorization: localStorage.getItem('token')
    // }
  })


// const httpLink = new HttpLink({
//   uri: 'http://192.168.1.152:7000/graphql',

// });

const wsLink = new WebSocketLink({
  uri: 'ws://192.168.1.152:7000/graphql',
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

const { Footer, Content } = Layout

function App() {
  const [login, setLogin] = useState(true)

  return (
    <ApolloProvider client={client}>
    <Router>
      {login ? (
        <div className="App">
          <Layout style={{ minHeight: '100vh' }}>
            <HeaderContext>
              <MenuHeader />
            </HeaderContext>

            <Layout className="site-layout">
              <HeaderContext>
                <Navbar />
              </HeaderContext>

              <Content style={{ margin: '20px' }}>
                <DashBoardContext>
                  <CaseContext>
                    <UserContext>
                      <QuarantineContext>
                        <PeopleContext>
                          <HospitalContext>
                            <Switch>
                              <Route exact path="/">
                                <Dashboard />
                              </Route>
                              <Route path="/case">
                                <Case />
                              </Route>
                              <Route path="/subCase/:id">
                                <SubCase />
                              </Route>
                              <Route path="/people">
                                <People />
                              </Route>
                              <Route path="/subPeople/:id">
                                <SubPeople />
                              </Route>
                              <Route path="/user">
                                <User />
                              </Route>
                              <Route path="/quarantine">
                                <Quarantine />
                              </Route>
                              <Route path="/subQuarantine/:id">
                                <SubQuarantine />
                              </Route>
                              <Route path="/hospital">
                                <Hospital />
                              </Route>
                              <Route path="/subHospital/:id">
                                <SubHospital />
                              </Route>
                            </Switch>
                          </HospitalContext>
                        </PeopleContext>
                      </QuarantineContext>
                    </UserContext>
                  </CaseContext>
                </DashBoardContext>
              </Content>
              <Footer style={{ textAlign: 'center', color: 'red', fontSize: 17 }}>រដ្ឋបាលខេត្តសៀមរាប/Siem Reap Provincial Hall &copy;2021</Footer>
            </Layout>
          </Layout>
        </div>
      ) : (
        <div className="App">
          <Route exact path="/login">
            <Login />
          </Route>
        </div>
      )}

    </Router>
    </ApolloProvider>
  );
}

export default App;
