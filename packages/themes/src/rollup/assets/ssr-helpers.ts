export interface SSRThemeOptions {
  cookieName: string;
  defaultTheme: string;
  attributeName: string;
  themes: string[];
}

export interface RequestLike {
  headers: {
    cookie?: string;
  };
}

export function getThemeFromRequest(
  request: Request,
  options: SSRThemeOptions
): string {
  const { cookieName, defaultTheme } = options;

  const cookieHeader = request.headers.get("Cookie") || "";
  console.log("Cookie Header:", cookieHeader);
  const cookies: Record<string, string> = {};

  cookieHeader.split(";").forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");
    if (name) {
      cookies[name] = decodeURIComponent(value || "");
    }
  });

  return cookies[cookieName] || defaultTheme;
}

export function injectThemeIntoHTML(
  html: string,
  theme: string,
  attributeName: string = "data-theme"
): string {
  return html.replace(/<html([^>]*)>/i, `<html$1 ${attributeName}="${theme}">`);
}

export function generateThemePreload(theme: string): string {
  return `<link rel="preload" href="/themes/${theme}.css" as="style" onload="this.onload=null;this.rel='stylesheet'">`;
}

export function generateThemeLinks(
  themes: string[],
  activeTheme: string
): string {
  return themes
    .map((theme) => {
      const disabled = theme !== activeTheme ? " disabled" : "";
      return `<link rel="stylesheet" href="assets/themes/${theme}.css" data-theme-css="${theme}"${disabled}>`;
    })
    .join("\n");
}

export function createExpressThemeMiddleware(options: SSRThemeOptions) {
  return (req: any, res: any, next: any) => {
    req.theme = getThemeFromRequest(req, options);
    res.locals.theme = req.theme;
    res.locals.themePreload = generateThemePreload(req.theme);
    res.locals.themeLinks = generateThemeLinks(options.themes, req.theme);
    next();
  };
}

export function getThemeFromNextRequest(
  req: any,
  options: SSRThemeOptions
): string {
  const cookies = req.cookies || {};
  return cookies[options.cookieName] || options.defaultTheme;
}

export function getThemeFromSvelteKitRequest(
  request: Request,
  options: SSRThemeOptions
): string {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies: Record<string, string> = {};

  cookieHeader.split(";").forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");
    if (name) {
      cookies[name] = decodeURIComponent(value || "");
    }
  });

  return cookies[options.cookieName] || options.defaultTheme;
}
