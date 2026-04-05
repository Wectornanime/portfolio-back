import { prisma } from '@adapter/prisma.adapter';
import { badRequest, successResponse } from 'src/helpers/response.helper';

export default class GetOnePublicController implements Controller {
  async handle(): Promise<HttpResponse> {

    const info = await prisma.user.findFirst({
      where: { id: 2 },
      omit: { authUserId: true },
      include: {
        links: true,
        skills: true,
        certificates: true,
        Projects: {
          include: { links: true }
        }
      }
    });

    if (!info) {
      return badRequest('deu ruim');
    }

    return successResponse(info);
  }
}
