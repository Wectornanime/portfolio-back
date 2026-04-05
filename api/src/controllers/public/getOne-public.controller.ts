import { prisma } from '@adapter/prisma.adapter';
import { notFound, successResponse } from 'src/helpers/response.helper';

export default class GetOnePublicController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const requestId = Number(id);

    const info = await prisma.user.findFirst({
      where: { id: requestId },
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

    if (!info) return notFound();

    return successResponse(info);
  }
}
