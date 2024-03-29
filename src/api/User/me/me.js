import { isAuthenticated } from "../../../middlewares"
import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragment";

export default{
    Query: {
        me: async (_,__,{request,isAuthenticated})=>{
            isAuthenticated(request);//더블언더스코어는 부모의 arguments를 뜻한다
            const {user} = request;
          return await prisma.user({id: user.id});
         
        }
    }
};