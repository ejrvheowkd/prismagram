import { prisma } from "../../../../generated/prisma-client";

export default{
    Query:{
        //user찾는데 사용자 인증과정 필요없으니 안함
        searchUser:async(_,args)=>
        prisma.users({
            where:{
            OR:[
                {username_contains: args.term},
                {firstName_contains: args.trem},
                {lastName_contains: args.term}
            ]
        }
        })
    }
};