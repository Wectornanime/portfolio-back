import GetOnePublicController from 'src/controllers/public/getOne-public.controller';

export const publicRouter: HttpRouter = {
  '/:id': {
    get: {
      controller: new GetOnePublicController
    }
  }
};
