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

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function MenuHeader() {
    const { urlPath, user } = useContext(HeaderData)
console.log(user,"testing")
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
            style={{
                // backgroundColor: '#06385f' 
                // backgroundColor: '#22252A' 
                // backgroundColor:'#1e3b87'
                // backgroundColor:'#005438'
                background: 'repeating-linear-gradient(-55deg,#005b3d,#005b3d 30px,#005438 30px,#005438 40px)'

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
                    ទំព័រដើម
                    <Link to="/" />
                </Menu.Item>
                <Menu.Item key="/case" style={{fontSize:16}} icon={<LoginOutlined style={{fontSize:20}}  />}>
                    កំណត់ត្រាករណី
                    <Link to="/case" />
                </Menu.Item>
                <Menu.Item key="/people" style={{fontSize:16}} icon={<TeamOutlined style={{fontSize:20}}  />}>
                    ប្រវត្តិរូបប្រជាជន
                    <Link to="/people" />
                </Menu.Item>
                <Menu.Item key="/quarantine" style={{fontSize:16}} icon={<BankOutlined style={{fontSize:20}}  />}>
                    ចត្តាឡីស័ក
                    <Link to="/quarantine" />
                </Menu.Item>
                <Menu.Item key="/hospital" style={{fontSize:16}} icon={<ReconciliationOutlined style={{fontSize:20}}  />}>
                    មន្ទីរពេទ្យ
                    <Link to="/hospital" />
                </Menu.Item>
                <Menu.Item key="/specifylocation" style={{fontSize:16}} icon={<AuditOutlined style={{fontSize:20}}  />}>
                    ទីតាំងបិទបើក
                    <Link to="/specifylocation" />
                </Menu.Item>
                <Menu.Item key="/interview" style={{fontSize:16}} icon={<AuditOutlined style={{fontSize:20}}  />}>
                    ការសម្ភាសអ្នកជំងឺ
                    <Link to="/interview" />
                </Menu.Item>
                <SubMenu key="sub1" style={{fontSize:16}} icon={<ContainerOutlined style={{fontSize:20}}  />} title="របាយការណ៍">
                    <Menu.Item style={{backgroundColor:'#009966'}} key="/reportdaily">
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
                {user.role !== "ADMIN" ? (
                    <Menu.Item key="/user" style={{fontSize:16}} icon={<UserOutlined style={{fontSize:20}}  />}>
                        អ្នកប្រើប្រាស់
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
                    ចាកចេញ
                </Menu.Item>
            </Menu>
        </Sider>
    )
}