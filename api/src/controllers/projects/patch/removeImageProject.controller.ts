import { prisma } from '@adapter/prisma.adapter';
import { badRequest, successResponse } from 'src/helpers/response.helper';

export default class PatchRemoveImageProjectController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { user } = request;

    const requestId = Number(id);

    const project = await prisma.project.findFirst({
      where: { id: requestId, userId: user!.id },
    });
    if (!project) return badRequest('Não foi possível localizar o projeto');

    const updatedProject = await prisma.project.update({
      where: { id: requestId },
      data: { imageUrl: null }
    });

    return successResponse(updatedProject);
  }
}
