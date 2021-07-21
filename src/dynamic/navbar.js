import React, { useContext } from 'react'
import { Layout } from 'antd'
import { HeaderData } from '../context/headerContext'

const { Header } = Layout

export default function Navbar() {
    const { user } = useContext(HeaderData)

    return (
        // background:'#0087c0'
        
        <Header className="site-layout-background" style={{ padding: 0, textAlign: "right", background:'#1e3b87'}}>
            <p style={{ color: "white", paddingRight: 20, fontStyle: "italic" }}>@{user?.user?.username.toUpperCase()}</p>
        </Header>
    )
}
