import { prisma } from '@adapter/prisma.adapter';

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
      return { statusCode: 400, message: 'Id não encontrado. Não foi possível remover o projeto.' };
    }

    await prisma.projectLink.deleteMany({
      where: { projectId: idRequest }
    });

    await prisma.project.delete({
      where: { id: idRequest }
    });

    return { statusCode: 204 };
  }
}
