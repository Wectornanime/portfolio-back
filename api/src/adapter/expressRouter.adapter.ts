import { Router } from 'express';
import { expressControllerAdapter } from './expressController.adapter';
import { expressMiddlewareAdapter } from './espressMiddleware.adapter';

type RoutesType = {
  [path: string]: HttpRouter
};

const mountRoute = (httpRouter: HttpRouter): Router => {
  const router = Router();

  Object.entries(httpRouter).forEach(([path, item]) => {
    Object.entries(item).forEach(([method, handles]) => {
      const httpMethod = method as HttpMethod;

      const adaptedMiddlewares = handles.middlewares?.map(expressMiddlewareAdapter) || [];

      const adaptedController = expressControllerAdapter(handles.controller);

      router[httpMethod](path, ...adaptedMiddlewares, adaptedController);
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
