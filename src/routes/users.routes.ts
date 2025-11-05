import { Router } from 'express';
import { changeRole } from '../controllers/users.controller';

const router = Router();

router.patch('/:id/role', changeRole);

export default router;
