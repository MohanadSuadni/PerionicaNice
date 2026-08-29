import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "ru", "sr"];
const defaultLocale = "sr";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Admin routes should NOT get a language prefix
  if (
    pathname === "/admin" ||
    pathname.startsWith("/admin/")
  ) {
    return NextResponse.next();
  }

  // Check if URL already has a locale
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) ||
      pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect all other routes to the default locale
  return NextResponse.redirect(
    new URL(`/${defaultLocale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: ["/:path*"],
};