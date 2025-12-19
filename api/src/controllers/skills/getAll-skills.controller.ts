import { prisma } from '@adapter/prisma.adapter';

export default class GetAllSkillsController implements Controller {
  async handle(): Promise<HttpResponse> {
    const skills = await prisma.skill.findMany();

    return { statusCode: 200, data: skills };
  }
}
