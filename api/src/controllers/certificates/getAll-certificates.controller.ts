import { prisma } from '@adapter/prisma.adapter';
import { successResponse } from 'src/helpers/response.helper';

export default class GetAllCertificatesController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { user } = request;

    const certificates = await prisma.certificate.findMany({
      where: { userId: user!.id }
    });

    return successResponse(certificates);
  }
}
