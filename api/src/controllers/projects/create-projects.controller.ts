import { prisma } from '@adapter/prisma.adapter';
import { createProjectDto } from 'src/dto/projects.dto';

export default class CreateProjectsController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body } = request;

    const { data, error } = createProjectDto.safeParse(body);
    if (error) {
      console.log(error);
      return { statusCode: 400, message: 'Não foi possível validar os dados enviados.' };
    }

    const newProject = await prisma.project.create({
      data: {
        title: data.title,
        text: data.text,
        imageUrl: data.imageUrl,
        links: {
          createMany: {
            data: data.links
          }
        }
      },
      include: { links: true }
    });

    return { statusCode: 200, data: newProject };
  }
}
