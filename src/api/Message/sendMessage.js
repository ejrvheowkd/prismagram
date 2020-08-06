import { prisma } from "../../../generated/prisma-client";

export default {
    Mutation:{
        sendMessage: async(_,args,{request ,isAuthenticated})=>{
            isAuthenticated(request);
            const {user }=request;
            const {roomId,message,toID}=args;
            let room;
            if(roomId===undefined){
                if(user.id!==to){
               room = await prisma.createdRoom({
                    participants: {
                    connect:[{id:toID},{id:user.id}] 
                }
             
            });
        }
            }else {
               room = await prisma.room({id:roomId});
               if(!room){
                throw Error("Room not found");
            }
            }
                
            return null;
        }
    }
};