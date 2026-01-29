import { prisma } from '@adapter/prisma.adapter';
import { validateJwtToken } from 'src/helpers/jwt.helper';
import { unauthorized } from 'src/helpers/response.helper';

export default class AuthMiddleware implements Middleware {
  async handle(request: HttpRequest): Promise<MiddlewareReturn> {
    const { authorization } = request.headers;

    if (!authorization) {
      return { success: false, response: unauthorized() };
    };

    const [, token] = authorization.split(' ');
    const validToken = validateJwtToken(token);

    if (!validToken.success) {
      return { success: false, response: unauthorized() };
    };

    const user = await prisma.user.findUnique({
      where: { id: validToken.data.userId }
    });

    if (!user) {
      return { success: false, response: unauthorized() };
    };

    const newRequest = { ...request, user };

    return { success: true, request: newRequest };
  }
}
