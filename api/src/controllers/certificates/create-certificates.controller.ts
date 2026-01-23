import { prisma } from '@adapter/prisma.adapter';
import { createCertificateDto } from 'src/dto/certificates.dto';

export default class CreateCertificatesController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body, user } = request;

    const { data, error } = createCertificateDto.safeParse(body);
    if (error) {
      return { statusCode: 400, message: 'Não foi possível validar os dados enviados.' };
    }

    const newCertificate = await prisma.certificate.create({
      data: {
        userId: user!.id,
        title: data.title,
        link: data.link,
        imageUrl: data.imageUrl,
      }
    });

    return { statusCode: 201, data: newCertificate };
  }
}
