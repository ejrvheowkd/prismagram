import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import passport from "passport";
import JwtStrateqy from "passport-jwt";

const jwtOptions = { 
    jwtFromRequest: JwtStrateqy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secret :process.env.JWT_SECRET
};

const verifyUser = (payload,done)=>{
    try{
        
    }
};

passport.use(new JwtStrateqy(jwtOptions,verifyUser))