import { prisma } from '@adapter/prisma.adapter';
import { createProjectDto } from 'src/dto/projects.dto';
import { successCreated, unprocessableEntity } from 'src/helpers/response.helper';

export default class CreateProjectsController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body, user } = request;

    const { data, error } = createProjectDto.safeParse(body);
    if (error) {
      return unprocessableEntity();
    }

    const newProject = await prisma.project.create({
      data: {
        userId: user!.id,
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

    return successCreated(newProject);
  }
}
