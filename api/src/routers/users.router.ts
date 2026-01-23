import CreateUserController from 'src/controllers/user/create-user.controller';
import AuthMiddleware from 'src/middlewares/auth.middleware';

export const usersRouter: HttpRouter = {
  '/': {
    post: {
      controller: new CreateUserController,
      middlewares: [
        new AuthMiddleware
      ]
    }
  }
};
