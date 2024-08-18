import { findKey } from '@repositories/key.repository';
import { NextFunction, Request, Response } from 'express';

export async function authKey(req: Request, res: Response, next: NextFunction) {
  const key = req.headers['authorization']?.split(' ')[1]; // Expects "Bearer <api_key>"
  if (!key) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Você precisa de uma chave Bearer Token'
    });
  }
  const retorno = await findKey(key);
  if (!retorno) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Sua chave Bearer Token é inválida'
    });
  }
  next();
}
