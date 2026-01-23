import CreateUserController from 'src/controllers/user/create-user.controller';
import GetUserController from 'src/controllers/user/get-user.controller';
import AuthMiddleware from 'src/middlewares/auth.middleware';

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
      middlewares: [
        new AuthMiddleware
      ]
    }
  }
};
