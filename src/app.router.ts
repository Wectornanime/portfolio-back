import { expressRouterAdapter } from '@adapter/express.adapter';
import { Router } from 'express';
import GetAllProjects from './controllers/projects/getAll-projects.controller';

export default class AppRouter {
  private router = Router();

  routes() {
    this.router.get('/projects', expressRouterAdapter(new GetAllProjects));

    return this.router;
  }
}
