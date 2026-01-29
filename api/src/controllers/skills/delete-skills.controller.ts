import { prisma } from '@adapter/prisma.adapter';
import { badRequest, successNoContent } from 'src/helpers/response.helper';

export default class DeleteSkillsController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { user } = request;
    const idRequest = Number(id);

    const skill = await prisma.skill.findFirst({
      where: {
        id: idRequest,
        userId: user!.id
      }
    });

    if (!skill) {
      return badRequest('Id não encontrado. Não foi possível remover a habilidade.');
    }

    await prisma.skill.delete({
      where: {
        id: idRequest,
        userId: user!.id
      }
    });

    return successNoContent();
  }
}
