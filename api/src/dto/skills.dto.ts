import { object, string } from 'zod';

export const createSkillDto = object({
  title: string(),
  iconUrl: string()
});

export const updateSkillDto = object({
  title: string(),
  iconUrl: string()
});
