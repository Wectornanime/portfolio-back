export function badRequest(message: string): HttpResponse {
  return {
    statusCode: 400,
    message
  };
};

export function success(data?: unknown): HttpResponse {
  return {
    statusCode: 200,
    data
  };
};

export function successNoContent(): HttpResponse {
  return {
    statusCode: 204
  };
};

export function successCreated(data?: unknown): HttpResponse {
  return {
    statusCode: 201,
    data
  };
};

export function internalError(): HttpResponse {
  return {
    statusCode: 500,
    message: 'Ocorreu um erro inesperado com o nosso servidor.'
  };
};
