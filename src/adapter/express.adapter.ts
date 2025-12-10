import { Request, Response } from 'express';

export const expressRouterAdapter = (controller: Controller) => {
  return async (req: Request, resp: Response) => {
    const { statusCode, ...result } = await controller.handle();

    return resp.status(statusCode).send(result);
  };
};
