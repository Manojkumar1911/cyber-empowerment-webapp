// **Peer Support Controller**
// File: backend/controllers/peerSupportController.ts
import { Request, Response } from 'express';
import PeerMessage from '../models/PeerMessage';

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await PeerMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

export const postMessage = async (req: Request, res: Response) => {
  try {
    const { user, text } = req.body;
    const newMessage = new PeerMessage({ user, text });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save message' });
  }
};