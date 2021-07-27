import { gql } from '@apollo/client'

export const GET_ALL_HOSPITAL = gql`
# Write your query or mutation here
query getHospitalInfoWithPagination($page:Int!,$limit:Int!,$keyword:String){
  getHospitalInfoWithPagination(page:$page,limit:$limit,keyword:$keyword){
    hospitalInfos{
      id
      hospitalName
      village
      commune
      district
      province
      long
      lat
      createdAt
      updatedAt
      other
      personInCharge{
        firstName
        lastName
        position
        others
        tel
      }
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

export const CREATE_HOSPITALINFO = gql`
mutation createHospitalInfo(
    $hospitalName:String,
    $village:String,
    $commune:String,
    $district:String,
    $province:String,
    $long:Float,
    $lat:Float,
    $other:String,
    $firstName:String,
    $lastName:String,
    $position:String,
    $others:String,
    $tel:String,
){
    createHospitalInfo(newHospitalInfo:{
      hospitalName:$hospitalName
      village:$village
      commune:$commune
      district:$district
      province:$province
      long:$long
      lat:$lat
      other:$other
      personInCharge:{
        firstName:$firstName
        lastName:$lastName
        position:$position
        others:$others
        tel:$tel
      }
    }){
      success
      message
      hospitalInfos{
        id
        hospitalName
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

export const DELETE_HOSPITALINFO_BY_ID = gql`
mutation deleteHospitalInfo($id:ID!){
    deleteHospitalInfo(id:$id){
      success
      message
    }
  }
`;

export const CREATE_NEW_HOSPITALIZATION = gql`
mutation createHospitalization(
    $date_in:DateTime
    $date_out:DateTime
    $personalInfo:ID!
    $hospitalInfo:ID!
    $others:String
    
){
  createHospitalization(newHospitalization:{
    date_in:$date_in
    date_out:$date_out
    personalInfo:$personalInfo
    hospitalInfo:$hospitalInfo
    others:$others
    
  }){
    success
    message
  }
}
`;




export const GET_PERSON_BY_HOSPITALINFO = gql`
query getQuarantineByHospitalIdIdWithPagination($page:Int!,$limit:Int!,$keyword:String,$hospitalId:ID!){
  getQuarantineByHospitalIdIdWithPagination(page:$page,limit:$limit,keyword:$keyword,hospitalId:$hospitalId){
    hospitalizations{
      id
      date_in
      date_out
      out_status
      personalInfo{
        id
        firstName
        lastName
        village
        commune
        district
        province
        direct
        currentState{
          confirm
          death
          recovered
        }
      }
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

export const GET_HOSPITALINFO_BY_ID = gql`
query getHospitalInfoById($id:ID!){
	getHospitalInfoById(id:$id){
   	id
    hospitalName
    village
    commune
    district
    province
    long
    lat
    other
    personInCharge{
      firstName
      lastName
      position
      others
      tel
    }
  }
}
`;

export const UPDATE_HOSPITALINFO_BY_ID = gql`
mutation updateHospitalInfo(
    $hospitalName:String
    $village:String
    $commune:String
    $district:String
    $province:String
    $long:Float
    $lat:Float
    $other:String
    $firstName:String
    $lastName:String
    $position:String
    $others:String
    $tel:String
    $id:ID!
){
  updateHospitalInfo(updatedHospitalInfo:{
    hospitalName:$hospitalName
    village:$village
    commune:$commune
    district:$district
    province:$province
    long:$long
    lat:$lat
    other:$other
    personInCharge:{
      firstName:$firstName
      lastName:$lastName
      position:$position
      others:$others
      tel:$tel
    }
  },id:$id){
    success
    message
  }
}
`;

export const UPDATE_PERSON_BY_HOSPITALINFO = gql`
mutation updateHospitalization(
    $date_in:DateTime,
    $date_out:DateTime,
    $personalInfo:ID!,
    $hospitalInfo:ID!,
    $others:String,
    $id:ID!
){
	updateHospitalization(updatedHospitalization:{
    date_in:$date_in
    date_out:$date_out
    personalInfo:$personalInfo
    hospitalInfo:$hospitalInfo
    others:$others
  },id:$id){
    success
    message
  }
}
`;

export const DELETE_PERSON_BY_HOSPITAL = gql`
mutation deleteHospitalization($id:ID!){
  deleteHospitalization(id:$id){
    success
    message
  }
}
`;

export const ALL_HOSPIAL_INFO = gql`
  query  allHospitalInfos{
    allHospitalInfos{
      id
      hospitalName
      village
      commune
      district
      province
      long
      lat
      other
      createdAt
      updatedAt
      personInCharge{
        firstName
        lastName
        position
        tel
      }
    }
  }
`