import {  NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
// import { useSession } from 'next-auth/react';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*','/adminDashboard/:path*'],
};

export async function middleware(request) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

 

  // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, or home page
  
    if(token?.isAdmin && (url.pathname.startsWith('/sign-in') ||
                         url.pathname.startsWith('/sign-up') ||
                         url.pathname.startsWith('/verify') ||
                         url.pathname === '/')){
    return NextResponse.redirect(new URL('/adminDashboard', request.url)); 
                         }
   if(token && (url.pathname.startsWith('/sign-in') ||
            url.pathname.startsWith('/sign-up') ||
            url.pathname.startsWith('/verify') ||
            url.pathname === '/'))
    {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if(!token?.isAdmin && url.pathname.startsWith('/adminDashboard'))
    {
      return NextResponse.redirect(new URL('/dashboard', request.url));
  }
    

  if (!token && (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/adminDashboard'))) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }




  return NextResponse.next();
}