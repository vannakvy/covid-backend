import React, { createContext, useReducer } from 'react'
import { useLocation } from 'react-router-dom'
import { headerReducer } from '../reducer/headerReducer'

export const HeaderData = createContext()

export const provinceData = require('../asset/data/province.json')
export const districtData = require('../asset/data/district.json')
export const communeData = require('../asset/data/commune.json')
export const villageData = require('../asset/data/village.json')

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
