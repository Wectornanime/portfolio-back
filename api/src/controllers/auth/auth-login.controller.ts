import { prisma } from '@adapter/prisma.adapter';
import { authLoginDto } from 'src/dto/auth.dto';
import { generateJwtToken } from 'src/helpers/jwt.helper';
import { verifyPassword } from 'src/helpers/password.helper';
import { badRequest, successResponse } from 'src/helpers/response.helper';

export default class AuthLoginController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body } = request;

    const { success, data } = authLoginDto.safeParse(body);
    if (!success) return badRequest('Não foi possível validar os dados');

    const auth = await prisma.authUser.findUnique({
      where: { email: data.login },
      include: { user: true }
    });
    if (!auth) return badRequest('Não foi possível encorar uma conta com o email fornecido');

    const isValidPassword = await verifyPassword(auth.passwordHash, data.password);
    if (!isValidPassword) return badRequest('As credenciais fornecidas não conferem');

    const token = generateJwtToken({
      email: auth.email,
      userId: auth.user!.id
    });

    return successResponse({
      token,
      user: {
        name: auth.user!.name,
        lastName: auth.user!.lastName,
        imageUrl: auth.user!.imageUrl
      }
    });
  }
}
