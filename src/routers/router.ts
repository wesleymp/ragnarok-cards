import { Router } from 'express';

import { signupController, signinController, newCardController } from '../controllers';
import {
  validateNameMiddleware,
  validateEmailMiddleware,
  validatePasswordMiddleware,
  authMiddleware,
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

router.post(
  '/new-card',
  authMiddleware,
  validateNameMiddleware,
  newCardController,
);

export default router;
