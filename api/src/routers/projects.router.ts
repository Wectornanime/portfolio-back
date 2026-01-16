import CreateProjectsController from 'src/controllers/projects/create-projects.controller';
import DeleteProjectsController from 'src/controllers/projects/delete-projects.controller';
import GetAllProjectsController from 'src/controllers/projects/getAll-projects.controller';
import GetOneProjectsController from 'src/controllers/projects/getOne-projects.controller';

export const projectsRouter: HttpRouter = {
  '/': {
    get: {
      controller: new GetAllProjectsController
    },
    post: {
      controller: new CreateProjectsController
    }
  },
  '/:id': {
    get: {
      controller: new GetOneProjectsController
    },
    delete: {
      controller: new DeleteProjectsController()
    }
  }
};
