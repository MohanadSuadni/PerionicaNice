import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "ru", "sr"];
const defaultLocale = "sr";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // لا نضيف اللغة إلى لوحة الإدارة
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return NextResponse.next();
  }

  // الملفات والمجلدات التي يجب ألا تمر عبر نظام اللغات
  const publicFile =
    pathname.startsWith("/videos/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/audio/") ||
    pathname.startsWith("/fonts/") ||
    pathname.startsWith("/uploads/") ||
    pathname.match(/\.[^/]+$/);

  if (publicFile) {
    return NextResponse.next();
  }

  // إذا كان الرابط يحتوي على اللغة بالفعل
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) ||
      pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // إضافة اللغة للموقع فقط
  return NextResponse.redirect(
    new URL(`/${defaultLocale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};