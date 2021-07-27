import {gql} from "@apollo/client"

export const GET_ALL_QUARANTINEINFO = gql`
query getQuarantineInfoWithPagination($page:Int!,$limit:Int!,$keyword:String){
    getQuarantineInfoWithPagination(page:$page,limit:$limit,keyword:$keyword){
      quarantineInfos{
        id
        locationName
        village
        commune
        district
        province
        other
        capacity
        personInCharge{
            firstName
            lastName
            position
            tel
            others
        }
        long
        lat
        createdAt
        updatedAt
       
      },
      paginator{
        slNo
        prev
        next
        perPage
        totalPosts
        totalPages
        currentPage
        hasPrevPage
        hasNextPage
        totalDocs
      }
    }
  }
`;

export const CREATE_QUARANTINEINFO = gql`
mutation createQuarantineInfo(
    $locationName:String,
    $village:String,
    $commune:String,
    $district:String,
    $province:String,
    $long: Float,
    $lat:Float,
    $other:String,
    $firstName:String,
    $lastName:String,
    $position:String,
    $tel:String,
    $others:String,
){
    createQuarantineInfo(newQuarantineInfo:{
      locationName:$locationName
      village:$village
      commune:$commune
      district: $district
      province:$province
      long: $long
      lat:$lat
      other:$other
      personInCharge:{
        firstName:$firstName
        lastName:$lastName
        position:$position
        tel:$tel
        others:$others
      }
    }){
      success
      message
      quarantineInfo{
        capacity
        id
        locationName
        village
        commune
        district
        province
        long
        lat
        other
      }
    }
  }
`;

export const DELETE_QUARANTINE_BY_ID = gql`
mutation deleteQuarantineInfo($id:ID!){
    deleteQuarantineInfo(id:$id){
      success
      message
    }
  }
`;

export const CREATE_PERSON_QUARANTINE = gql`
mutation createQuarantine(
  $date_in:DateTime,
  $date_out:DateTime,
  $personalInfo:ID!,
  $quarantineInfo:ID!,
  $others:String,
  $personalType:String
){
  createQuarantine(newQuarantine:{
    date_in:$date_in
    date_out:$date_out
    personalInfo:$personalInfo
    quarantineInfo:$quarantineInfo
    others:$others
    personalType:$personalType
  }){
    success
    message
  }
}
`;

export const GET_PERSON_BY_QUARANTINE = gql`
query getQuarantineByQurantineIdWithPagination(
  $page:Int!,
  $limit:Int!,
  $keyword:String,
  $quarantineInfoId:ID!
){
  getQuarantineByQurantineIdWithPagination(page:$page,limit:$limit,keyword:$keyword,quarantineInfoId:$quarantineInfoId){
    quarantines{
      id
      date_in
      date_out
      personalInfo{
      	id
        firstName
        lastName
        village
        gender
        district
        commune
        province
        direct
        currentState{
          confirm
          death
          recovered
        }
    	}
      
      personalType
      others
    }
    paginator{
      slNo
      prev
      next
      perPage
      totalPosts
      totalPages
      currentPage
      hasPrevPage
      hasNextPage
      totalDocs
    }
  }
}
`;

export const GET_QUARANTINE_BY_ID = gql`
query getQuarantineInfoById($id:ID!){
  getQuarantineInfoById(id:$id){
    capacity
    id
    locationName
    village
    commune
    district
    province
    long
    lat
    createdAt
    updatedAt
    personInCharge{
      firstName
      lastName
      position
      others
      tel
    }
    other
  }
}
`;

export const UPDATE_QUARANTINE_BY_ID = gql`
mutation updateQuarantineInfo(
    $locationName:String,
    $village:String,
    $commune:String,
    $district:String,
    $province:String,
    $long:Float,
    $lat:Float,
    $other:String,
    $capacity:Int,
    $firstName:String,
    $lastName:String,
    $tel:String,
    $position:String,
    $others:String,
    $id:ID!
){
  updateQuarantineInfo(updatedQuarantineInfo:{
    locationName:$locationName
    village:$village
    commune:$commune
    district:$district
    province:$province
    long:$long
    lat:$lat
    other:$other
    capacity:$capacity
    personInCharge:{
      firstName:$firstName
      lastName:$lastName
      tel:$tel
      position:$position
      others:$others
    }
  },id:$id){
    message
    success
  }
}
`;

export const DELETE_PERSON_BY_QUARANTINE = gql`
mutation deleteQuarantine($id:ID!){
  deleteQuarantine(id:$id){
    success
    message
  }
}
`;

export const UPDATE_PEOPLE_BY_QUARANTINE = gql`
mutation updateQuarantine(
    $in:Boolean,
    $date_in:DateTime,
    $date_out:DateTime,
    $personalType:String,
    $out_status:String,
    $personalInfo:ID!,
    $quarantineInfo:ID!,
    $others:String,
    $id:ID!
){
  updateQuarantine(updatedQuarantine:{
    in:$in
    date_in:$date_in
    date_out:$date_out
    personalType:$personalType
    out_status:$out_status
    personalInfo:$personalInfo
    quarantineInfo:$quarantineInfo
    others:$others
  },id:$id){
    message
    success
  }
}
`;


export const ALL_QUARANTINEINFO = gql`
query allQuarantineInfos{
  allQuarantineInfos{
    capacity
    locationName
    id
    village
    commune
    district
    province
    long 
    lat
    personInCharge{
      firstName 
      lastName 
      position
      others
      tel
    }
  }}


`