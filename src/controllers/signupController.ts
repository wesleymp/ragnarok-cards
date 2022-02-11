import { Request, Response } from 'express';

import { signupService } from '../services';

export const signupController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const userData = await signupService(name, email, password);
    return res.status(userData.status).json({ message: userData.message });
  } catch (error: any) {
    return res.status(error.status).json({ message: error.message });
  }
};
