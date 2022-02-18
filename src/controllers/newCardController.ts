import { Request, Response } from 'express';

import { newCardService } from '../services';

export const newCardController = async (req: Request, res: Response) => {
  const { name, image, description } = req.body;
  const { authorization } = req.headers;
  try {
    const cardData = await newCardService(name, image, description, authorization as string);
    return res.status(cardData.status).json({ message: cardData.message });
  } catch (error: any) {
    return res.status(error.status).json({ message: error.message });
  }
};
