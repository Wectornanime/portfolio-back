import { prisma } from '@adapter/prisma.adapter';

export default class GetAllInfoController implements Controller {
  async handle(): Promise<HttpResponse> {
    const info = await prisma.info.findFirst({
      include: { links: true }
    });
    const skills = await prisma.skill.findMany();
    const projects = await prisma.project.findMany({
      include: { links: true }
    });
    const certificates = await prisma.certificate.findMany();

    const data = {
      ...info,
      skills,
      projects,
      certificates
    };

    return { statusCode: 200, data };
  }
}
