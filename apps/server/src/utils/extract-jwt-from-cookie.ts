// TODO This is a temporary solution, we shouldn't use cookies, but headers
export const extractJwtFromCookie = (cookieName: string) => {
  return function (request: any & Request) {
    var cookies = request.headers.cookie;
    if (cookies) {
      request.cookies = cookies.split(';').reduce((obj, c) => {
        var n = c.split('=');
        obj[n[0].trim()] = n[1].trim();
        return obj;
      }, {});
    }
    // Extract token from cookie cookieName
    const token = request.cookies[cookieName];
    return token;
  };
};
