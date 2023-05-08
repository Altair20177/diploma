import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser($email: String, $password: String) {
    getUser(email: $email, password: $password) {
      user {
        id
        email
        name
        surname
        password
        passport
        age
      }
      topCrypts {
        id
        name
        priceUsd
      }
      cryptsInWallet {
        id
        name
        priceUsd
      }
    }
  }
`;
