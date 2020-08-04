import { prisma } from "../../../generated/prisma-client";

export default{
    User:{
        fullName:(parent)=> {
            return `${parent.firstName} ${parent.lastName}`;
        },
        amIFollowing:async(parent,_,{request})=>{
            const {user}= request;
            const {id:parentId} = parent;//변수를 바꾸는 방법 id를 받아와서 parent로 뺴고 다시 parentId로 넣는다
        //이 유저가 그를 following 하고 있는지 확인하고 싶고 누가 이 userProfile을 요구하는지 알고 싶고
        //누군가 amIFollowing를 확인하면 요청앟ㄴ사람이 이 게시물을 팔로잉 했는지 표시하는 부분
        try{  
            const exists =await prisma.$exists.user({ //await를 안쓰고 쓰면 값이 달라지는 이유는>
                AND: [{id:parentId},{followers_some:[user.id]}]
            });//user 데이터베이스 id에 parentid가 있는지 and(그리고) followers_some:팔로우 리스트에d 잇는가 확인
            if(exists)
            {
                return true;
            }else{
                return false;
            }
        } catch(error) {
            return false;
        }
    },
        itsMe:(parent,_,{request})=>{
            const {user} = request;
            const {id:parentId} = parent;
            return user.id===parentId;//=== ( =뜻)
        }
    }
};