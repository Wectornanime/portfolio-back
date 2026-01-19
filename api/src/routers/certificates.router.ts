import CreateCertificatesController from 'src/controllers/certificates/create-certificates.controller';
import GetAllCertificatesController from 'src/controllers/certificates/getAll-certificates.controller';
import GetOneCertificatesController from 'src/controllers/certificates/getOne-certificates.controller';
import UpdateCertificatesController from 'src/controllers/certificates/update-certificates.controller';

export const certificatesRouter: HttpRouter = {
  '/': {
    get: {
      controller: new GetAllCertificatesController
    },
    post: {
      controller: new CreateCertificatesController
    }
  },
  '/:id': {
    get: {
      controller: new GetOneCertificatesController
    },
    put: {
      controller: new UpdateCertificatesController
    }
  }
};
