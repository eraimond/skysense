import express, { Request, Response } from 'express';
import path from 'path';

const router = express.Router();
const publicPath = path.join(__dirname, '..', 'public');

router.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(publicPath, 'sign-in.html'));
});

export default router;