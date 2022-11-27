import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const middleware = async (request: NextRequest) => {
  const { cookies } = request;

  const token: string = cookies.get(process.env.AUTH_COOKIE_NAME);
  const url = request.nextUrl.clone();

  if (url.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  if (
    !url.pathname.startsWith('/login') &&
    !url.pathname.startsWith('/register')
  ) {
    if (token === undefined) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }
};

export const config = {
  matcher: [
    '/introduction/:path*',
    '/add/:path*',
    '/edit/:path*',
    '/todolist',
    '/register',
    '/login',
    '/',
  ],
};

export default middleware;
