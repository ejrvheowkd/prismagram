import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        upload : async(_,args,{request,isAuthenticated})=>{
            isAuthenticated(request);
            const {user} =request;
            const {caption,files}=args;
            const post = await prisma.createPost({
                caption,
                user:{connect:{id:user.id}}
            });
            files.forEach(async file => //files가 많은 URL들의 array라는 것
                await prisma.createFile({//await가 prisma에서 가져오는 거 같아 models.graphql은 prisma 쿼리 형태
                    url:file,
                    post:{
                        connect:{
                            id:post.id
                        }
                    }
                })
            );
            return post;
        }
    }
}; 