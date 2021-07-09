import React, { useContext } from 'react'
import { Layout } from 'antd'
import { HeaderData } from '../context/headerContext'

const { Header } = Layout

export default function Navbar() {
    const { user } = useContext(HeaderData)

    return (
        <Header className="site-layout-background" style={{ padding: 0, textAlign: "right" }}>
            <p style={{ color: "white", paddingRight: 20, fontStyle: "italic" }}>@{user.displayName}</p>
        </Header>
    )
}
