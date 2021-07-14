import {gql} from '@apollo-client'



export const LOGIN = gql`
    loginUser($username:String!,$password:String!){
        loginUser(username:$username,password:$password){
            user{
            id
    }
    token
        }
   
  }

`