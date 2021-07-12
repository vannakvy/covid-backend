import React, {useReducer, createContext} from 'react'
import { userReducer } from '../reducer/userReducer'

export const UserController = createContext()

export default function UserContext(props) {
    const [userData, userDataDispatch] = useReducer(userReducer, [
        {
            id: "1",
            username: "user@admin.com",
            role: "ADMIN",
            tel: "012457478" ,
            note: "active",
           
        },
        {
            id: "2",
            username: "user@eka.com",
            role: "USER",
            tel: "01548448" ,
            note: "active",
        },
    ])

    return (
        <UserController.Provider
            value={{
                userData,
                //subCaseData,

                userDataDispatch,
                //subCaseDataDispatch,
            }}
        >
            {props.children}
        </UserController.Provider>
    )
}
