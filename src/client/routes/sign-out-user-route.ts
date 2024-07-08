import { Request, Response } from 'express';

export function signOut(req: Request, res: Response): void {
    res.clearCookie('token');
    res.redirect('/');
}