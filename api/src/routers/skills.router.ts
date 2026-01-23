import CreateSkillsController from 'src/controllers/skills/create-skills.controller';
import DeleteSkillsController from 'src/controllers/skills/delete-skills.controller';
import GetAllSkillsController from 'src/controllers/skills/getAll-skills.controller';
import GetOneSkillsController from 'src/controllers/skills/getOne-skills.controller';
import UpdateSkillsController from 'src/controllers/skills/update-skills.controller';
import AuthMiddleware from 'src/middlewares/auth.middleware';

export const skillsRouter: HttpRouter = {
  '/': {
    get: {
      controller: new GetAllSkillsController,
      middlewares: [
        new AuthMiddleware
      ]
    },
    post: {
      controller: new CreateSkillsController
    }
  },
  '/:id': {
    get: {
      controller: new GetOneSkillsController,
    },
    put: {
      controller: new UpdateSkillsController
    },
    delete: {
      controller: new DeleteSkillsController
    }
  }
};
