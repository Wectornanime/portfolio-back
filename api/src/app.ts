import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { expressRouterAdapter } from '@adapter/expressRouter.adapter';
import { appRouter } from './app.router';
import { multerConfig } from './config/multer.config';

const app = express();

const routes = expressRouterAdapter(appRouter);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(multerConfig.single('file'));
app.use('/api', routes);

export default app;
