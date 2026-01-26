import { prisma } from '@adapter/prisma.adapter';
import { successResponse } from 'src/helpers/response.helper';

export default class GetAllSkillsController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { user } = request;

    const skills = await prisma.skill.findMany({
      where: { userId: user!.id }
    });

    return successResponse(skills);
  }
}
