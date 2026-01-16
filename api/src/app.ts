import express from 'express';
import cors from 'cors';
import { expressRouterAdapter } from '@adapter/expressRouter.adapter';
import { appRouter } from './app.router';

const app = express();

const routes = expressRouterAdapter(appRouter);

app.use(cors());
app.use(express.json());
app.use(routes);

export default app;
