import { prisma } from "../../../generated/prisma-client";

export default{
    Post:{
        isLiked: (parent, _,{request})=> {
            const {user} = request; //requset에서 체크해서 user 받고
            const {id} = parent; // 이미지의 id를 받는다
            return prisma.$exists.like({
                AND:[
                    {
                    user:{
                        id: user.id
                    }
                },
                {
                    post:{
                        id
                    }
                }
            ]
        });
        },
        likeCount : parent=> 
        prisma.likesConnection({
            where: {post:{id:parent.id}}
        })
        .aggregate()
        .count()
    }
};