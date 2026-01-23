import { Request, Response } from 'express';

export const expressControllerAdapter = (controller: Controller) => {
  return async (req: Request, resp: Response) => {
    try {
      const httpRequest = {
        params: req.params,
        body: req.body,
        headers: req.headers,
        user: req.user
      };

      const { statusCode, ...result } = await controller.handle(httpRequest);

      return resp.status(statusCode).send(result);
    } catch (error) {
      return resp.status(500).send(error);
    }
  };
};
