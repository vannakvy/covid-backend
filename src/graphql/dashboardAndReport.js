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

export const GET_DATA_FOR_MAP =gql`
query  getAllDistrictForMap{
    getAllDistrictForMap{
            death
        confirmedCase
        confirmedCaseToday
        deathToday
        recovered
        recoveredToday
        _id
    }

  } 


`