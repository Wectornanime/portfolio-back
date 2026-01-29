import { prisma } from '@adapter/prisma.adapter';
import { notFound, successResponse } from 'src/helpers/response.helper';

export default class GetOneProjectsController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { user } = request;
    const requestId = Number(id);

    const project = await prisma.project.findFirst({
      where: {
        id: requestId,
        userId: user!.id
      },
      include: { links: true }
    });

    if (!project) return notFound();

    return successResponse(project);
  }
}
