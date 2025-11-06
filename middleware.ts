// // middleware.ts
// import createMiddleware from "next-intl/middleware";

// export default createMiddleware({
//   locales: ["en", "ar", "ur"],
//   defaultLocale: "en",
// });

// export const config = {
//   matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
// };
// middleware.ts
// import createMiddleware from "next-intl/middleware";

// export default createMiddleware({
//   // Only English and Bengali
//   locales: ["en", "bn"],
//   defaultLocale: "en",
// });

// export const config = {
//   matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
// };
// middleware.ts
// import createMiddleware from "next-intl/middleware";

// export default createMiddleware({
//   // Only English and Bengali
//   locales: ["en", "bn"],
//   defaultLocale: "en",
//   localePrefix: "always", // Always show locale in URL
// });

// export const config = {
//   matcher: [
//     // Enable a redirect to a matching locale at the root
//     "/",

//     // Set a cookie to remember the previous locale for
//     // all requests that have a locale prefix
//     "/(bn|en)/:path*",

//     // Enable redirects that add missing locales
//     // (this only applies when the default locale is in the URL)
//     "/((?!_next|_vercel|.*\\..*).*)",
//   ],
// };
//
// middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(bn|en)/:path*"],
};
