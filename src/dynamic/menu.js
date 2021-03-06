import { Layout, Menu, Image,Divider } from 'antd';
import {
    SettingOutlined,
    ContainerOutlined,
    TeamOutlined,
    ExportOutlined,
    HomeOutlined,
    LoginOutlined,
    UserOutlined,
    BankOutlined,
    ReconciliationOutlined,AuditOutlined
} from '@ant-design/icons';
import Logo from '../asset/srLogo.png'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react';
import { HeaderData } from '../context/headerContext';
// import { auth } from '../api/firebase';
import { isLoggedInVar } from '../cache';
import { keyMenu } from '../function/fn'

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function MenuHeader() {
    const { urlPath, user } = useContext(HeaderData)
    const [collapsed, setCollapsed] = useState(false)

    // const token =()=>{
    //     let newToken =  JSON.parse(localStorage.getItem('user'))
    //     return newToken?.token
    //   }
      

    const handleLoggout = ()=>{
        localStorage.removeItem("user")
        isLoggedInVar(false)
    }

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}
        className="side-custom"
            style={{
                // backgroundColor: '#06385f' 
                // backgroundColor: '#22252A' 
                // backgroundColor:'#1e3b87'
                // backgroundColor:'#005438'
                // background: 'repeating-linear-gradient(-55deg,#005b3d,#005b3d 30px,#005438 30px,#005438 40px)'
                // background: 'url("../asset/covid-19-bg.png") repeat center'

            }}>
            <Link to="/">
                <div className="logo">
                    <Image width={"100%"} className="img-logo" src={Logo} preview={false} />
                </div>
            </Link>
            <Divider style={{background:'#FFF',height:2}} />
            <Menu theme="dark"
                // defaultSelectedKeys={[urlPath]} 
                selectedKeys={[keyMenu(urlPath)]}
                mode="inline"
                style={{
                    // backgroundColor: '#06385f'
                    // backgroundColor:'#1e3b87'
                    // backgroundColor: '#22252A' 
                    // backgroundColor:'#005438'
                    // background: 'repeating-linear-gradient(-55deg,#006745,#006745 10px,#005438 10px,#005438 20px)'
                    // backgroundColor:"none"
                    // background: repeating-linear-gradient(
                    //     -55deg,
                    //     #222,
                    //     #222 10px,
                    //     #333 10px,
                    //     #333 20px
                    //   );
                }}>
               
                <Menu.Item key="/" style={{fontSize:16}} icon={<HomeOutlined style={{fontSize:20}}  />}>
                    ????????????????????????
                    <Link to="/" />
                </Menu.Item>
                <Menu.Item key="/case" style={{fontSize:16}} icon={<LoginOutlined style={{fontSize:20}}  />}>
                    ???????????????????????????????????????
                    <Link to="/case" />
                </Menu.Item>
                <Menu.Item key="/people" style={{fontSize:16}} icon={<TeamOutlined style={{fontSize:20}}  />}>
                    ?????????????????????????????????????????????
                    <Link to="/people" />
                </Menu.Item>

                <Menu.Item key="/hospital" style={{fontSize:16}} icon={<ReconciliationOutlined style={{fontSize:20}}  />}>
                    ??????????????????????????????
                    <Link to="/hospital" />
                </Menu.Item>

                <Menu.Item key="/interview" style={{fontSize:16}} icon={<AuditOutlined style={{fontSize:20}}  />}>
                    ???????????????????????????????????????????????????
                    <Link to="/interview" />
                </Menu.Item>

                <Menu.Item key="/quarantine" style={{fontSize:16}} icon={<BankOutlined style={{fontSize:20}}  />}>
                    ??????????????????????????????
                    <Link to="/quarantine" />
                </Menu.Item>
                
                <Menu.Item key="/specifylocation" style={{fontSize:16}} icon={<AuditOutlined style={{fontSize:20}}  />}>
                    ???????????????????????????/?????????
                    <Link to="/specifylocation" />
                </Menu.Item>
                
                <SubMenu key="sub1" style={{fontSize:16}} icon={<ContainerOutlined style={{fontSize:20}}  />} title="???????????????????????????">
                    <Menu.Item style={{backgroundColor:'#009966'}} key="/reportdaily">
                        ???????????????????????????
                        <Link to="/reportdaily" />
                    </Menu.Item>
                    {/* <Menu.Item key="5">
                        ????????????????????????????????????????????????
                        <Link to="/reportall" />
                    </Menu.Item> */}
                </SubMenu>
                {/* <Menu.Item key="/setting" icon={<SettingOutlined />}>
                    ????????????????????????
                    <Link to="/setting" />
                </Menu.Item> */}
                {user.role !== "ADMIN" ? (
                    <Menu.Item key="/user" style={{fontSize:16}} icon={<UserOutlined style={{fontSize:20}}  />}>
                        ?????????????????????????????????????????????????????????
                        <Link to="/user" />
                    </Menu.Item>
                ) : (
                    <></>
                )}

                <Menu.Item
                    // onClick={() => auth.signOut()}
                    style={{fontSize:16}} 
                    key="6"
                    icon={<ExportOutlined style={{fontSize:20}}  />}
                    
                    onClick={() => handleLoggout()}
                >
                    ??????????????????
                </Menu.Item>
            </Menu>
        </Sider>
    )
}