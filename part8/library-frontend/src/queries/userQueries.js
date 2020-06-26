import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const GET_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`
