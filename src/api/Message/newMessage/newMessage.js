import { prisma } from "../../../../generated/prisma-client";

export default{
    Subscription: {
        newMessage: {
            subscribe: (_,args) => {
                const {roomId}  = args;
                return prisma.$subscribe.message({
                    AND:[
                        {mutation_in:"CREATED"},
                        {
                            node:{
                                room:{id:roomId}
                            }
                        }
                    ]
                }).node();
            },
            resolve: payload=>payload//payload는 새로운것이 막 변경되면 리턴하는거다
        }
    }
};