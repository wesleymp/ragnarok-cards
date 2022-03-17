import { Request, Response } from 'express';

import { postAlbumService } from '../services';

export const albumController = async (req: Request, res: Response) => {
  try {
    const albumData = await postAlbumService(req.body, req.headers);
    return res.status(albumData.status).json({ message: albumData.message });
  } catch (error: any) {
    return res.status(error.status).json({ message: error.message });
  }
};
