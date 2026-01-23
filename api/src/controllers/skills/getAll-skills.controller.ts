import { prisma } from '@adapter/prisma.adapter';

export default class GetAllSkillsController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { user } = request;

    const skills = await prisma.skill.findMany({
      where: { userId: user!.id }
    });

    return { statusCode: 200, data: skills };
  }
}
