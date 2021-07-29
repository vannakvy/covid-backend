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
          interviewed
          province
          englishName
          patientId
          illness
          relation
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
    $interviewed:Boolean
    $englishName:String
    $patientId:String
    $illness:String
    $relation:String
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
            interviewed:$interviewed
            englishName:$englishName
            patientId:$patientId
            illness:$illness
            relation:$relation
    }){
      success
      message
    }
  }
`

export const GET_ALL_PERSONINFO_NO_LIMIT = gql`
query allPersonalInfos{
  allPersonalInfos{
    id
    firstName
    lastName
    gender
    nationality
    occupation
    village
    commune
    district
    province
    direct
    currentState{
      confirm
      confirmedAt
      recovered
      recoveredAt
      death
      deathAt
    }
  }
}
`;

export const RECORD_SAMPLETEST = gql`
mutation recordSampleTest(
  $date:DateTime,
  $times:Int,
  $location:String,
  $result:Boolean,
  $symptom:String,
  $other:String,
  $reasonForTesting:String,
  $symptomStart:DateTime,
  $labFormCompletedBy:String,
  $specimentType:String,
  $laboratory:String,
  $personalInfoId:ID!,
){
  recordSampleTest(sampleTest:{
    date:$date
    times:$times
    location:$location
    result:$result
    symptom:$symptom
    other:$other
    reasonForTesting:$reasonForTesting
    symptomStart:$symptomStart
    labFormCompletedBy:$labFormCompletedBy
    specimentType:$specimentType
    laboratory:$laboratory
  },personalInfoId:$personalInfoId){
    message
    success
  }
}
`;

export const GET_PERSONALINFO_BY_ID = gql`
query getPersonalInfoById($id:ID!){
  getPersonalInfoById(id:$id){
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
    interviewed
    province
    englishName
    patientId
    illness
    createdAt
    relation
    case{
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
    }
    direct
    other
    relapse
    relapseAt
    vaccinated
    currentState{
      confirm
      confirmedAt
      death
      deathAt
      recovered
      recoveredAt
    }
    sampleTest{
      id
      date
      times
      location
      result
      symptom
      other
      reasonForTesting
      symptomStart
      labFormCompletedBy
      specimentType
      laboratory
    }
  }
}

`;

export const DELETE_PERSONALINFO_BY_ID = gql`
mutation deletePersonalInfo($id:ID!){
  deletePersonalInfo(id:$id){
    success
    message
  }
}
`;

export const GET_HOSPITAL_QUARANTINE_BY_PERSON = gql`
query getHospitalizationByPersonalInfo($personalId:ID!){
  getHospitalizationByPersonalInfo(personalId:$personalId){
    hospitalInfo{
      id
      date_in
      date_out
      others
      hospitalInfo{
        id
        hospitalName
        village
        commune
        district
        province
      }
    }
    quarantineInfo{
      id
      date_in
      date_out
      quarantineInfo{
        id
        locationName
        village
        commune
        district
        province
      }
      personalType
      others

    }
  }
}

`;

export const UPDATE_PERSON_BY_ID = gql`
mutation updatePersonalInfo(
    $firstName:String,
    $interviewed:Boolean,
    $lastName:String,
    $age:Int,
    $gender:String,
    $other:String,
    $tel:String,
    $case:ID!,
    $nationality:String,
    $occupation:String,
    $idCard:String,
    $village:String,
    $commune:String,
    $district:String,
    $province:String,
    $vaccinated:Int,
    $id:ID!
    $englishName:String,
    $patientId:String,
    $relation:String
    $illness:String
){
  updatePersonalInfo(updatedInfo:{
    firstName:$firstName
    interviewed:$interviewed
    lastName:$lastName
    age:$age
    gender:$gender
    other:$other
    tel:$tel
    case:$case
    nationality:$nationality
    occupation:$occupation
    idCard:$idCard
    village:$village
    commune:$commune
    district:$district
    province:$province
    vaccinated:$vaccinated
    englishName:$englishName
    patientId:$patientId
    relation:$relation
    illness:$illness
  },id:$id){
    success
    message
  }
}
`;

export const DELETE_SAMPLETEST = gql`
mutation deleteSampleTest($sampleTestId:ID!,$personalInfoId:ID!){
  deleteSampleTest(sampleTestId:$sampleTestId,personalInfoId:$personalInfoId){
    success
    message
  }
}

`

export const UPDATE_CURRENTSTATE_BY_ID = gql`
mutation updateCurrentState(
  $personalInfoId:ID!,
  $confirm: Boolean,
  $confirmedAt: DateTime,
  $recovered: Boolean,
  $recoveredAt: DateTime,
  $death: Boolean,
  $deathAt: DateTime
){
  updateCurrentState(personalInfoId:$personalInfoId,updateValue:{
    confirm:$confirm
    confirmedAt:$confirmedAt
    recovered:$recovered
    recoveredAt:$recoveredAt
    death:$death
    deathAt:$deathAt
  }){
    success
    message
  }
}
`


export const GET_INTERVIEW = gql`
query getConfirmedPersonalInfoByInterviewWithPagination($interview: Boolean,$page:Int!,$limit:Int!,$keyword:String){
  getConfirmedPersonalInfoByInterviewWithPagination(interview:$interview, page:$page,limit:$limit,keyword:$keyword){
        personalInfos{
          id
          idCard
          patientId
          firstName
          lastName
          gender
          age
          nationality
          village
          commune
          district
          province
          tel
          other
          interviewed
          currentState{ 
            confirm
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