import { NextResponse } from 'next/server';
import { createHmac } from 'node:crypto';

const SESSION_DURATION_SECONDS = 60 * 60 * 8;
const REMEMBER_DURATION_SECONDS = 60 * 60 * 24 * 30;

export async function POST(request: Request) {
  let credentials: unknown;

  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const email = process.env.DEMO_ADMIN_EMAIL;
  const password = process.env.DEMO_ADMIN_PASSWORD;
  const secret = process.env.AUTH_SECRET;
  if (!email || !password || !secret || secret.length < 32) {
    return NextResponse.json({ error: 'Demo sign-in is not configured.' }, { status: 503 });
  }

  if (
    typeof credentials !== 'object' || credentials === null ||
    !('email' in credentials) || !('password' in credentials) ||
    credentials.email !== email || credentials.password !== password
  ) {
    return NextResponse.json({ error: 'Email or password is incorrect.' }, { status: 401 });
  }

  const rememberMe = typeof credentials === 'object' && credentials !== null &&
    'rememberMe' in credentials && credentials.rememberMe === true;
  const duration = rememberMe ? REMEMBER_DURATION_SECONDS : SESSION_DURATION_SECONDS;
  const sessionExpiresAt = Date.now() + duration * 1000;
  const tokenMode = rememberMe ? 'remember' : 'session';
  const signature = createHmac('sha256', secret)
    .update(`${sessionExpiresAt}.${tokenMode}`)
    .digest('hex');
  const response = NextResponse.json({ success: true });
  response.cookies.set('eluria_auth_token', `${sessionExpiresAt}.${tokenMode}.${signature}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    ...(rememberMe ? { maxAge: REMEMBER_DURATION_SECONDS } : {}),
  });

  return response;
}