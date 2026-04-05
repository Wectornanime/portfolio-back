import GetOnePublicController from 'src/controllers/public/getOne-public.controller';

export const publicRouter: HttpRouter = {
  '/user/:id': {
    get: {
      controller: new GetOnePublicController
    }
  }
};
