import express, { Express } from "express";
import { config } from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import routes from "../routes";
import store from "connect-mongo";

config();
require("../strategies/discord");

export function createApp(): Express {
  const app = express();
  // Enable parsing middleware for requests
  app.use(express.json());
  app.use(express.urlencoded());

  // Enable CORS
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );
  // Enable Sessions
  app.use(
    session({
      secret: process.env.COOKIE_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
      store: store.create({ mongoUrl: process.env.MONGODB_CONNECTION_URI! }),
    })
  );

  // Enable passport
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api", routes);
  return app;
}
