import { email, object, string } from 'zod';

export const createUserDto = object({
  name: string(),
  lastName: string(),
  email: email(),
  password: string().regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Senha deve conter letra maiúscula, minúscula e número'
  )
});
