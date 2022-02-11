import { Router } from 'express';

import { signupController } from '../controllers';
import { validateNameMiddleware } from '../middlewares';

const router = Router();

router.post('/signup', validateNameMiddleware, signupController);

export default router;
