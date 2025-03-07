import { Request, Response } from 'express';

interface ScamReport {
  id: string;
  userId: string;
  type: string;
  description: string;
  evidence: string[];
  status: 'pending' | 'investigating' | 'resolved';
  timestamp: Date;
}

/**
 * Controller for managing scam detection and reporting
 */
class ScamController {
  private scamReports: ScamReport[] = [];

  /**
   * Verify potential scam OTP
   */
  async verifyOTP(req: Request, res: Response) {
    try {
      const { otp, serviceProvider, context } = req.body;

      if (!otp || !serviceProvider) {
        return res.status(400).json({ error: 'Missing required information' });
      }

      // Implement OTP verification logic
      const isScam = this.analyzeOTP(otp, serviceProvider, context);

      if (isScam) {
        return res.status(200).json({
          warning: true,
          message: 'Potential scam detected',
          recommendations: [
            'Do not share this OTP',
            'Report the incident',
            'Contact official customer service',
          ],
        });
      }

      return res.status(200).json({
        warning: false,
        message: 'No immediate risks detected',
      });
    } catch (error) {
      console.error('OTP verification failed:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Submit a scam report
   */
  async reportScam(req: Request, res: Response) {
    try {
      const { type, description, evidence } = req.body;
      const userId = req.user?.id;

      if (!userId || !type || !description) {
        return res.status(400).json({ error: 'Missing required information' });
      }

      const report: ScamReport = {
        id: Math.random().toString(36).substr(2, 9),
        userId,
        type,
        description,
        evidence: evidence || [],
        status: 'pending',
        timestamp: new Date(),
      };

      this.scamReports.push(report);

      // In a real implementation, this would be saved to a database
      // and trigger appropriate notifications/actions

      return res.status(201).json({
        message: 'Scam report submitted successfully',
        reportId: report.id,
      });
    } catch (error) {
      console.error('Scam report submission failed:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Get user's scam reports
   */
  async getUserReports(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const userReports = this.scamReports.filter(
        (report) => report.userId === userId
      );

      return res.status(200).json(userReports);
    } catch (error) {
      console.error('Fetching user reports failed:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  private analyzeOTP(
    otp: string,
    serviceProvider: string,
    context?: string
  ): boolean {
    // Implement sophisticated OTP analysis logic here
    // This is a simplified example
    const suspiciousPatterns = [
      // Common scam patterns
      /^999\d{3}$/,
      /^123456$/,
      /^000000$/,
    ];

    const suspiciousContexts = [
      'courier',
      'delivery',
      'bank',
      'urgent',
      'account',
    ];

    // Check for suspicious patterns
    const hasSupiciousPattern = suspiciousPatterns.some((pattern) =>
      pattern.test(otp)
    );

    // Check for suspicious context
    const hasSupiciousContext =
      context &&
      suspiciousContexts.some((keyword) =>
        context.toLowerCase().includes(keyword)
      );

    // Verify service provider against whitelist (simplified)
    const legitProviders = ['verified-courier', 'trusted-bank', 'secure-service'];
    const isUnknownProvider = !legitProviders.includes(serviceProvider);

    return hasSupiciousPattern || hasSupiciousContext || isUnknownProvider;
  }
}

export default new ScamController();