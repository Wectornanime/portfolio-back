import GetAllProjectsController from 'src/controllers/projects/getAll-projects.controller';

export const projectsRouter: HttpRouter = {
  '/': {
    get: {
      controller: new GetAllProjectsController
    }
  }
};
