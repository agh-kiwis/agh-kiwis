/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO This is a temporary solution, we shouldn't use cookies, but headers
export const extractJwtFromCookie = (cookieName: string) => {
  return function (request: any & Request) {
    const cookies = request.headers.cookie;
    if (cookies) {
      request.cookies = cookies
        .split(';')
        .reduce((obj: { [x: string]: any }, c: string) => {
          const n = c.split('=');
          obj[n[0].trim()] = n[1].trim();
          return obj;
        }, {});
    }
    // Extract token from cookie cookieName
    // Check if cookieName is in cookies:
    if (request.cookies && request.cookies[cookieName]) {
      // If it is, return the token
      return request.cookies[cookieName];
    }
    return null;
  };
};
