import { Request, Response } from 'express';

export const expressControllerAdapter = (controller: Controller) => {
  return async (req: Request, resp: Response) => {
    const { statusCode, ...result } = await controller.handle();

    return resp.status(statusCode).send(result);
  };
};
