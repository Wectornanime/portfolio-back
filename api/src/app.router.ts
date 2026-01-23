import { authRouter } from './routers/auth.router';
import { certificatesRouter } from './routers/certificates.router';
import { projectsRouter } from './routers/projects.router';
import { skillsRouter } from './routers/skills.router';
import { usersLoggedRouter, usersPublicRouter } from './routers/users.router';

type RouterType = {
  [path: string]: HttpRouter
}
export const appRouter: RouterType = {
  '/auth': authRouter,
  '/certificates': certificatesRouter,
  '/me': usersLoggedRouter,
  '/projects': projectsRouter,
  '/skills': skillsRouter,
  '/users': usersPublicRouter
};
