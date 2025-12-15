import { Router } from 'express';
import { expressControllerAdapter } from './expressController.adapter';

type RoutesType = {
  [path: string]: HttpRouter
};

const mountRoute = (httpRouter: HttpRouter): Router => {
  const router = Router();

  Object.entries(httpRouter).forEach(([path, item]) => {
    Object.entries(item).forEach(([method, handles]) => {
      const httpMethod = method as HttpMethod;

      router[httpMethod](path, expressControllerAdapter(handles.controller));
    });
  });

  return router;
};

export const expressRouterAdapter = (routes: RoutesType) => {
  const router = Router();

  Object.entries(routes).map(([path, route]) => {
    const routerMounted = mountRoute(route);

    router.use(path, routerMounted);
  });

  return router;
};
