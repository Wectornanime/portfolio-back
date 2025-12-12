import { Router } from 'express';
import { expressRouterAdapter } from '@adapter/express.adapter';

import GetAllProjectsController from './controllers/projects/getAll-projects.controller';
import GetAllCertificatesController from './controllers/certificates/getAll-certificates.controller';
import GetAllSkillsController from './controllers/skills/getAll-skills.controller';
import GetAllInfoController from './controllers/info/getAll-info.controller';

export default class AppRouter {
  private router = Router();

  routes() {
    this.router.get('/projects', expressRouterAdapter(new GetAllProjectsController));
    this.router.get('/certificates', expressRouterAdapter(new GetAllCertificatesController));
    this.router.get('/skills', expressRouterAdapter(new GetAllSkillsController));
    this.router.get('/info', expressRouterAdapter(new GetAllInfoController));

    return this.router;
  }
}
