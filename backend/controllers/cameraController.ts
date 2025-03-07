import { Request, Response } from 'express';

export const restrictCameraAccess = (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Unauthorized cameras restricted' });
};

export const checkCameraStatus = (req: Request, res: Response) => {
  return res.status(200).json({ isActive: false });
};