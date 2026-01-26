import { supabaseConfig } from 'src/config/supabase.config';
import { unprocessableEntity } from 'src/helpers/response.helper';

export default class FileMiddleware implements Middleware {
  async handle(request: HttpRequest): Promise<MiddlewareReturn> {
    const { file } = request;

    if (!file) return { success: true };

    const ext = file.originalname.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${ext}`;

    const { error } = await supabaseConfig.storage
      .from('images')
      .upload(fileName, file.buffer, { contentType: file.mimetype });

    if (error) return { success: false, response: unprocessableEntity() };

    const newRequest: HttpRequest = {
      ...request,
      body: {
        imageUrl: `https://hactnjylnphwtopczblt.supabase.co/storage/v1/object/public/images/${fileName}`
      }
    };

    return { success: true, request: newRequest };
  }
}
