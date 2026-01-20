import { prisma } from '@adapter/prisma.adapter';

export default class GetOneSkillsController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const requestId = Number(id);

    const skill = await prisma.skill.findFirst({
      where: { id: requestId }
    });

    return { statusCode: 200, data: skill };
  }
}
