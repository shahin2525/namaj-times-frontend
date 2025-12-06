//2

// const withNextIntl = require("next-intl/plugin")("./src/i18n/request.ts");

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     appDir: true,
//   },
//   compress: true,
//   poweredByHeader: false,
//   images: {
//     domains: ["localhost"],
//   },
// };

// module.exports = withNextIntl(nextConfig);

//3

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// 1. Wrap with the next-intl plugin
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// 2. Your Next.js config
const nextConfig: NextConfig = {
  reactStrictMode: true,

  // For Next.js 16 / new proxy.ts behavior (if needed)
  // experimental: {
  //   proxyTimeout: 60000
  // },

  // Locales used in your app
  // i18n: {
  //   locales: ["en", "bn", "hi"],
  //   defaultLocale: "en",
  //   localeDetection: false,
  // },
};

// 3. Export wrapped config
export default withNextIntl(nextConfig);
//
//4
// const withNextIntl = require("next-intl/plugin")("./src/i18n/request.ts");

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     appDir: true,
//   },
//   compress: true,
//   poweredByHeader: false,
//   images: {
//     domains: ["localhost"],
//   },
// };

// module.exports = withNextIntl(nextConfig);
