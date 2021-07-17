import React, {useReducer, createContext,useState} from 'react'
import { userReducer } from '../reducer/userReducer'
import { useQuery } from '@apollo/client'
import { GET_ALL_USERS } from '../graphql/auth'
import { setUser } from '../function/set'

export const UserController = createContext()

export default function UserContext(props) {
    // const [userData, userDataDispatch] = useReducer(userReducer, [
    //     {
    //         id: "1",
    //         username: "user@admin.com",
    //         role: "ADMIN",
    //         tel: "012457478" ,
    //         note: "active",
           
    //     },
    //     {
    //         id: "2",
    //         username: "user@eka.com",
    //         role: "USER",
    //         tel: "01548448" ,
    //         note: "active",
    //     },
    // ])

    const [userData,setUserData] = useState([])

    const {data, loading,error} = useQuery(GET_ALL_USERS,{variables:{
        page:1,
        limit:2,
        keyword:"",
    },onCompleted:({getUserWithPagination})=>{
        // console.log(getUserWithPagination?.users)
        setUserData(getUserWithPagination?.users)
    }})



    return (
        <UserController.Provider
            value={{
                userData,
                //subCaseData,

                // userDataDispatch,
                //subCaseDataDispatch,
            }}
        >
            {props.children}
        </UserController.Provider>
    )
}
