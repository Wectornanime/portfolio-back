import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {res.status(404).json({message: 'Rota não encontrada'});});

export default router;
