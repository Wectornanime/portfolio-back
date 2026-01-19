import { prisma } from '@adapter/prisma.adapter';

export default class GetOneCertificatesController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const requestId = Number(id);

    const certificate = await prisma.certificate.findFirst({
      where: { id: requestId }
    });

    return { statusCode: 200, data: certificate };
  }
}
