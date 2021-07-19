import React,{useState} from 'react'
import MenuHeader from './dynamic/menu';
import Navbar from './dynamic/navbar';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link
  } from "react-router-dom";

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
import { Layout } from 'antd'
import {useQuery} from '@apollo/client'
import {IS_LOGGED_IN} from './graphql/auth'
import MapScreen from './page/map';
const { Footer, Content } = Layout
const Routes = () => {
    const { data: isLogin } = useQuery(IS_LOGGED_IN);
    const login = isLogin.isLoggedIn;
     {/* <Dashboard /> */}
    return (
        <Router>
          <div className="App">
            <Layout style={{ minHeight: '100vh' }}>
              {login? <>
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
                              <Switch >
                                <Route exact path="/">
                                 
                                  <MapScreen/>
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
              </Layout></>: <Switch>
                <Route>
                  <Login/>
                </Route>
              </Switch>
              }
            </Layout>
       
          </div>

      // </Router>
    )
}

export default Routes
