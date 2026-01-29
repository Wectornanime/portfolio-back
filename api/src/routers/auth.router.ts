import AuthLoginController from 'src/controllers/auth/auth-login.controller';

export const authRouter: HttpRouter = {
  '/login': {
    post: {
      controller: new AuthLoginController
    }
  }
};
