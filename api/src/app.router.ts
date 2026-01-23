import { authRouter } from './routers/auth.router';
import { certificatesRouter } from './routers/certificates.router';
import { dataRouter } from './routers/data.router';
import { infoRouter } from './routers/info.router';
import { projectsRouter } from './routers/projects.router';
import { skillsRouter } from './routers/skills.router';
import { usersRouter } from './routers/users.router';

type RouterType = {
  [path: string]: HttpRouter
}
export const appRouter: RouterType = {
  '/': dataRouter,
  '/auth': authRouter,
  '/projects': projectsRouter,
  '/certificates': certificatesRouter,
  '/skills': skillsRouter,
  '/info': infoRouter,
  '/users': usersRouter
};
