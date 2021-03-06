import React, {useReducer, createContext} from 'react'
import { quarantineReducer } from '../reducer/quarantineReducer'

export const QuarantineController = createContext()

export default function QuarantineContext(props) {
    const [quarantineData, quarantineDataDispatch] = useReducer(quarantineReducer, [
        {
            id: "1",
            quarantineName: "សាលាគ្រួស",
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
            quarantineName: "សាលាសម្ដេចឪ",
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

    const [subQuarantineData, subQuarantineDataDispatch] = useReducer(quarantineReducer, [
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
        <QuarantineController.Provider
            value={{
                quarantineData,
                subQuarantineData,

                quarantineDataDispatch,
                subQuarantineDataDispatch,
            }}
        >
            {props.children}
        </QuarantineController.Provider>
    )
}
