import { prisma } from '@adapter/prisma.adapter';
import { updateProjectDto } from 'src/dto/projects.dto';
import { badRequest, successResponse, unprocessableEntity } from 'src/helpers/response.helper';

export default class UpdateProjectsController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { body, user } = request;

    const requestId = Number(id);

    const project = await prisma.project.findFirst({
      where: {
        id: requestId,
        userId: user!.id
      },
    });
    if (!project) {
      return badRequest('Não foi possível encontrar um projeto com o id fornecido.');
    }

    const { data, error } = updateProjectDto.safeParse(body);
    if (error) {
      return  unprocessableEntity();
    }

    await prisma.project.update({
      where: { id: requestId },
      data: {
        title: data.title,
        text: data.text,
        imageUrl: data.imageUrl
      }
    });

    const updateLinksIds = data.links
      .filter(link => link.id)
      .map(link => link.id!);

    await prisma.projectLink.deleteMany({
      where: {
        projectId: requestId,
        ...(updateLinksIds.length > 0 && {
          id: { notIn: updateLinksIds }
        })
      }
    });

    for (const link of data.links) {
      if (link.id) {
        await prisma.projectLink.update({
          where: { id: link.id },
          data: {
            title: link.title,
            link: link.link
          }
        });
      } else {
        await prisma.projectLink.create({
          data: {
            projectId: requestId,
            title: link.title,
            link: link.link
          }
        });
      }
    };

    const newProject = await prisma.project.findFirst({
      where: { id: requestId },
      include: { links: true }
    });

    return successResponse(newProject);
  }
}
