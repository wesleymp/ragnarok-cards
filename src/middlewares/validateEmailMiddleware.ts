import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

export const validateEmailMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo nome não pode ser nulo.' });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Email inválido.' });
  }
  return next();
};
