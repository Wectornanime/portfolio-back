import { prisma } from '@adapter/prisma.adapter';
import { badRequest, successResponse, unprocessableEntity } from 'src/helpers/response.helper';
import { uploadCurriculumPdf } from 'src/services/supabase.service';
import generateFileNames from 'src/utils/generateFileNames';

export default class UserUpdateCurriculumController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { file, user } = request;
    const supabaseUrl = process.env.SUPABASE_URL;

    if (!file) return unprocessableEntity();

    const pdfName = generateFileNames(file);
    const pdf = await uploadCurriculumPdf(file, pdfName);

    if (pdf.error) return unprocessableEntity();

    const pdfFileUrl = `${supabaseUrl}/storage/v1/object/public/${pdf.data.fullPath}`;

    const newCurriculum = await prisma.curriculum.create({
      data: {
        userId: user!.id,
        url: pdfFileUrl,
      }
    });
    if (!newCurriculum) {
      return badRequest('Nãp foi possível criar o currículo no banco de dados.');
    }

    return successResponse(newCurriculum);
  }
}
