import { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import { DB_HOST } from '../config/config';
import { DB_PORT } from '../config/config';
import { DB_USER } from '../config/config';
import { DB_PASSWORD } from '../config/config';
import { DB_NAME } from '../config/config';

export async function addUser(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST || DB_HOST,
            port: Number(process.env.MYSQL_PORT) || DB_PORT,
            user: process.env.MYSQL_USER || DB_USER,
            password: process.env.MYSQL_PASSWORD || DB_PASSWORD,
            database: process.env.MYSQL_DATABASE || DB_NAME
        });

        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        await connection.execute(query, [username, password]);

        await connection.end();

        res.redirect('/');

    } catch (error) {
        if (typeof error === 'object' && error !== null) {
            if ((error as { code?: string }).code === 'ER_DUP_ENTRY') {
                console.error('Email already in use:', error);
                res.status(409).send('Email already in use');
            }
        }

        console.error('Failed to add user:', error);
        res.status(500).send('Failed to add user');
    }
}