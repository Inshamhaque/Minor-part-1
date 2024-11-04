// get contacts by department
import { NextResponse, NextRequest } from "next/server";
import { redis } from "@/lib/redis";
import client from '@/prisma/index'
export async function POST(req: NextRequest){
    const  { department  }  = await req.json();
    //flow - first check in redis 
    const acronym = department.split(' ')[0];
    const data  = [];
    try{
        const data = await redis.get(acronym);
        if(!data){
            // redis does not contain 
            const data = await client.user.findMany({
                where : {
                    department
                }
            })
            //filter the data list 
            const filteredData = data.map((each)=>{
                return{
                    department : each.department,
                    facultyId :  each.facultyId,
                    name : each.name
                }
            })
            //set in the redis for future use 
            await redis.set(acronym,filteredData);
            redis.expire(acronym,172800);
            return NextResponse.json({
                data
            },{
                status : 200
            })

        }    
        // if data was found in the redis 
        return NextResponse.json({
            data
        },{
            status : 200
        })
    }
    catch(e){
        return NextResponse.json({
            msg : "some error occurred"
        },{
            status : 500
        })
    }
    
    
    
}