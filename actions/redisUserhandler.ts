'use client'
//connecting to redis client
import { Redis } from '@upstash/redis';

// TODO:  try to use this in the process.env ... not working fine 
const redis = new Redis({
  url: 'https://romantic-kodiak-24878.upstash.io',
  token: 'AWEuAAIjcDFmNWI2ZTQ3OWRhZjQ0YzI1OTdlZTcwM2I2Y2Q3ZDNhYXAxMA',
})
export async function fetchUserDetails({ facultyid } : {facultyid : String}){
    const data = await redis.get(String(facultyid));
    return data;

}