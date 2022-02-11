import { Router } from 'express';

import { signupController } from '../controllers';
import {
  validateNameMiddleware,
  validateEmailMiddleware,
} from '../middlewares';

const router = Router();

router.post(
  '/signup',
  validateNameMiddleware,
  validateEmailMiddleware,
  signupController,
);

export default router;
