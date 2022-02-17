import { Router } from 'express';

import { signupController, signinController } from '../controllers';
import {
  validateNameMiddleware,
  validateEmailMiddleware,
  validatePasswordMiddleware,
} from '../middlewares';

const router = Router();

router.post(
  '/signup',
  validateNameMiddleware,
  validateEmailMiddleware,
  validatePasswordMiddleware,
  signupController,
);

router.post(
  '/signin',
  validateEmailMiddleware,
  validatePasswordMiddleware,
  signinController,
);

export default router;
