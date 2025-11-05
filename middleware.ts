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
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // Only English and Bengali
  locales: ["en", "bn"],
  defaultLocale: "en",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
