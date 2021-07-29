import { gql } from '@apollo/client'

export const GET_ALL_LOCATION = gql`
query{
    allAffectedLocations{
      id
      affectedLocationName
      village
      commune
      district
      province
      other
      open
      openAt
      closeAt
      long
      lat
      coorporate
      infected
    }
  }
`;

export const CREATE_NEW_LOCATION = gql`
mutation createAffectedLocation(
  $affectedLocationName:String,
  $village:String,
  $commune:String,
  $district:String,
  $province:String,
  $other:String,
  $long:Float,
  $lat:Float,
){
  createAffectedLocation(newAffectedLocation:{
		affectedLocationName:$affectedLocationName
    village:$village
    commune:$commune
    district:$district
    province:$province
    other:$other
    long:$long
    lat:$lat
  }){
    message
    success
    affectedLocation{
      id
      affectedLocationName
    }
  }
}
`;

export const GET_AFFECTED_LOCATION_PAGINATION = gql`
query getAffectedLocationWithPagination($page:Int!,$limit:Int!,$keyword:String){
  getAffectedLocationWithPagination(page:$page,limit:$limit,keyword:$keyword){
    affectedLocations{
      id
      affectedLocationName
      village
      commune
      district
      province
      other
      open
      openAt
      closeAt
      long
      lat
      coorporate
      infected

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

export const DELETE_AFFECTEDLOCATION_BY_ID = gql`
mutation deleteAffectedLocation($id:ID!){
  deleteAffectedLocation(id:$id){
    success
    message
  }
}

`

export const UPDATE_AFFECTEDLOCATION_BY_ID = gql`
mutation updateAffectedLocation(
  $id:ID!,
  $affectedLocationName: String,
  $village: String,
  $commune: String,
  $district: String,
  $province: String,
  $other: String,
  $openAt: DateTime,
  $closeAt: DateTime,
  $long: Float,
  $lat: Float,
  ){
  updateAffectedLocation(id:$id, updatedAffectedLocation:{
affectedLocationName: $affectedLocationName
village: $village
commune: $commune
district: $district
province: $province
other: $other
openAt: $openAt
closeAt: $closeAt
long: $long
lat: $lat
  }){
    success
    message
  }
}`
