import { prisma } from "../../../../generated/prisma-client";

export default{
    Query:{
        searchPost: async(_,args)=>prisma.posts({
            where:
            {
                OR :[
                    {location_contains: args.term},//location_contains term포함하는 것 찾기
                    {caption_starts_with:args.term}//caption_starts_with : 잘모르겟다 좀 더 슈퍼 섹시하게 검색되도록 고민
                ]
            }
        })
    }
};