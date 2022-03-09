import { Router } from 'express';

import {
  signupController,
  signinController,
  newCardController,
  allCardsController,
  randomCardController,
  albumController,
} from '../controllers';
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

router.get(
  '/all-cards',
  authMiddleware,
  allCardsController,
);

router.get(
  '/random-card',
  authMiddleware,
  randomCardController,
);

router.post(
  '/album',
  authMiddleware,
  albumController,
);

export default router;
