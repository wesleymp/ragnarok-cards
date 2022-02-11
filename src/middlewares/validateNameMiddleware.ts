import { Request, Response, NextFunction } from 'express';

export const validateNameMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo nome não pode ser nulo.' });
  }
  if (name.length < 2) {
    return res.status(400).json({ message: 'O campo nome deve ter mais de 2 caracteres.' });
  }
  return next();
};
