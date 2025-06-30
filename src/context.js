// import { decodeAuthHeader } from "./graphql/Auth";
// import { decodeAuthHeader } from "./resolvers/userResolver";

import { decodeAuthHeaders } from "./services_functions/decodeAuthHeaders.js";

// import { decodeAuthHeader } from "./services_functions/decodeAuthHeader";
export const context = ({ req }) => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeaders(req.headers.authorization)
      : null;
  // return {
  //   userId: token?.userId,
  //   email: token?.email,
  //   firstName: token?.firstName,
  // secondName: token?.secondName,
  // };
  return {
    userId: token?.userId,
    email: token?.email,
    firstName: token?.firstName,
    secondName: token?.secondName,
  };
};

// 1: First you have defined the Context interface, which specifies what objects will be attached to the context object. Right now it’s just an instance of PrismaClient, but this can change as the project grows.
// 2: You’re exporting the context object, so that it can be imported and used by the GraphQL server.
