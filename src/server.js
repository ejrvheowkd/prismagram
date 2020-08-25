import "./env";

import { GraphQLServer} from "graphql-yoga";
import logger from "morgan";
//import passport from "passport"; //passport 모듈
import schema from "./schema";
import {sendSecretMail} from "./utils"; //3.3
import "./passport" //passport 파일
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
//sendSecretMail("hoao1313@naver.com","123");//3.3

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({schema,
    context:({request}) => ({request,isAuthenticated})
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({port:PORT},() =>
 console.log(`Server running on http://localhost:${PORT}`)
 );