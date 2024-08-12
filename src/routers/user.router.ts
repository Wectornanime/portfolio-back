import { getAllUsers } from '@controllers/user.controller';
import { Request, Response, Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', getAllUsers);

usersRouter.use((req: Request, res: Response) => {
    const method = req.method;
    const url = req.baseUrl;
    res.status(400).json({ message: `O metodo ${method} não é permitido para a rota ${url}` });
});

export default usersRouter;
