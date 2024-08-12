import { authKey } from '@middlewares/apiKeyAuth';
import { Request, Response, Router } from 'express';

import authRouter from './routers/auth.router';
import usersRouter from './routers/user.router';

const router = Router();

router.use(authKey);
router.use('/user', usersRouter);
router.use('/auth', authRouter);

router.use((req: Request, res: Response) => {
    res.status(400).json({ message: 'Rota não encontrada' });
});

export default router;
