import { array, email, number, object, string } from 'zod';

export const createUserDto = object({
  name: string(),
  lastName: string(),
  email: email(),
  password: string().regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Senha deve conter letra maiúscula, minúscula e número'
  )
});

export const updateUserDto = object({
  name: string(),
  lastName: string(),
  subtitle: string(),
  aboutMe: string(),
  links: array(object({
    id: number().positive().nullable().optional(),
    title: string(),
    link: string()
  }))
});
