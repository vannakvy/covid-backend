import React, {useReducer, createContext} from 'react'
import { dashboardReducer } from '../reducer/dashboardReducer'

export const DashboardController = createContext()

export default function DashBoardContext(props) {
    const [dashBoardData, dashBoardDataDispatch] = useReducer(dashboardReducer, [
        {
            title: "ករណីឆ្លង",
            today: 200,
            total: 200,
        },
        {
            title: "ជាសះស្បើយ",
            today: 200,
            total: 200,
        },
        {
            title: "ករណីស្លាប់",
            today: 200,
            total: 200,
        },
        {
            title: "ចត្តាឡីស័ក",
            today: 200,
            total: 200,
        },
        {
            title: "ករណីឆ្លង",
            today: 200,
            total: 200,
        },
        {
            title: "ករណីឆ្លង",
            today: 200,
            total: 200,
        },
    ])

    const [dashboardList, dashboardListDispatch] = useReducer(dashboardReducer, [
        {
            title: "ស្រុកពួក",
            case: 10
        },
        {
            title: "ស្រុកបន្ទាយស្រី",
            case: 10
        },
    ])

    return (
        <DashboardController.Provider
            value={{
                dashBoardData,
                dashboardList,

                dashBoardDataDispatch,
                dashboardListDispatch
            }}
        >
            {props.children}
        </DashboardController.Provider>
    )
}
