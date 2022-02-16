import { Request, Response, NextFunction } from 'express';

export const validatePasswordMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo senha não pode ser nulo.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O campo senha deve ter mais de 6 caracteres.' });
  }
  return next();
};
