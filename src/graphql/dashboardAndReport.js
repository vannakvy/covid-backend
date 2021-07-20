import {gql} from '@apollo/client'


export const GET_ALL_PROVINCE =gql`

query getAllProvince($district:String){
    getAllProvince(district:$district){
            death
        recovered
        confirmedCase
        deathToday
        recoveredToday
        confirmedCaseToday
    }
}

`

// export const GET_ALL_PROVINCE_BY_PROVINCE =gql`
// query getAllProvince{
//     getAllProvince{
//             death
//         recovered
//         confirmedCase
//         deathToday
//         recoveredToday
//         confirmedCaseToday
//     }
// }

// `