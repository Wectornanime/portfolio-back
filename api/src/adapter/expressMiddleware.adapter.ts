import { NextFunction, Request, Response } from 'express';

export const expressMiddlewareAdapter = (middleware: Middleware) => {
  return async (req: Request, resp: Response, next: NextFunction) => {
    try {
      const httpRequest = {
        params: req.params,
        body: req.body,
        headers: req.headers,
        user: req.user
      };

      const { success, ...result } = await middleware.handle(httpRequest);

      if (!success && result.response) {
        return resp.status(result.response.statusCode).send(result.response);
      }

      if (success && result.request) {
        req.params = result.request.params;
        req.body = result.request.body;
        req.headers = result.request.headers;
        req.user = result.request.user;
      }

      next();

    } catch (err) {
      return resp.status(500).send(err);
    }
  };
};
