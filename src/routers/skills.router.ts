import GetAllSkillsController from 'src/controllers/skills/getAll-skills.controller';

export const skillsRouter: HttpRouter = {
  '/': {
    get: {
      controller: new GetAllSkillsController
    }
  }
};
