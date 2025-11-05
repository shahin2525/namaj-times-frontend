// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactCompiler: true,
//   i18n: {
//     locales: ["en", "bn"],
//     defaultLocale: "en",
//     localeDetection: false,
//   },
// };

// export default nextConfig;

// next.config.js
// const withNextIntl = require("next-intl/plugin")();

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
//   async headers() {
//     return [
//       {
//         source: "/(.*)",
//         headers: [
//           {
//             key: "X-Frame-Options",
//             value: "DENY",
//           },
//           {
//             key: "X-Content-Type-Options",
//             value: "nosniff",
//           },
//         ],
//       },
//     ];
//   },
// };

// module.exports = withNextIntl(nextConfig);
// next.config.js
const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  i18n: {
    locales: ["en", "bn"],
    defaultLocale: "en",
  },
  compress: true,
  poweredByHeader: false,
};

module.exports = withNextIntl(nextConfig);
