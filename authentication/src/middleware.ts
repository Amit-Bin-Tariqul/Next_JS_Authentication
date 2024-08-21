import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const protectedRoutes = ['/home'];

export default function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get('token');
  const token = tokenCookie?.value;

  // If the route is protected and no valid token is present, redirect to login
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    if (!token) {
      const loginUrl = new URL('/', req.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);  // Verify the JWT
      return NextResponse.next();  // Token is valid, allow access to the route
    } catch (error) {
      const loginUrl = new URL('/', req.url);
      return NextResponse.redirect(loginUrl);  // Invalid token, redirect to login
    }
  }

  return NextResponse.next();  // Allow all other routes
}

export const config = {
  matcher: ['/home'],
};
