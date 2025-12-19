import GetAllCertificatesController from 'src/controllers/certificates/getAll-certificates.controller';

export const certificatesRouter: HttpRouter = {
  '/': {
    get: {
      controller: new GetAllCertificatesController
    }
  }
};
