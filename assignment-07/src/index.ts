import "dotenv/config";
import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";
import { typeDefs } from "./typeDefs.js";
import { resolvers as makeResolvers } from "./resolvers.js";
import { prisma } from "./prisma.js";

const yoga = createYoga({
  graphqlEndpoint: "/graphql",
  graphiql: true,
  schema: createSchema({
    typeDefs,
    resolvers: makeResolvers(prisma),
  }),
});

const port = Number(process.env.PORT ?? 4000);

createServer(yoga).listen(port, "0.0.0.0", () => {
  console.log(`GraphQL listo: http://localhost:${port}/graphql`);
});