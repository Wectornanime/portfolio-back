export function successResponse(data?: unknown): HttpResponse {
  return {
    statusCode: 200,
    data
  };
};

export function successCreated(data?: unknown): HttpResponse {
  return {
    statusCode: 201,
    data
  };
};

export function successNoContent(): HttpResponse {
  return {
    statusCode: 204
  };
};

export function badRequest(message: string): HttpResponse {
  return {
    statusCode: 400,
    message
  };
};

export function unauthorized(): HttpResponse {
  return {
    statusCode: 401,
    message: 'Não foi possível validar o token jwt'
  };
};

export function notFound(): HttpResponse {
  return {
    statusCode: 404,
    message: 'Não foi possível localizar esse recurso'
  };
};

export function methodNotAllowed(): HttpResponse {
  return {
    statusCode: 405,
    message: 'O método utilizado não é permitido nessa rota'
  };
};

export function unprocessableEntity(): HttpResponse {
  return {
    statusCode: 422,
    message: 'Não foi possível processar o corpo da requisição'
  };
};

export function internalError(): HttpResponse {
  return {
    statusCode: 500,
    message: 'Ocorreu um erro inesperado com o nosso servidor.'
  };
};

