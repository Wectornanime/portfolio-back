import { Router } from 'express';
import { expressRouterAdapter } from '@adapter/express.adapter';

import GetAllProjectsController from './controllers/projects/getAll-projects.controller';
import GetAllCertificatesController from './controllers/certificates/getAll-certificates.controller';

export default class AppRouter {
  private router = Router();

  routes() {
    this.router.get('/projects', expressRouterAdapter(new GetAllProjectsController));
    this.router.get('/certificates', expressRouterAdapter(new GetAllCertificatesController));

    return this.router;
  }
}
