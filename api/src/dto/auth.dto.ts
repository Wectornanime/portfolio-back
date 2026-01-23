import { email, object, string } from 'zod';

export const authLoginDto = object({
  login: email(),
  password: string(),
});
