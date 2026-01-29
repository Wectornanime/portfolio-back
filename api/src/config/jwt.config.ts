import { SignOptions } from 'jsonwebtoken';

export type JwtConfig = {
  secretKey: string,
  options: SignOptions
}

export const jwtConfig: JwtConfig = {
  secretKey: process.env.JWT_SECRET || 'your_secret_key',
  options: {
    expiresIn: '8h'
  }
};
