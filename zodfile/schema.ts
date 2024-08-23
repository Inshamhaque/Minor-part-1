//user schemas 
// register inputs and login inputs

import { z } from 'zod';
// for backend
export const registerSchema = z.object({
    mail : z.string().email().endsWith('zhcet.ac.in' || 'myamu.ac.in'),
    password : z.string().min(8),
})
// for frontend
export type registerinputs = z.infer<typeof registerSchema>;

//login inputs
//though this is optional 
export const loginSchema = z.object({
    mail : z.string().endsWith('zhcet.ac.in'||'myamu.ac.in'),
    password : z.string().min(8),
})
export type logininputs = z.infer<typeof loginSchema>;
