import { Router } from 'express';
import { ScamService } from '../services/ScamService';
import { validation } from '../utils/validation';

const router = Router();
const scamService = new ScamService();

router.post('/verify', async (req, res) => {
  try {
    const { otp, serviceProvider, context } = req.body;

    if (!otp || !serviceProvider) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await scamService.verifyOTP(otp, serviceProvider, context);
    res.status(200).json(result);
  } catch (error) {
    console.error('OTP verification failed:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

router.post('/report', async (req, res) => {
  try {
    const { userId, type, description, evidence } = req.body;

    if (!userId || !type || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Sanitize input
    const sanitizedDescription = validation.sanitizeInput(description);

    const report = await scamService.reportScam(
      userId,
      type,
      sanitizedDescription,
      evidence
    );

    res.status(201).json(report);
  } catch (error) {
    console.error('Scam report submission failed:', error);
    res.status(500).json({ error: 'Report submission failed' });
  }
});

router.get('/reports/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const reports = await scamService.getUserReports(userId);
    res.status(200).json(reports);
  } catch (error) {
    console.error('Fetching reports failed:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

export default router;