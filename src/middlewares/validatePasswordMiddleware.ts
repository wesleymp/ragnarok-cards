import { Request, Response, NextFunction } from 'express';

export const validatePasswordMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo password não pode ser nulo.' });
  }
  return next();
};
