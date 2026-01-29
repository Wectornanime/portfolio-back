import { prisma } from '@adapter/prisma.adapter';
import { notFound, successResponse } from 'src/helpers/response.helper';

export default class GetOneSkillsController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { user } = request;
    const requestId = Number(id);

    const skill = await prisma.skill.findFirst({
      where: {
        id: requestId,
        userId: user!.id
      }
    });

    if (!skill) return notFound();

    return successResponse(skill);
  }
}
