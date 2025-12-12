import { prisma } from '@adapter/prisma.adapter';

export default class GetAllInfoController implements Controller {
  async handle(): Promise<HttpResponse> {
    const info = await prisma.info.findFirst();
    const skills = await prisma.skill.findFirst();
    const projects = await prisma.project.findFirst();
    const certificates = await prisma.certificate.findFirst();

    const data = {
      ...info,
      skills,
      projects,
      certificates
    };

    return { statusCode: 200, data };
  }
}
