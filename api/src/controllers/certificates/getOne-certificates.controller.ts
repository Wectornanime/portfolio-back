import { prisma } from '@adapter/prisma.adapter';
import { notFound, successResponse } from 'src/helpers/response.helper';

export default class GetOneCertificatesController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { user } = request;
    const requestId = Number(id);

    const certificate = await prisma.certificate.findFirst({
      where: {
        id: requestId,
        userId: user!.id
      }
    });

    if (!certificate) return notFound();

    return successResponse(certificate);
  }
}
