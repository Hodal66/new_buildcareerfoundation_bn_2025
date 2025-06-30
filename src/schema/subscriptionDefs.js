
import { gql } from "apollo-server";

export const subscriptionDefs = gql`
  type Query {
    getAllSubscriptions: [SubscriptionsToBeReturned]!
  }
  type Mutation {
    makeSubscribe(input: SubscriptionsInput): SubscriptionsToBeReturned!
    deleteSubscriber(input:ID!):DeletedStatusObject!
  }

  type SubscriptionsToBeReturned {
    id: ID!
    subscriptionWithEmail: String!
    date_subscribed: String!
  }
  input SubscriptionsInput {
    subscriptionWithEmail: String!
  }
  input IdToUseWhileDeleting {
    subscriber_id: ID!
  }
  type DeletedStatusObject {
    isDeleted: Boolean!
    message: String!
  }
`;
