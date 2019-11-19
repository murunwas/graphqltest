import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloWorldResolver } from "./resolvers/HelloWorldResolver";
import { MovieResolver } from "./resolvers/MovieResolver";
import { CryptoResolver } from "./resolvers/CryptoResolver";
import dbConnection from "./config/db"

(async () => {
  const app = express();

  await dbConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloWorldResolver, MovieResolver, CryptoResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const PORT = process.env.PORT||8080;
  app.listen(PORT, () => {
    console.log("express server started");
  });
})();
