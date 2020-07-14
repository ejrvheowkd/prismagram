import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import passport from "passport";
import {Strategy,ExtractJwt} from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = { 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
     secretOrKey: process.env.JWT_SECRET
};

const verifyUser =async(payload,done)=>{
    try{
        const user = await prisma.user({id:payload.id});
        if(user!=null){
            return done(null,user);
        } else {
            return done(null,false);
        }
    }catch(error)
    {
        return done(error,false);
    }
};
export const authenticateJwt =(req,res,next)=>
//아래 passport에 어떤 것도 입력되지 않기를 원하므로 sessions:false옵션 추가
//passport가 함수에 사용자 정보를 전달해줄거야
//여기아래부터 표시까지 함수야
passport.authenticate("jwt",{sessions:false},(error,user)=>{
    if(user){
        req.user=user;
    }
    next();//user가 없다면 아무것도 하지 않는다.next()호출
    ////////////
})(req,res,next);

passport.use(new Strategy(jwtOptions,verifyUser));
passport.initialize();

