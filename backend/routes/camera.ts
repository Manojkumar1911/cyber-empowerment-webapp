import express from 'express';
import { restrictCameraAccess, checkCameraStatus } from '../controllers/cameraController';

const router = express.Router();
router.post('/restrict', restrictCameraAccess);
router.get('/status', checkCameraStatus);
export default router;