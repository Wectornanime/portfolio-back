import jwt, { JwtPayload } from 'jsonwebtoken';

export function generateJwtToken(userId: string): string {
    const secretKey = process.env.SECRET_KEY || 'default-secret-key';
    const token = jwt.sign({id:userId}, secretKey, {expiresIn: '1h'});
    return token;
}

export function verifyJwtToken(token: string): string | JwtPayload | null {
    const secretKey = process.env.SECRET_KEY || 'default-secret-key';
    try {
        const retult = jwt.verify(token, secretKey);
        return retult;
    } catch {
        return null;
    }
}
