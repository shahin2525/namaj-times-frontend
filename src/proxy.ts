// import createMiddleware from "next-intl/middleware";
// import { routing } from "./i18n/routing";
// // import { routing } from "./src/i18n/routing";

// export default createMiddleware(routing);

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ["/", "/(bn|en)/:path*"],
// };

//

//
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "bn", "hi", "ar", "ur"],
  defaultLocale: "en",
  localeDetection: true, // auto-detect browser language
});

export const config = {
  // Match each locale explicitly ["/", "/en/:path*", "/bn/:path*", "/hi/:path*"],
  matcher: ["/", "/(bn|en|hi|ar|ur)/:path*"],
  //matcher: ['/', '/(bn|en|hi|ar)/:path*']
};
