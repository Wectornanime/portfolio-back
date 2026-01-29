import { prisma } from '@adapter/prisma.adapter';
import { createSkillDto } from 'src/dto/skills.dto';
import { successCreated, unprocessableEntity } from 'src/helpers/response.helper';

export default class CreateSkillsController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body, user } = request;

    const { data, error } = createSkillDto.safeParse(body);
    if (error) {
      return unprocessableEntity();
    }

    const newProject = await prisma.skill.create({
      data: {
        userId: user!.id,
        title: data.title,
        iconUrl: data.iconUrl
      }
    });

    return successCreated(newProject);
  }
}
