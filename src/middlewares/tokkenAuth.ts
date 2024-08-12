import { verifyJwtToken } from '@services/tokenJwt.service';
import { NextFunction, Request, Response } from 'express';

export function authJwtToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['token']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Você não tem autorização'
        });
    };
    const verifiedToken = verifyJwtToken(token);
    if (!verifiedToken) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Você não tem autorização'
        });
    }
    next();
};
