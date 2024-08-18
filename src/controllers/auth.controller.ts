import { generateJwtToken } from '@services/tokenJwt.service';
import { Request, Response } from 'express';

export function login(req: Request, resp: Response) {
  const { password } = req.body;
  if (password === '12345678') {
    const token = generateJwtToken('wec123');

    resp.status(200).send({
      message: 'Login successful',
      token: token
    });
  }

  return resp.status(200).json({ error: 'senha errada' });
}
