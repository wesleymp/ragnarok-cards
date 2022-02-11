import { Request, Response, NextFunction } from 'express';

export const validateEmailMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo nome não pode ser nulo.' });
  }
  return next();
};
