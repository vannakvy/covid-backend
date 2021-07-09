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

import Dashboard from './page/dashboard';
import Case from './page/case'
import SubCase from './component/case/subCase';

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
                  </Switch>

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
