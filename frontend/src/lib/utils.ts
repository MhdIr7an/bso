import * as cookie from 'cookie';

export function setCookie(name: string, value: string) {
  const date = new Date();
  date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function getCookies(request: Request, cookie_name: string) {
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  return cookies[cookie_name];
}