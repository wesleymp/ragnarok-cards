import { Request, Response, NextFunction } from 'express';
import { authorizationRemovePrefix, verifyToken } from '../util/jwt';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado.' });
  }
  const token = authorizationRemovePrefix(authorization);
  if (!verifyToken(token)) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
  return next();
};
