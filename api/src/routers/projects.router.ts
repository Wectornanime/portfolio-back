import CreateProjectsController from 'src/controllers/projects/create-projects.controller';
import DeleteProjectsController from 'src/controllers/projects/delete-projects.controller';
import GetAllProjectsController from 'src/controllers/projects/getAll-projects.controller';
import GetOneProjectsController from 'src/controllers/projects/getOne-projects.controller';
import PatchRemoveImageProjectController from 'src/controllers/projects/patch/removeImageProject.controller';
import PatchUpdateImageProjectController from 'src/controllers/projects/patch/updateImageProject.controller';
import UpdateProjectsController from 'src/controllers/projects/update-projects.controller';
import AuthMiddleware from 'src/middlewares/auth.middleware';
import FileMiddleware from 'src/middlewares/file.middleware';

export const projectsRouter: HttpRouter = {
  '/': {
    get: {
      controller: new GetAllProjectsController,
      middlewares: [
        new AuthMiddleware
      ]
    },
    post: {
      controller: new CreateProjectsController,
      middlewares: [
        new AuthMiddleware
      ]
    }
  },
  '/:id': {
    get: {
      controller: new GetOneProjectsController,
      middlewares: [
        new AuthMiddleware
      ]
    },
    put: {
      controller: new UpdateProjectsController,
      middlewares: [
        new AuthMiddleware
      ]
    },
    delete: {
      controller: new DeleteProjectsController,
      middlewares: [
        new AuthMiddleware
      ]
    }
  },
  '/:id/patch/removeImageUrl': {
    patch: {
      controller: new PatchRemoveImageProjectController,
      middlewares: [new AuthMiddleware]
    }
  },
  '/:id/patch/imageUrl': {
    patch: {
      controller: new PatchUpdateImageProjectController,
      middlewares: [new AuthMiddleware, new FileMiddleware]
    }
  }
};
