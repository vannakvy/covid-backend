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
    ReconciliationOutlined
} from '@ant-design/icons';
import Logo from '../asset/srLogo.png'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react';
import { HeaderData } from '../context/headerContext';
// import { auth } from '../api/firebase';
import { isLoggedInVar } from '../cache';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function MenuHeader() {
    const { urlPath, user } = useContext(HeaderData)

    const [collapsed, setCollapsed] = useState(false)

    const handleLoggout = ()=>{
        localStorage.removeItem("user")
        isLoggedInVar(false)
    }

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}
            style={{
                // backgroundColor: '#06385f' 
                // backgroundColor: '#22252A' 
                // backgroundColor:'#1e3b87'
                backgroundColor:'#005438'

            }}>
            <Link to="/">
                <div className="logo">
                    <Image width={"100%"} className="img-logo" src={Logo} preview={false} />
                </div>
            </Link>
            <Divider style={{background:'#FFF',height:2}} />
            <Menu theme="dark"
                // defaultSelectedKeys={[urlPath]} 
                selectedKeys={[urlPath]}
                mode="inline"
                style={{
                    // backgroundColor: '#06385f'
                    // backgroundColor:'#1e3b87'
                    // backgroundColor: '#22252A' 
                    backgroundColor:'#005438'
                }}>
               
                <Menu.Item key="/" icon={<HomeOutlined />}>
                    ទំព័រដើម
                    <Link to="/" />
                </Menu.Item>
                <Menu.Item key="/case" icon={<LoginOutlined />}>
                    កំណត់ត្រាករណី
                    <Link to="/case" />
                </Menu.Item>
                <Menu.Item key="/people" icon={<TeamOutlined />}>
                    ប្រវត្តិរូបប្រជាជន
                    <Link to="/people" />
                </Menu.Item>
                <Menu.Item key="/quarantine" icon={<BankOutlined />}>
                    ចត្តាឡីស័ក
                    <Link to="/quarantine" />
                </Menu.Item>
                <Menu.Item key="/hospital" icon={<ReconciliationOutlined />}>
                    មន្ទីរពេទ្យ
                    <Link to="/hospital" />
                </Menu.Item>
                <SubMenu key="sub1" icon={<ContainerOutlined />} title="របាយការណ៍">
                    <Menu.Item key="/reportdaily">
                        របាយការណ៍ប្រចាំថ្ងៃ
                        <Link to="/reportdaily" />
                    </Menu.Item>
                    {/* <Menu.Item key="5">
                        របាយការណ៍ទាំងមូល
                        <Link to="/reportall" />
                    </Menu.Item> */}
                </SubMenu>
                {/* <Menu.Item key="/setting" icon={<SettingOutlined />}>
                    ការកំណត់
                    <Link to="/setting" />
                </Menu.Item> */}
                {user.role === "Admin" ? (
                    <Menu.Item key="/user" icon={<UserOutlined />}>
                        អ្នកប្រើប្រាស់
                        <Link to="/user" />
                    </Menu.Item>
                ) : (
                    <></>
                )}

                <Menu.Item
                    // onClick={() => auth.signOut()}
                    key="6"
                    icon={<ExportOutlined />}
                    
                    onClick={() => handleLoggout()}
                >
                    ចាកចេញ
                </Menu.Item>
            </Menu>
        </Sider>
    )
}