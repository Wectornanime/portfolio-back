import { prisma } from '@adapter/prisma.adapter';
import { updateCertificateDto } from 'src/dto/certificates.dto';
import { badRequest, successResponse, unprocessableEntity } from 'src/helpers/response.helper';

export default class UpdateCertificatesController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { body, user } = request;

    const requestId = Number(id);

    const certificate = await prisma.certificate.findFirst({
      where: {
        id: requestId,
        userId: user!.id
      },
    });
    if (!certificate) {
      return badRequest('Não foi possível encontrar um certificado com o id fornecido.');
    }

    const { data, error } = updateCertificateDto.safeParse(body);
    if (error) {
      return unprocessableEntity();
    }

    await prisma.certificate.update({
      where: { id: requestId },
      data: {
        title: data.title,
        link: data.link,
        imageUrl: data.imageUrl
      }
    });

    const newCertificate = await prisma.certificate.findFirst({
      where: { id: requestId }
    });

    return successResponse(newCertificate);
  }
}
