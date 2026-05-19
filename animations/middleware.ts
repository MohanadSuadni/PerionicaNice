import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "ru", "sr"];
const defaultLocale = "sr";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ako URL već ima locale
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) ||
      pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // redirect "/" -> "/sr"
  return NextResponse.redirect(
    new URL(`/${defaultLocale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: ["/:path*"],
};