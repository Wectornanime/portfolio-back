import GetAllCertificatesController from './controllers/certificates/getAll-certificates.controller';
import GetAllInfoController from './controllers/info/getAll-info.controller';
import GetAllProjectsController from './controllers/projects/getAll-projects.controller';
import GetAllSkillsController from './controllers/skills/getAll-skills.controller';

export const router: HttpRouter = {
  '/projects': {
    get: {
      controller: new GetAllProjectsController()
    }
  },
  '/certificates': {
    get: {
      controller: new GetAllCertificatesController()
    }
  },
  '/skills': {
    get: {
      controller: new GetAllSkillsController()
    }
  },
  '/info': {
    get: {
      controller: new GetAllInfoController()
    }
  }
};
