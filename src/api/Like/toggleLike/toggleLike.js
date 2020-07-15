import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        toggleLike: async(_, args, {request})=>{//playground에서 밑에 http가 request로 들어온다. 없으면 오류
            isAuthenticated(request);//request가 있나 없나 확인 middlewares.js에서
            const { postId} = args;
            const {user} = request;
            const filterOptions =
            {
                AND:[
                    {user:{
                        id:user.id
                    }
                },
                {
                    post:{
                        id:postId
                    }
                }
                ]
            };
         try{
            const existingLike = await prisma.$exists.like(filterOptions);
            if(existingLike)
            {
                await prisma.deleteManyLikes(filterOptions);
            } else 
            {
                await prisma.createLike({user:{
                    connect:{
                        id: user.id
                    }
                },
                        post:
                        {
                            connect:{
                            id:postId
                            }
                        }
                });
            }
            return true;
         }catch{
             return false;
         }
        }
    }
};