import { prisma } from '@adapter/prisma.adapter';
import { patchImageProjectDto } from 'src/dto/projects.dto';
import { badRequest, successResponse, unprocessableEntity } from 'src/helpers/response.helper';

export default class PatchUpdateImageProjectController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { body, user } = request;

    const requestId = Number(id);

    const project = await prisma.project.findFirst({
      where: { id: requestId, userId: user!.id },
    });
    if (!project) return badRequest('Não foi possível localizar o projeto');

    const { success, data } = patchImageProjectDto.safeParse(body);
    if (!success) return unprocessableEntity();

    const updatedProject = await prisma.project.update({
      where: { id: requestId },
      data: { imageUrl: data.imageUrl }
    });

    return successResponse(updatedProject);
  }
}
