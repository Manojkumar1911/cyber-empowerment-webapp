import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import cameraController from '@/backend/controllers/cameraController';

export async function GET(request: NextRequest) {
  return cameraController.checkCameraStatus(request as any, NextResponse as any);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (body.type === 'restrict') {
    return cameraController.restrictCamera(request as any, NextResponse as any);
  } else if (body.type === 'alert') {
    return cameraController.handleCameraAlert(request as any, NextResponse as any);
  }
  return NextResponse.json({ error: 'Invalid request type' }, { status: 400 });
}