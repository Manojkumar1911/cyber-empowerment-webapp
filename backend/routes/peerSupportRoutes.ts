// **Peer Support API Route**
// File: backend/routes/peerSupportRoutes.ts
import express from 'express';
import { getMessages, postMessage } from '../controllers/peerSupportController';

const router = express.Router();
router.get('/', getMessages);
router.post('/', postMessage);
export default router;
