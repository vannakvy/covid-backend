import './static/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import { Layout } from 'antd'
import MenuHeader from './dynamic/menu';
import Navbar from './dynamic/navbar';

import HeaderContext from './context/headerContext';
import DashBoardContext from './context/dashboardContext'
import CaseContext from './context/caseContext'
import UserContext from './context/userContext';
import QuarantineContext from './context/quarantineContext';

import Dashboard from './page/dashboard';
import Case from './page/case'
import SubCase from './component/case/subCase';
import User from './page/user';
import Quarantine from './page/quarantine'
import SubQuarantine from './component/quarantine/subQuarantine';
import PeopleContext from './context/peopleContext';
import People from './page/people';
import SubPeople from './component/people/subPeople';

const { Footer, Content } = Layout

function App() {
  return (
    <Router>
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
                        </Switch>

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
    </Router>
  );
}

export default App;
