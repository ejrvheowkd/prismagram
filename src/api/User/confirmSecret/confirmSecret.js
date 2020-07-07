import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
    Mutation:{
    confirmSecret:async(_,args) =>{//async 첫번쨰 인자 필요없으면 _,
        const {email,secret}=args;//args에서 email과 secret 인자를 가져온다
        const user = await prisma.user({email});//prisma에서 email을 인자로 사용자를 가져온다
        if(user.loginSecret=== secret){//if user.loginSecret와 secret이 같다면
            return generateToken(user.id);//jwt가 id를 암호화해서 토큰을 만들어 줘
        } else {
            throw Error("Wrong email.secret conviation");//같지않으면 에러전달
        }            
        }
    }
};