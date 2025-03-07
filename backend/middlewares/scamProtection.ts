import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function scamProtectionMiddleware(request: NextRequest) {
  // Add scam protection middleware logic here
  const isSuspicious = checkForSuspiciousActivity(request);

  if (isSuspicious) {
    return NextResponse.json(
      { error: 'Suspicious activity detected' },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

function checkForSuspiciousActivity(request: NextRequest): boolean {
  // Add suspicious activity detection logic here
  // This is a placeholder implementation
  const suspiciousPatterns = [
    /malicious/i,
    /phishing/i,
    /scam/i,
  ];

  const url = request.url.toLowerCase();
  return suspiciousPatterns.some(pattern => pattern.test(url));
}