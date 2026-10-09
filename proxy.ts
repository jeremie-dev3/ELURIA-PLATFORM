import { createHmac, timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'eluria_auth_token';

function hasValidSession(token: string | undefined) {
  const secret = process.env.AUTH_SECRET;
  if (!token || !secret || secret.length < 32) return false;

  const [expiresAt, tokenMode, signature, extra] = token.split('.');
  if (
    !expiresAt ||
    (tokenMode !== 'session' && tokenMode !== 'remember') ||
    !signature ||
    extra !== undefined ||
    !/^\d+$/.test(expiresAt)
  ) return false;
  if (Number(expiresAt) <= Date.now()) return false;

  const expected = createHmac('sha256', secret).update(`${expiresAt}.${tokenMode}`).digest();
  let received: Buffer;
  try {
    received = Buffer.from(signature, 'hex');
  } catch {
    return false;
  }

  return received.length === expected.length && timingSafeEqual(received, expected);
}

export function proxy(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (hasValidSession(token)) return NextResponse.next();

  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/invest/opportunities/:path*'],
};