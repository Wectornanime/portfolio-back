import { certificatesRouter } from './routers/certificates.router';
import { dataRouter } from './routers/data.router';
import { infoRouter } from './routers/info.router';
import { projectsRouter } from './routers/projects.router';
import { skillsRouter } from './routers/skills.router';

type RouterType = {
  [path: string]: HttpRouter
}
export const appRouter: RouterType = {
  '/': dataRouter,
  '/projects': projectsRouter,
  '/certificates': certificatesRouter,
  '/skills': skillsRouter,
  '/info': infoRouter,
};
