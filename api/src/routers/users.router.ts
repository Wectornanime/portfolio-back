import CreateUserController from 'src/controllers/user/create-user.controller';
import GetUserController from 'src/controllers/user/get-user.controller';
import PatchUserImageController from 'src/controllers/user/patch-userImage.controller';
import UpdateUserController from 'src/controllers/user/update-user.controller';
import AuthMiddleware from 'src/middlewares/auth.middleware';
import FileMiddleware from 'src/middlewares/file.middleware';

export const usersPublicRouter: HttpRouter = {
  '/': {
    post: {
      controller: new CreateUserController
    }
  }
};

export const usersLoggedRouter: HttpRouter = {
  '/': {
    get: {
      controller: new GetUserController,
      middlewares: [new AuthMiddleware]
    },
    put: {
      controller: new UpdateUserController,
      middlewares: [new AuthMiddleware]
    }
  },
  '/patch/imageUrl': {
    patch: {
      controller: new PatchUserImageController,
      middlewares: [
        new AuthMiddleware,
        new FileMiddleware
      ]
    }
  }
};
