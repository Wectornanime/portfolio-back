import jwt from 'jsonwebtoken';
import { jwtConfig } from 'src/config/jwt.config';

export interface JwtPayload {
  userId: number;
  email: string;
}

export type ValidateJwtTokenReturn = { success: true, data: JwtPayload } | { success: false }

export function generateJwtToken(payload: JwtPayload): string {
  const token = jwt.sign(payload, jwtConfig.secretKey, jwtConfig.options);

  return token;
}

export function validateJwtToken(token: string): ValidateJwtTokenReturn {
  try {
    const result = jwt.verify(token, jwtConfig.secretKey) as JwtPayload;

    return { success: true, data: result };
  } catch {
    return { success: false };
  }
}
