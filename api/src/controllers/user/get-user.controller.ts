import { prisma } from '@adapter/prisma.adapter';
import { successResponse } from 'src/helpers/response.helper';

export default class GetUserController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { user } = request;

    const userData = await prisma.user.findUnique({
      where: { id: user!.id },
      include: { links: true }
    });

    return successResponse(userData);
  }
}
