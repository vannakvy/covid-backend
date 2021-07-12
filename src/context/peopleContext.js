import React, {useReducer, createContext} from 'react'
import { peopleReducer } from '../reducer/peopleReducer'

export const PeopleController = createContext()

export default function PeopleContext(props) {
    const [peopleData, peopleDataDispatch] = useReducer(peopleReducer, [
        {
            id: "1",
            idCard: "123123123",
            name: "ដាយ ឌឿន",
            gender: "ប្រុស",
            age: 25,
            nationality: "ខ្មែរ",
            province: "សៀមរាប",
            district: "សៀមរាប",
            commune: "ស្វាយដង្គំ",
            village: "ល្វា",
            job: "លក់ដូរ",
            tel: 10503375,
            remark: "មុខប្រជ្រុយ៣",
        },
        {
            id: "2",
            idCard: "123123123",
            name: "ដាយ ឌឿន1",
            gender: "ប្រុស",
            age: 25,
            nationality: "ខ្មែរ",
            province: "សៀមរាប",
            district: "សៀមរាប",
            commune: "ស្វាយដង្គំ",
            village: "ល្វា",
            job: "លក់ដូរ",
            tel: 10503375,
            remark: "មុខប្រជ្រុយ៣",
        },
    ])

    return (
        <PeopleController.Provider
            value={{
                peopleData,

                peopleDataDispatch,
            }}
        >
            {props.children}
        </PeopleController.Provider>
    )
}
