import express from 'express';
import AppRouter from './app.router';

const app = express();
const appRouter = new AppRouter();

app.use(appRouter.routes());

export default app;
