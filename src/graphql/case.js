import {gql} from '@apollo/client'



export const GET_ALL_CASES = gql`
query getCaseWithPagination($page:Int!, $limit:Int!, $keyword:String){
    getCaseWithPagination(page:$page,limit:$limit,keyword:$keyword){
      cases{
        id
        caseName
        village
        commune
        district
        province
        date
        createdAt
        updatedAt
        long
        lat
        other
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

`

export const CREATE_NEW_CASE = gql`
mutation createCase($caseName:String,$village:String,$commune:String,$district:String,$province:String,$date:DateTime,$lat:Float,$long:Float,$other:String){
    createCase(newCase:{
      caseName:$caseName
      village:$village
      commune:$commune
      district:$district
      province:$province
      date:$date
        lat:$lat
      long:$long
      other:$other
    }){
      success
      message
    }
  }
`;