import { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import { DB_HOST } from '../config/config';
import { DB_PORT } from '../config/config';
import { DB_USER } from '../config/config';
import { DB_PASSWORD } from '../config/config';
import { DB_NAME } from '../config/config';

export async function signIn(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST || DB_HOST,
            port: Number(process.env.MYSQL_PORT) || DB_PORT,
            user: process.env.MYSQL_USER || DB_USER,
            password: process.env.MYSQL_PASSWORD || DB_PASSWORD,
            database: process.env.MYSQL_DATABASE || DB_NAME
        });

        const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
        const [rows, _]: [mysql.RowDataPacket[], mysql.FieldPacket[]] = await connection.execute(query, [username, password]);

        await connection.end();

        if (rows.length > 0) {
            res.cookie('token', "true");
            res.redirect('/');
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (err) {
        console.error('Failed to sign in:', err);
        res.status(500).send('Server error');
    }
}