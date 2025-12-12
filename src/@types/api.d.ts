interface Controller {
  handle(): Promise<HttpResponse>
}

type HttpResponse = {
  statusCode: 200 | 404 | 400 | 500
  data?: any
  message?: string
}
