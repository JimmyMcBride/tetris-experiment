import "reflect-metadata";

require("dotenv").config();

import { ExpressContext } from "../../lib/types";
import { ApolloServer } from "apollo-server-micro";
import Express from "express";
// import { createConnection } from "typeorm";
// import * as path from "path";
// import { buildSchema } from "type-graphql";
// import { createSchema } from "../../lib/schema";
import session from "express-session";
import connectRedis from "connect-redis";
// import cors from "cors";
import Redis from "ioredis";

import { LoginResolver } from "../../lib/resolvers/Auth/Login";

const app = Express();

const RedisStore = connectRedis(session);

const redis = new Redis(process.env.REDIS_URL);

// const ormConnection = async () => {
//   await createConnection({
//     name: "default",
//     type: "postgres",
//     url: process.env.DATABASE_URL,
//     synchronize: true,
//     logging: true,
//     entities: ["src/entity/*.*"],
//     extra: {
//       ssl: process.env.SSL || false,
//     },
//   });
// };

const sessionOptions = {
  store: new RedisStore({
    client: redis as any,
  }),
  name: "qid",
  secret: String(process.env.SECRET),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
  },
};

// const schema = buildSchema({
//   // resolvers: [__dirname + "/resolvers/**/*.ts"],
//   resolvers: [LoginResolver],
//   // authChecker: ({ context: { req } }) => {
//   //   return !!req.session.userId;
//   // },
//   emitSchemaFile: path.resolve(__dirname, "../../lib/schema.gql"),
// });

const schema = {
  Mutation: {
    LoginResolver,
  },
};

const apolloServer = new ApolloServer({
  schema,
  context: ({ req, res }: ExpressContext) => ({ req, res }),
});

// const main = async () => {
// ormConnection();

// app.use(
//   cors({
//     credentials: true,
//     origin: process.env.CORS_ORIGIN,
//   })
// );

app.use(session(sessionOptions));

// apolloServer.applyMiddleware({ app, cors: false });

// app.listen(onmessage, () => {
//   setTimeout(() => console.log(onmessage), 500);
// });
// };

// main();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
