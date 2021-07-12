import React, {useReducer, createContext} from 'react'
import { caseReducer } from '../reducer/caseReducer'

export const CaseController = createContext()

export default function CaseContext(props) {
    const [caseData, caseDataDispatch] = useReducer(caseReducer, [
        {
            id: "1",
            caseTitle: "ផ្សារក្រោម",
            date: new Date(),
            place: "តូបអ៊ីលាប",
            related: 100,
            province: "សៀមរាប",
            district: "សៀមរាប",
            commune: "ស្វាយដង្គំ",
            village: "ល្វា",
            remark: "ដេកពេទ្យ",
        },
        {
            id: "2",
            caseTitle: "ផ្សារលើ",
            date: new Date(),
            place: "តូបអ៊ីលាប",
            related: 100,
            province: "សៀមរាប",
            district: "សៀមរាប",
            commune: "ស្វាយដង្គំ",
            village: "ល្វា",
            remark: "ដេកពេទ្យ",
        },
    ])

    const [subCaseData, subCaseDataDispatch] = useReducer(caseReducer, [
        {
            id: "1",
            caseId: "1",
            name: "សំបូរ",
            gender: "ប្រុស",
            province: "សៀមរាប",
            district: "សៀមរាប",
            commune: "ស្វាយដង្គំ",
            village: "ល្វា",
            status: "អវិជ្ជមាន",
            relatedInfo: "ប្រយោល"
        },
        {
            id: "2",
            caseId: "2",
            name: "សំណាង",
            gender: "ប្រុស",
            province: "សៀមរាប",
            district: "សៀមរាប",
            commune: "ស្វាយដង្គំ",
            village: "ល្វា",
            status: "វិជ្ជមាន",
            relatedInfo: "ផ្ទាល់"
        },
    ])

    return (
        <CaseController.Provider
            value={{
                caseData,
                subCaseData,

                caseDataDispatch,
                subCaseDataDispatch,
            }}
        >
            {props.children}
        </CaseController.Provider>
    )
}
