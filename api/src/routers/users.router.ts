import CreateUserController from 'src/controllers/user/create-user.controller';

export const usersRouter: HttpRouter = {
  '/': {
    post: {
      controller: new CreateUserController
    }
  }
};
