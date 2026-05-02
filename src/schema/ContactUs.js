import { gql } from "apollo-server";

export const ContactUsDefs = gql`
  type Query {
    getAllContactUs: [ContactUsReturned]!
    getOneContactUs(id: ID!): ContactUsReturned!
  }

  type Mutation {
    addContactUs(input: ContactUsInput): ContactUsReturned!
    updateContactUs(input: ContactUsInputUpdate!): ContactUsReturned!
    deleteContactUs(input: ID!): DeletedStatusObject!
  }

  type ContactUsReturned {
    _id: ID!
    fullName: String!
    phoneNumber: String!
    email: String!
    message: String!
    date_ContactUsed: String!
  }

  input ContactUsInput {
    fullName: String!
    phoneNumber: String
    email: String!
    message: String!
    date_ContactUsed: String
    user_id: ID
  }

  input ContactUsInputUpdate {
    fullName: String!
    phoneNumber: String!
    email: String!
    message: String!
    date_ContactUsed: String!
    ContactUs_id: ID!
  }

  type DeletedStatusObject {
    isDeleted: Boolean!
    message: String!
  }
`;
