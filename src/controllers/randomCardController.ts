import { Request, Response } from 'express';

import { randomCardService } from '../services';

export const randomCardController = async (req: Request, res: Response) => {
  try {
    const cardData = await randomCardService();
    return res.status(cardData.status).json({ data: cardData.data });
  } catch (error: any) {
    return res.status(error.status).json({ message: error.message });
  }
};
