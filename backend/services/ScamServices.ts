// **Scam OTP Detection Update**
// File: backend/services/ScamService.ts

export const isScamOTP = (otp: string): boolean => {
    const scamOTPs = [
      '123456', '654321', '000000', '999999', '112233', '445566'
    ];
  
    return scamOTPs.includes(otp) || /^(.)\1{5}$/.test(otp);
  };