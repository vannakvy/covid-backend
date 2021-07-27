import {gql} from '@apollo/client'

export const CREATE_NEW_HISTORYLOCATION = gql`
mutation createHistoryLocation(
    $case:ID!
    $personalInfo:ID!
    $date:DateTime
    $affectedLocationId:ID!
    $type:String
    $other:String
){
    createHistoryLocation(newHistoryLocation:{
      case:$case
      personalInfo:$personalInfo
      date:$date
      affectedLocationId:$affectedLocationId
      type:$type
      other:$other
    }){
      message
      success
    }
  }
`

export const GET_HISTORYLOCATION_BY_PERSON = gql`
query getHistoryLocationByPersonalInfoId($personalId:ID!){
	getHistoryLocationByPersonalInfoId(personalId:$personalId){
    affectedLocationId{
      id
      affectedLocationName
    }
    case{
      id
    }
    personalInfo{
      id
    }
    date
    type
  }
}
`