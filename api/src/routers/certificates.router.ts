import CreateCertificatesController from 'src/controllers/certificates/create-certificates.controller';
import DeleteCertificatesController from 'src/controllers/certificates/delete-certificates.controller';
import GetAllCertificatesController from 'src/controllers/certificates/getAll-certificates.controller';
import GetOneCertificatesController from 'src/controllers/certificates/getOne-certificates.controller';
import UpdateCertificatesController from 'src/controllers/certificates/update-certificates.controller';
import AuthMiddleware from 'src/middlewares/auth.middleware';

export const certificatesRouter: HttpRouter = {
  '/': {
    get: {
      controller: new GetAllCertificatesController,
      middlewares: [
        new AuthMiddleware
      ]
    },
    post: {
      controller: new CreateCertificatesController,
      middlewares: [
        new AuthMiddleware
      ]
    }
  },
  '/:id': {
    get: {
      controller: new GetOneCertificatesController,
      middlewares: [
        new AuthMiddleware
      ]
    },
    put: {
      controller: new UpdateCertificatesController,
      middlewares: [
        new AuthMiddleware
      ]
    },
    delete: {
      controller: new DeleteCertificatesController,
      middlewares: [
        new AuthMiddleware
      ]
    }
  }
};
