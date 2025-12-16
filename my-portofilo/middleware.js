// middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Redirige vers /dashboard si non authentifié et que la route est /dashboard/admin
  if (pathname.startsWith('/dashboard/admin') && !token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Redirige vers /dashboard/admin si déjà authentifié et sur /dashboard
  if (pathname === '/dashboard' && token) {
    return NextResponse.redirect(new URL('/dashboard/admin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
