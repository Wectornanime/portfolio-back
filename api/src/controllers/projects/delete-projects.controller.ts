import { prisma } from '@adapter/prisma.adapter';
import { badRequest, successNoContent } from 'src/helpers/response.helper';

export default class DeleteProjectsController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { user } = request;
    const idRequest = Number(id);

    const project = await prisma.project.findFirst({
      where: {
        id: idRequest,
        userId: user!.id
      }
    });

    if (!project) {
      return badRequest('Id não encontrado. Não foi possível remover o projeto.');
    }

    await prisma.projectLink.deleteMany({
      where: { projectId: idRequest }
    });

    await prisma.project.delete({
      where: { id: idRequest }
    });

    return successNoContent();
  }
}
