import React, { useContext } from 'react'
import { Layout } from 'antd'
import { HeaderData } from '../context/headerContext'
import {UserSwitchOutlined} from '@ant-design/icons'

const { Header } = Layout

export default function Navbar() {
    const { user } = useContext(HeaderData)

    return (
        // background:'#0087c0'
        // background: 'repeating-linear-gradient(-55deg,#005b3d,#005b3d 30px,#005438 30px,#005438 40px)'
        <Header className="site-layout-background nav-custom" style={{ padding: 0, textAlign: "right", }}>
            <p style={{ color: "white", paddingRight: 20}}><UserSwitchOutlined style={{fontSize:25}} /> {user?.user?.username.toUpperCase()}</p>
        </Header>
    )
}
