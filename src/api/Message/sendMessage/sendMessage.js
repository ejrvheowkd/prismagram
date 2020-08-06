import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragment";

export default {
    Mutation:{
        sendMessage: async(_,args,{request ,isAuthenticated})=>{
            isAuthenticated(request);
            const {user }=request;
            const {roomId,message,toId}=args;//두개의 id roomId toId
            let room;
            if(roomId===undefined){//만약 roomId가 정의 안햇으면
                if(user.id!==toId){
               room = await prisma.createRoom({//새로운 romm을 만든다
                    participants: {
                    connect:[{id:toId},{id:user.id}] 
                }
             
            }).$fragment(ROOM_FRAGMENT);
        }
            }else {//roomId가 정의되어있으면
                //room을 가져오고
               room = await prisma.room({id:roomId}).$fragment(ROOM_FRAGMENT);
            }
            if(!room){
                throw Error("Room not found");
            }
            const getTo = room.participants.filter(participant =>participant.id!==user.id)[0];
            //getTo는 요청하는 유저가 아닌 resolver를 요청하는 user이다
            return prisma.createMessage({
                text:message,
                from:{
                    connect:{id:user.id}
                }
            ,
        to:{
            connect:{
                id:roomId?getTo.id:toId
            }
        },
        room: {
            connect:{
                id: room.id
            }
        }
       });
                
        }
    }
};