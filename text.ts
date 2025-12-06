// middleware.js
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'bn', 'hi', 'ar'],
  defaultLocale: 'en'
});

export const config = {
  matcher: ['/', '/(bn|en|hi|ar)/:path*']
};