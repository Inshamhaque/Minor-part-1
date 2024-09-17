//user schemas 
// register inputs and login inputs

import { number, z } from 'zod';
// for backend
export const registerSchema = z.object({
    mail : z.string().email().refine((value)=>{
        const domain = value.split('@')[1];
        return(domain==='myamu.ac.in'||domain==='zhcet.ac.in' || domain === 'gmail.com')
    },{
        message : "domain must be either 'myamu.ac.in' or 'zhcet.ac.in'"
    }),
    password : z.string().min(8),
    phone: z.string().min(10),
    firstName : z.string(),
    lastName : z.string(),
    facultyId : z.string()
})
// for frontend
export type registerinputs = z.infer<typeof registerSchema>;


