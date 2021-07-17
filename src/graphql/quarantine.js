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
        Lat
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