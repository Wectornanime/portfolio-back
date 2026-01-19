import { object, string } from 'zod';

export const createCertificateDto = object({
  title: string(),
  link: string().nullable(),
  imageUrl: string().nullable(),
});
