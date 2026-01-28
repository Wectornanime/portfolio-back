import { prisma } from '@adapter/prisma.adapter';

import { createCertificateDto } from 'src/dto/certificates.dto';
import { successCreated, unprocessableEntity } from 'src/helpers/response.helper';
import { uploadCertificatePdf } from 'src/services/supabase.service';
import generateFileNames from 'src/utils/generateFileNames';

export default class CreateCertificatesController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body, file, user } = request;
    const supabaseUrl = process.env.SUPABASE_URL;

    if (!file) return unprocessableEntity();

    const pdfName = generateFileNames(file);
    const pdf = await uploadCertificatePdf(file, pdfName);

    if (pdf.error) return unprocessableEntity();

    const pdfFileUrl = `${supabaseUrl}/storage/v1/object/public/${pdf.data.fullPath}`;

    const bodyParse = createCertificateDto.safeParse(body);
    if (bodyParse.error) return unprocessableEntity();

    const newCertificate = await prisma.certificate.create({
      data: {
        userId: user!.id,
        title: bodyParse.data.title,
        link: bodyParse.data.link,
        pdfFileUrl
      }
    });

    return successCreated(newCertificate);
  }
}
