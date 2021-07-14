import {gql} from '@apollo/client'



export const GET_ALL_CASES = gql`
   query allCases{
        allCases{
            id
        }
    }

`