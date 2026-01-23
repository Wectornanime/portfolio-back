import { prisma } from '@adapter/prisma.adapter';

export default class GetAllProjectsController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { user } = request;

    const projects = await prisma.project.findMany({
      where: { userId: user!.id },
      include: { links: true }
    });

    return { statusCode: 200, data: projects };
  }
}
