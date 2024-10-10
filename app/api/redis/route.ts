import { NextRequest, NextResponse } from 'next/server';
//connecting to redis client
import { Redis } from '@upstash/redis';

// TODO:  try to use this in the process.env ... not working fine 
const redis = new Redis({
  url: 'https://romantic-kodiak-24878.upstash.io',
  token: 'AWEuAAIjcDFmNWI2ZTQ3OWRhZjQ0YzI1OTdlZTcwM2I2Y2Q3ZDNhYXAxMA',
})


export async function GET(){
  try{
    await redis.set("key",10);
    const data = await redis.get("key");
    return NextResponse.json({
      data,
      msg : "redis is working just fine",
      
    },{
      status : 200
    })
  }
  catch(e){
    console.log(e);
    return NextResponse.json({
      msg : "some problem in redis client"+e
    },{
      status : 500
    })

  }
}