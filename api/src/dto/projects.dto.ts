import { array, number, object, string } from 'zod';

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

export const updateProjectDto = object({
  title: string(),
  text: string(),
  imageUrl: string().nullable(),
  links: array(
    object({
      id: number().positive().nullable().optional(),
      title: string(),
      link: string()
    })
  )
});
