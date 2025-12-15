import GetAllInfoController from 'src/controllers/info/getAll-info.controller';

export const infoRouter: HttpRouter = {
  '/': {
    get: {
      controller: new GetAllInfoController
    }
  }
};
