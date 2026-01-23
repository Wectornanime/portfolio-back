import { prisma } from '@adapter/prisma.adapter';
import { updateSkillDto } from 'src/dto/skills.dto';

export default class UpdateSkillsController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { body, user } = request;

    const requestId = Number(id);

    const skill = await prisma.skill.findFirst({
      where: {
        id: requestId,
        userId: user!.id
      },
    });
    if (!skill) {
      return { statusCode: 400, message: 'Não foi possível encontrar uma habilidade com o id fornecido.' };
    }

    const { data, error } = updateSkillDto.safeParse(body);
    if (error) {
      return { statusCode: 400, message: 'Não foi possível validar os dados da requisição.' };
    }

    await prisma.skill.update({
      where: { id: requestId },
      data: {
        title: data.title,
        iconUrl: data.iconUrl
      }
    });

    const newSkill = await prisma.skill.findFirst({
      where: { id: requestId }
    });

    return { statusCode: 200, data: newSkill };
  }
}
