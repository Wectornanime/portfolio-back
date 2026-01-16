import GetAllProjectsController from 'src/controllers/projects/getAll-projects.controller';
import GetOneProjectsController from 'src/controllers/projects/getOne-projects.controller';

export const projectsRouter: HttpRouter = {
  '/': {
    get: {
      controller: new GetAllProjectsController
    }
  },
  '/:id': {
    get: {
      controller: new GetOneProjectsController
    }
  }
};
