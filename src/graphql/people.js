import { gql } from '@apollo/client'

export const GET_ALL_PERSONINFO = gql`
query getPersonalInfoWithPagination($page:Int!,$limit:Int!,$keyword:String){
    getPersonalInfoWithPagination(page:$page,limit:$limit,keyword:$keyword){
        personalInfos{
            id
          firstName
          lastName
          age
          gender
          tel
          nationality
          occupation
          idCard
          profileImg
          village
          commune
          district
          province
          case{
            id
          }
          direct
          other
          relapse
          relapseAt
          vaccinated
          createdAt
          updatedAt
          currentState{
            confirm
            confirmedAt
            death
            deathAt
            recovered
            recoveredAt
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

export const CREATE_NEW_PERSON = gql`
mutation createPersonalInfo(
    $firstName:String,
    $lastName:String,
    $age:Int,
    $gender:String,
    $tel:String,
    $nationality:String,
    $occupation:String,
    $idCard:String,
    $village:String,
    $commune:String,
    $vaccinated:Int,
    $district:String,
    $province:String,
    $case:ID!,
    $direct:Boolean,
    $other:String,
){
    createPersonalInfo(newInfo:{
            firstName:$firstName
            lastName:$lastName
            age:$age
            gender:$gender
            tel:$tel
            nationality:$nationality
            occupation:$occupation
            idCard:$idCard
            village:$village
            commune:$commune
            vaccinated:$vaccinated
            district:$district
            province:$province
            case: $case
            direct:$direct
            other: $other
    }){
      success
      message
    }
  }
`