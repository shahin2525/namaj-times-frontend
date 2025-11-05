// // src/app/sitemap.ts
// import { MetadataRoute } from "next";

// export default function sitemap(): MetadataRoute.Sitemap {
//   const baseUrl = "https://yourdomain.com";
//   const locales = ["en", "ar", "ur"];
//   const routes = [
//     "",
//     "/prayer-times",
//     "/forbidden-times",
//     "/monthly-calendar",
//     "/qibla-direction",
//   ];

//   const sitemapEntries: MetadataRoute.Sitemap = [];

//   locales.forEach((locale) => {
//     routes.forEach((route) => {
//       sitemapEntries.push({
//         url: `${baseUrl}/${locale}${route}`,
//         lastModified: new Date(),
//         changeFrequency: "daily",
//         priority: route === "" ? 1 : 0.8,
//       });
//     });
//   });

//   return sitemapEntries;
// }
// src/app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yourdomain.com";

  // Only English and Bengali
  const locales = ["en", "bn"];
  const routes = [
    "",
    "/prayer-times",
    "/forbidden-times",
    "/monthly-calendar",
    "/qibla-direction",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: route === "" ? 1 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
