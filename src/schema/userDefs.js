import { gql } from "apollo-server";
export const userDefs = gql`
  type Query {
    get_all_users: [UserCreated]!
    get_all_users_details: [UserCreatedPopulated]!
  }
  type Mutation {
    sign_up(input: UserSignUpInput): UserDataPayload!
    login_user(email: String!, password: String!): UserDataPayload!
    update_user(id: ID!, input: UserUpdateInput): UserCreated!
    delete_user(id: ID!): String!
  }

  input UserUpdateInput {
    email: String
    firstName: String
    secondName: String
    role: String
  }

  input UserSignUpInput {
    email: String!
    password: String!
    firstName: String!
    secondName: String!
    role: String
  }
  

  input UserLoginInput {
    email: String!
    password: String!
  }

  type UserDataPayload {
    token: String!
    user: UserCreated!
  }

  type UserCreated {
    email: String!
    password: String!
    firstName: String!
    secondName: String!
    _id: ID!
    role: String
    posts:[ID!]
  }

  type UserCreatedPopulated {
    email: String!
    password: String!
    firstName: String!
    secondName: String!
    _id: ID!
    role: String
    posts:[PostReturned]!
  }

`;
