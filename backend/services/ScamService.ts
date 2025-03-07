import { ScamReportModel, ScamReport } from '../models/ScamReport';
import { validation } from '../utils/validation';
import { security } from '../utils/security';

export class ScamService {
  private scamReportModel: ScamReportModel;

  constructor() {
    this.scamReportModel = new ScamReportModel();
  }

  async verifyOTP(otp: string, serviceProvider: string, context?: string): Promise<{
    warning: boolean;
    message: string;
    recommendations?: string[];
  }> {
    // Validate OTP format
    if (!security.validateOTP(otp)) {
      return {
        warning: true,
        message: 'Invalid OTP format detected',
        recommendations: [
          'Do not share this OTP',
          'Report suspicious activity',
          'Contact official support',
        ],
      };
    }

    // Check for suspicious context
    if (context && validation.containsScamKeywords(context)) {
      return {
        warning: true,
        message: 'Potential scam detected in the message context',
        recommendations: [
          'Do not respond to the request',
          'Block the sender',
          'Report to authorities',
        ],
      };
    }

    // Verify service provider
    if (security.isSuspiciousURL(serviceProvider)) {
      return {
        warning: true,
        message: 'Unverified service provider detected',
        recommendations: [
          'Verify the service provider',
          'Use official channels only',
          'Report suspicious services',
        ],
      };
    }

    return {
      warning: false,
      message: 'No immediate risks detected',
    };
  }

  async reportScam(
    userId: string,
    type: string,
    description: string,
    evidence?: string[]
  ): Promise<ScamReport> {
    // Validate input
    const sanitizedDescription = validation.sanitizeInput(description);

    // Determine severity based on type and description
    const severity = this.calculateSeverity(type, sanitizedDescription);

    // Create report
    const report = await this.scamReportModel.create({
      userId,
      type,
      description: sanitizedDescription,
      evidence,
      status: 'pending',
      severity,
    });

    return report;
  }

  async getUserReports(userId: string): Promise<ScamReport[]> {
    return this.scamReportModel.findByUserId(userId);
  }

  private calculateSeverity(type: string, description: string): 'low' | 'medium' | 'high' {
    const highRiskKeywords = ['bank', 'credit card', 'password', 'social security'];
    const mediumRiskKeywords = ['urgent', 'verify', 'account'];

    if (highRiskKeywords.some(keyword => 
      type.toLowerCase().includes(keyword) || 
      description.toLowerCase().includes(keyword)
    )) {
      return 'high';
    }

    if (mediumRiskKeywords.some(keyword => 
      type.toLowerCase().includes(keyword) || 
      description.toLowerCase().includes(keyword)
    )) {
      return 'medium';
    }

    return 'low';
  }
}