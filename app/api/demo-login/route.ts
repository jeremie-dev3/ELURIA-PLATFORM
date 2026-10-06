import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  let credentials: { email?: string; password?: string };

  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (credentials.email !== 'admin@eluria.com' || credentials.password !== 'Eluria2026!') {
    return NextResponse.json({ error: 'Email or password is incorrect.' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set('eluria_auth_token', 'demo_token', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });

  return response;
}