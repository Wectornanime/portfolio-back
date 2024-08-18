import { login, signup } from '@controllers/auth.controller';
import { Request, Response, Router } from 'express';

const loginRouter = Router();

loginRouter.post('/', login);
loginRouter.post('/signup', signup);

loginRouter.use((req: Request, res: Response) => {
  const method = req.method;
  const url = req.baseUrl;
  res
    .status(400)
    .json({ message: `O metodo ${method} não é permitido para a rota ${url}` });
});

export default loginRouter;
