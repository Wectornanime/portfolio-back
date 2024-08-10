import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import router from './router';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => console.log(`App rodando na porta: ${port}`));
