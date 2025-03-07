import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import scamController from '@/backend/controllers/scamController';

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  if (body.type === 'verify') {
    return scamController.verifyOTP(request as any, NextResponse as any);
  } else if (body.type === 'report') {
    return scamController.reportScam(request as any, NextResponse as any);
  }
  
  return NextResponse.json({ error: 'Invalid request type' }, { status: 400 });
}

export async function GET(request: NextRequest) {
  return scamController.getUserReports(request as any, NextResponse as any);
}