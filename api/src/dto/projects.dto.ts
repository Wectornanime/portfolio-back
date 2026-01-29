import { array, number, object, preprocess, string } from 'zod';

export const createProjectDto = object({
  title: string(),
  text: string(),
  imageUrl: string().nullable().optional(),
  links: preprocess((value) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    } else {
      return value;
    }
  }, array(
    object({
      title: string(),
      link: string()
    })
  ))
});

export const updateProjectDto = object({
  title: string(),
  text: string(),
  links: array(
    object({
      id: number().positive().nullable().optional(),
      title: string(),
      link: string()
    })
  )
});

export const patchImageProjectDto = object({
  imageUrl: string(),
});
