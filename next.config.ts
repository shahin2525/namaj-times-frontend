import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  i18n: {
    locales: ["en", "bn"],
    defaultLocale: "en",
    localeDetection: false,
  },
};

export default nextConfig;
