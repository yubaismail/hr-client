// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the path the user is trying to access
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/login';
  
  // Check for authentication cookie/token
  const isAuthenticated = request.cookies.has('auth') || request.headers.get('Authorization');
  
  // Redirect logic
  if (!isPublicPath && !isAuthenticated) {
    // User is trying to access a protected page without authentication
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (isPublicPath && isAuthenticated) {
    // User is already authenticated but trying to access login page
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    // Apply to all routes except api, _next, and static files
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};