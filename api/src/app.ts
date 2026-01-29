import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

import { expressRouterAdapter } from '@adapter/expressRouter.adapter';
import { appRouter } from './app.router';
import { multerConfig } from './config/multer.config';

const app = express();
const clientPathDist = path.resolve(__dirname, '../../client/dist');

const routes = expressRouterAdapter(appRouter);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(multerConfig.single('file'));

app.use('/api', routes);
app.use(express.static(clientPathDist));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(clientPathDist, 'index.html'));
});

export default app;
