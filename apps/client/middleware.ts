import { JWTPayload, jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const secret: string = process.env.AUTH_JWT_SECRET;
const cookieName: string = process.env.AUTH_COOKIE_NAME;

const middleware = async (request: NextRequest) => {
  const { cookies } = request;

  const token: string = cookies.get(cookieName);
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

    try {
      await verify(token, secret);
      return NextResponse.next();
    } catch (error) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }
};

const verify = async (token: string, secret: string): Promise<JWTPayload> => {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));

  return payload;
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
