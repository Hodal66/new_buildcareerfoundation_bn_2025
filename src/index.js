import { ApolloServer } from "apollo-server";

import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

// import { connect } from "./database/db.config";
import { userResolver } from "./resolvers/userResolver.js";
import { userDefs } from "./schema/userDefs.js";
import { postResolver } from "./resolvers/postResolver.js";
import { postDefs } from "./schema/postDefs.js";
import { connect } from "./database/db.config.js";
import { subscriptionResolver } from "./resolvers/subscriptionResolver.js";
import { subscriptionDefs } from "./schema/subscriptionDefs.js";

// import { context } from "./context.js";

const resolvers = mergeResolvers([postResolver, userResolver,subscriptionResolver]);
const typeDefs = mergeTypeDefs([postDefs, userDefs, subscriptionDefs]);

const PORT = process.env.PORT || 4300;
// context
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context,
  csrfPrevention: false,
  cache: "bounded",
});

connect().then(() => {
  console.log("Database connected!");
  server.listen(PORT).then(({ url }) => console.info(`App on ${url}`));
});
