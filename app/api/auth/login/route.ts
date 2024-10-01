import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT || '5432'), 
});

interface User {
    id: number;
    email: string;
    password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        try {
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [username]);

            if (result.rows.length === 0) {
                return res.status(401).json({ message: 'Invalid username or password.' });
            }

            const user: User = result.rows[0]; 

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid username or password.' });
            }

            const token = jwt.sign(
                { id: user.id, username: user.email },  
                process.env.JWT_SECRET as string,        
                { expiresIn: '1h' }                      
            );

            return res.status(200).json({ token, message: 'Login successful!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Something went wrong, try again later.' });
        }
    } else {
        
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}

