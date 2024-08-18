import { createNewUser } from '@repositories/userRepository';
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

export async function signup(req: Request, resp: Response) {
  const { name, email, password } = req.body;
  const newUser = await createNewUser({ name, email, password });

  if (newUser) {
    resp.status(201).json({ message: 'Usuario criado com sucesso!' });
  }

  resp.status(400).json({ message: 'Usuario não criado.' });
}
