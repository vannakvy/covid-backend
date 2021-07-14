import React, {useReducer, createContext} from 'react'
import { hospitalReducer } from '../reducer/hospitalReducer'

export const HospitalController = createContext()

export default function HospitalContext(props) {
    const [hospitalData, hospitalDataDispatch] = useReducer(hospitalReducer, [
        {
            id: "1",
            hospitalName: "ពេទ្យខេត្តសៀមរាប",
            place: "សាលា",
            village: "គ្រួស" ,
            commune: "ស្វាយដង្គំ",
            district:'សៀមរាប',
            province:'សៀមរាប',
            inCharge:'ដឹម ដយ',
            tel:'015487762',
            note:'test',
            long:12.34343,
            lat:3433.34,
            capacity:30,
        },
        {
            id: "2",
            hospitalName: "ពេទ្យនាគទេព",
            place: "សាលា",
            village: "គោកដូង" ,
            commune: "ទឹកវិល",
            district:'សៀមរាប',
            province:'សៀមរាប',
            inCharge:'ដា​ ធី',
            tel:'087555999',
            note:'098554477',
            long:12.34343,
            lat:3433.34,
            capacity:30,
        },
    ])

    const [subHospitalData, subHospitalDataDispatch] = useReducer(hospitalReducer, [
        {
            id: "1",
            name: "សំបូរ",
            gender: "ប្រុស",
            province: "សៀមរាប",
            district: "សៀមរាប",
            commune: "ស្វាយដង្គំ",
            village: "ល្វា",
            status: "អវិជ្ជមាន",
            relatedInfo:'ផ្ទាល់',
        },
        {
            id: "2",
            name: "សំណាង",
            gender: "ប្រុស",
            province: "សៀមរាប",
            district: "សៀមរាប",
            commune: "ស្វាយដង្គំ",
            village: "ល្វា",
            status: "វិជ្ជមាន",
            relatedInfo:'ប្រយោល',
        },
    ])

    return (
        <HospitalController.Provider
            value={{
                hospitalData,
                subHospitalData,

                hospitalDataDispatch,
                subHospitalDataDispatch,
            }}
        >
            {props.children}
        </HospitalController.Provider>
    )
}
