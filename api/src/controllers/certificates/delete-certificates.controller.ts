import { prisma } from '@adapter/prisma.adapter';

export default class DeleteCertificatesController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const idRequest = Number(id);

    const certificate = await prisma.certificate.findFirst({
      where: { id: idRequest }
    });

    if (!certificate) {
      return { statusCode: 400, message: 'Id não encontrado. Não foi possível remover o certificado.' };
    }

    await prisma.certificate.delete({
      where: { id: idRequest }
    });

    return { statusCode: 204 };
  }
}
