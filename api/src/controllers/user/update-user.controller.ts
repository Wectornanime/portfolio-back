import { prisma } from '@adapter/prisma.adapter';
import { updateUserDto } from 'src/dto/user.dto';
import { successResponse } from 'src/helpers/response.helper';

export default class UpdateUserController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body, user } = request;

    const { data, error } = updateUserDto.safeParse(body);
    if (error) {
      return { statusCode: 400, message: 'Não foi possível validar os dados da requisição.' };
    }

    await prisma.user.update({
      where: { id: user!.id },
      data: {
        name: data.name,
        lastName: data.lastName,
        subtitle: data.subtitle,
        aboutMe: data.aboutMe,
      }
    });

    const updateLinksIds = data.links
      .filter(link => link.id)
      .map(link => link.id!);

    await prisma.userLink.deleteMany({
      where: {
        userId: user!.id,
        ...(updateLinksIds.length > 0 && {
          id: { notIn: updateLinksIds }
        })
      }
    });

    for (const link of data.links) {
      if (link.id) {
        await prisma.userLink.update({
          where: {
            id: link.id,
            userId: user!.id
          },
          data: {
            title: link.title,
            link: link.link
          }
        });
      } else {
        await prisma.userLink.create({
          data: {
            userId: user!.id,
            title: link.title,
            link: link.link
          }
        });
      }
    };

    const updatedUser = await prisma.user.findFirst({
      where: { id: user!.id },
      include: { links: true }
    });

    return successResponse(updatedUser);
  }
}
