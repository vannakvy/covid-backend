import React, { createContext, useReducer } from 'react'
import { useLocation } from 'react-router-dom'
import { headerReducer } from '../reducer/headerReducer'

export const HeaderData = createContext()

export default function HeaderContext(props) {
    const urlPath = useLocation().pathname
    const [user, userDispatch] = useReducer(headerReducer, {
        displayName: "Sambath",
        role: "Admin"
    })

    return (
        <HeaderData.Provider
            value={{
                urlPath,
                user,

                userDispatch
            }}
        >
            {props.children}
        </HeaderData.Provider>
    )
}
