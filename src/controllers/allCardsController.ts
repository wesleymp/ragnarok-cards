import { Request, Response } from 'express';

import { allCardsService } from '../services';

export const allCardsController = async (req: Request, res: Response) => {
  try {
    const cardData = await allCardsService();
    return res.status(cardData.status).json({ data: cardData.data });
  } catch (error: any) {
    return res.status(error.status).json({ message: error.message });
  }
};
