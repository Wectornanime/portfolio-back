import { prisma } from '@adapter/prisma.adapter';

export default class GetAllInfoController implements Controller {
  async handle(): Promise<HttpResponse> {
    const info = await prisma.info.findFirst();

    return { statusCode: 200, data: info };
  }
}
