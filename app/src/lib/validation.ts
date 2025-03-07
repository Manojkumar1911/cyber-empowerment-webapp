export const validation = {
  /**
   * Validate email format
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate phone number format
   */
  isValidPhone: (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
  },

  /**
   * Validate password strength
   */
  isStrongPassword: (password: string): boolean => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  },

  /**
   * Check if string contains common scam keywords
   */
  containsScamKeywords: (text: string): boolean => {
    const scamKeywords = [
      'urgent',
      'account suspended',
      'verify immediately',
      'win prize',
      'lottery',
      'inheritance',
      'bank transfer',
      'cryptocurrency investment',
    ];

    return scamKeywords.some(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  },

  /**
   * Sanitize user input to prevent XSS
   */
  sanitizeInput: (input: string): string => {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },
};