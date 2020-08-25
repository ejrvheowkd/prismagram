import { prisma } from "../../../generated/prisma-client";

export default{
    Post:{
        files:parent => prisma.post({id:parent.id}).files(),
        comments:parent => prisma.post({id:parent.id}).comments(),
        user: ({id}) => prisma.post({id}).user(),
        likes:({id})=>prisma.post({id}).likes(),
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
        .count(),
    }
};