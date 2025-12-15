import GetAllDataController from 'src/controllers/data/getAll-data.controller';

export const dataRouter: HttpRouter = {
  '/': {
    get: {
      controller: new GetAllDataController
    }
  }
};
