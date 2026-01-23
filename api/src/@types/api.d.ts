interface Controller {
  handle(request: HttpRequest): Promise<HttpResponse>
}

interface Middleware {
  handle(request: HttpRequest): Promise<MiddlewareReturn>
}

type MiddlewareReturn = { success: boolean, request?: HttpRequest, response?: HttpResponse }

type HttpResponse = {
  statusCode: 200 | 201 | 204 | 400 | 401 | 404 | 500
  data?: unknown
  message?: string
}

type HttpRequest = {
  params: { id?: string },
  body?: unknown,
  headers?: IncomingHttpHeaders,
  user?: unknown,
}

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

type HttpRouter = {
  [path: string]: {
    [method in HttpMethod]?: {
      controller: Controller;
      middlewares?: Middleware[];
    };
  };
};
