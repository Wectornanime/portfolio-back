import { prisma } from '@adapter/prisma.adapter';

export default class GetAllProjectsController implements Controller {
  async handle(): Promise<HttpResponse> {

    const projects = await prisma.project.findMany({
      include: { links: true }
    });

    return { statusCode: 200, data: projects };
  }
}
