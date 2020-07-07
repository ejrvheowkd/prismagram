import dotenv from "dotenv";
import path from "path";
dotenv.config({path:path.resolve(__dirname,".env")});

import { GraphQLServer} from "graphql-yoga";
import logger from "morgan";
import passport from "passport";
import schema from "./schema";
import {sendSecretMail} from "./utils"; //3.3
import "./passport"

sendSecretMail("hoao1313@naver.com","123");//3.3

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({schema});


server.express.use(logger("dev"));
server.express.use(passport.authenticate("jwt"))

server.start({port:PORT},() =>
 console.log(`Server running on http://localhost:${PORT}`)
 );