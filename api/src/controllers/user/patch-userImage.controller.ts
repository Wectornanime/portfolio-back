import { prisma } from '@adapter/prisma.adapter';
import { patchImageUserDto } from 'src/dto/user.dto';
import { successResponse, unprocessableEntity } from 'src/helpers/response.helper';

export default class PatchUserImageController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body, user } = request;

    const { success, data } = patchImageUserDto.safeParse(body);
    if (!success) return unprocessableEntity();

    const updatedUser = await prisma.user.update({
      where: {id: user!.id},
      data: { imageUrl: data.imageUrl }
    });

    return successResponse(updatedUser);
  }
}
