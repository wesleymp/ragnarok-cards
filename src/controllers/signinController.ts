import { Request, Response } from 'express';

import { signinService } from '../services';

export const signinController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userData = await signinService(email, password);
    return res
      .status(userData.status)
      .json({ token: userData.token });
  } catch (error: any) {
    return res.status(error.status).json({ message: error.message });
  }
};
