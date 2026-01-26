import { prisma } from '@adapter/prisma.adapter';
import { badRequest, successNoContent } from 'src/helpers/response.helper';

export default class DeleteCertificatesController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { user } = request;
    const idRequest = Number(id);

    const certificate = await prisma.certificate.findFirst({
      where: {
        id: idRequest,
        userId: user!.id
      }
    });

    if (!certificate) {
      return badRequest('Id não encontrado. Não foi possível remover o certificado.');
    }

    await prisma.certificate.delete({
      where: {
        id: idRequest,
        userId: user!.id
      }
    });

    return successNoContent();
  }
}
