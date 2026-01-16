import { array, object, string } from 'zod';

export const createProjectDto = object({
  title: string(),
  text: string(),
  imageUrl: string().nullable(),
  links: array(
    object({
      title: string(),
      link: string()
    })
  )
});
