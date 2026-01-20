import CreateSkillsController from 'src/controllers/skills/create-skills.controller';
import GetAllSkillsController from 'src/controllers/skills/getAll-skills.controller';
import GetOneSkillsController from 'src/controllers/skills/getOne-skills.controller';

export const skillsRouter: HttpRouter = {
  '/': {
    get: {
      controller: new GetAllSkillsController
    },
    post: {
      controller: new CreateSkillsController
    }
  },
  '/:id': {
    get: {
      controller: new GetOneSkillsController,
    }
  }
};
