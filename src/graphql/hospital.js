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