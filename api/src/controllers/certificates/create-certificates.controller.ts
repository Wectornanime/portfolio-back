import { prisma } from '@adapter/prisma.adapter';
import { createCertificateDto } from 'src/dto/certificates.dto';
import { badRequest, successCreated } from 'src/helpers/response.helper';

export default class CreateCertificatesController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body, user } = request;

    const { data, error } = createCertificateDto.safeParse(body);
    if (error) {
      return badRequest('Não foi possível validar os dados enviados.');
    }

    const newCertificate = await prisma.certificate.create({
      data: {
        userId: user!.id,
        title: data.title,
        link: data.link,
        imageUrl: data.imageUrl,
      }
    });

    return successCreated(newCertificate);
  }
}
