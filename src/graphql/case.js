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

export const GET_ALL_CASES_NO_LIMIT = gql`
query allCases{
  allCases{
    id
    caseName
  }
}
`;

export const GET_PERSON_BY_CASE = gql`
query getPersonalInfoByCaseWithPagination($page:Int!,$limit:Int!,$keyword:String,$caseId:ID!){
  getPersonalInfoByCaseWithPagination(page:$page,limit:$limit,keyword:$keyword,caseId:$caseId){
    personalInfos{
      id
      firstName
      lastName
      gender
      village
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

export const GET_CASE_BY_ID = gql`
query getCaseById($id:ID!){
	getCaseById(id:$id){
    id
    caseName
    village
    commune
    district
    province
    other
    date
    long
    lat
    createdAt
    updatedAt
  }
}
`;