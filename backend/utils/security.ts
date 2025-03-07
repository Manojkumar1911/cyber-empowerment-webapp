import { createHash } from 'crypto';

export const security = {
  /**
   * Hash sensitive data using SHA-256
   */
  hashData: (data: string): string => {
    return createHash('sha256').update(data).digest('hex');
  },

  /**
   * Validate OTP format and common patterns
   */
  validateOTP: (otp: string): boolean => {
    // Check if OTP is 6 digits
    if (!/^\d{6}$/.test(otp)) {
      return false;
    }

    // Check for sequential numbers
    if (/012345|123456|234567|345678|456789/.test(otp)) {
      return false;
    }

    // Check for repeated numbers
    if (/(\d)\1{5}/.test(otp)) {
      return false;
    }

    return true;
  },

  /**
   * Check if a URL is potentially malicious
   */
  isSuspiciousURL: (url: string): boolean => {
    const suspiciousPatterns = [
      /bit\.ly/i,
      /goo\.gl/i,
      /tinyurl\.com/i,
      /suspicious\-domain\.com/i,
    ];

    return suspiciousPatterns.some(pattern => pattern.test(url));
  },

  /**
   * Generate a secure random string
   */
  generateSecureToken: (length: number = 32): string => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
  },
};