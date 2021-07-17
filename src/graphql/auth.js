import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      user {
        id
        email
        username
        lastName
        firstName
        image
        tel
        roles {
          id
          role
        }
        createdAt
        updatedAt
      }
      token
    }
  }
`;

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const REGISTER_USER = gql`
mutation registerUser($username:String!, $password:String!,$firstname:String!,$lastname:String!,$email:String!,$role:String!,$tel:String!){
  registerUser(newUser:{
    username:$username
    password:$password
    firstName:$firstname
    lastName:$lastname
    email:$email
    role:$role
    tel:$tel
  }){
    success
    message
  }
}

`;

export const GET_ALL_USERS = gql `
query getUserWithPagination($page:Int,$limit:Int,$keyword:String){
  getUserWithPagination(page:$page,limit:$limit,keyword:$keyword){
  	users{
      id
      username
      lastName
      firstName
      email
    	roles{
        id
        role
      }
      tel
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

export const UPDATE_USER_DETAIL = gql`
mutation updateUserDetail($userId:ID!,$firstName:String!,$lastName:String!,$email:String!,$tel:String!){
  updateUserDetail(
    userId:$userId,
    tel:$tel,
    firstName:$firstName,
    lastName:$lastName,
    email:$email
    ){
    success
    message
  }
}
`;

export const DELETE_USER = gql`
mutation deleteUser($userId:ID!){
  deleteUser(userId:$userId){
    success
    message
  }
}
`;

export const ADD_USER_ROLE = gql`
mutation addRole($userId:ID!,$role:String!){
  addRole(userId:$userId,role:$role){
    success
    message
  }
}
`;


