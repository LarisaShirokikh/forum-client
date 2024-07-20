// utils/cookies.ts
import cookie from "cookie";

export const setCookie = (
  res: any,
  name: string,
  value: string,
  options: cookie.CookieSerializeOptions
) => {
  const serializedCookie = cookie.serialize(name, value, options);
  res.setHeader("Set-Cookie", serializedCookie);
};

export const parseCookies = (req: any) => {
  if (!req || !req.headers) {
    return {};
  }
  return cookie.parse(req.headers.cookie || "");
};

export const removeCookie = (res: any, name: string) => {
  const emptyCookie = cookie.serialize(name, "", { expires: new Date(0) });
  res.setHeader("Set-Cookie", emptyCookie);
};
