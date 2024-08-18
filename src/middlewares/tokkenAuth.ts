import { verifyJwtToken } from '@services/tokenJwt.service';
import { NextFunction, Request, Response } from 'express';

export function authJwtToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['token'];
  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Você precisa de um login'
    });
  }
  const verifiedToken = verifyJwtToken(token);
  if (!verifiedToken) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Você precisa de um token jwt valido'
    });
  }
  next();
}
