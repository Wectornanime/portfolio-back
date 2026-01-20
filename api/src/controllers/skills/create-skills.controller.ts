import { prisma } from '@adapter/prisma.adapter';
import { createSkillDto } from 'src/dto/skills.dto';

export default class CreateSkillsController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body } = request;

    const { data, error } = createSkillDto.safeParse(body);
    if (error) {
      return { statusCode: 400, message: 'Não foi possível validar os dados enviados.' };
    }

    const newProject = await prisma.skill.create({
      data: {
        title: data.title,
        iconUrl: data.iconUrl
      }
    });

    return { statusCode: 200, data: newProject };
  }
}
