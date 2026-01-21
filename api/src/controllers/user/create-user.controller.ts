import { prisma } from '@adapter/prisma.adapter';
import { createUserDto } from 'src/dto/user.dto';
import { generateJwtToken } from 'src/helpers/jwt.helper';
import { hashPassword } from 'src/helpers/password.helper';
import { badRequest, successCreated } from 'src/helpers/response.helper';

export default class CreateUserController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body } = request;

    const { data, error } = createUserDto.safeParse(body);
    if (error) {
      return badRequest('Não foi possível validar o corpo da requisição.');
    };

    const emailInRepository = await prisma.authUser.findFirst({
      where: { email: data.email }
    });
    if (emailInRepository) {
      return badRequest(`O email ${data.email} já está sendo utilizado.`);
    };

    const passwordHash = await hashPassword(data.password);

    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        lastName: data.lastName,
        aboutMe: '',
        subtitle: '',
        authUser: {
          create: {
            email: data.email,
            passwordHash
          }
        }
      }
    });

    const jwtToken = generateJwtToken({ userId: newUser.id, email: data.email });

    return successCreated({ token: jwtToken });
  }
}
