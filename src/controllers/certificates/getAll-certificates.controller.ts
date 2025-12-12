import { prisma } from '@adapter/prisma.adapter';

export default class GetAllCertificatesController implements Controller {
  async handle(): Promise<HttpResponse> {
    const certificates = await prisma.certificate.findMany();

    return { statusCode: 200, data: certificates };
  }
}
