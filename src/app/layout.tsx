// src/app/layout.tsx
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: {
//     default: "Islamic Prayer Times - Accurate Salah Times & Forbidden Times",
//     template: "%s | Islamic Prayer Times",
//   },
//   description:
//     "Get accurate prayer times, forbidden prayer times, Islamic calendar, and Qibla direction based on your location. Complete guide for Muslim daily prayers.",
//   // ... rest of your metadata
//   keywords:
//     "prayer times, salah times, islamic prayer, forbidden times, fajr, dhuhr, asr, maghrib, isha, muslim, islam, prayer, mosque",
//   authors: [{ name: "Islamic Prayer Times" }],
//   creator: "Islamic Prayer Times",
//   publisher: "Islamic Prayer Times",
//   formatDetection: {
//     email: false,
//     address: false,
//     telephone: false,
//   },
//   metadataBase: new URL("https://yourdomain.com"),
//   alternates: {
//     canonical: "/",
//     languages: {
//       en: "/en",
//       ar: "/ar",
//       ur: "/ur",
//     },
//   },
//   openGraph: {
//     type: "website",
//     locale: "en_US",
//     url: "https://yourdomain.com",
//     title: "Islamic Prayer Times - Accurate Salah Times",
//     description:
//       "Get accurate prayer times and forbidden prayer times based on your location.",
//     siteName: "Islamic Prayer Times",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Islamic Prayer Times - Accurate Salah Times",
//     description:
//       "Get accurate prayer times and forbidden prayer times based on your location.",
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <head>
//         <link rel="icon" href="/favicon.ico" />
//         <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
//         <link rel="manifest" href="/manifest.json" />
//         <meta name="theme-color" content="#0a5c36" />
//         <meta
//           name="viewport"
//           content="width=device-width, initial-scale=1, maximum-scale=5"
//         />
//       </head>
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }
// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Optional: improves performance
});

export const metadata: Metadata = {
  // ... your existing metadata
  title: {
    default: "Islamic Prayer Times - Accurate Salah Times & Forbidden Times",
    template: "%s | Islamic Prayer Times",
  },
  description:
    "Get accurate prayer times, forbidden prayer times, Islamic calendar, and Qibla direction based on your location. Complete guide for Muslim daily prayers.",
  // ... rest of your metadata
  keywords:
    "prayer times, salah times, islamic prayer, forbidden times, fajr, dhuhr, asr, maghrib, isha, muslim, islam, prayer, mosque",
  authors: [{ name: "Islamic Prayer Times" }],
  creator: "Islamic Prayer Times",
  publisher: "Islamic Prayer Times",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://yourdomain.com"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      ar: "/ar",
      ur: "/ur",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    title: "Islamic Prayer Times - Accurate Salah Times",
    description:
      "Get accurate prayer times and forbidden prayer times based on your location.",
    siteName: "Islamic Prayer Times",
  },
  twitter: {
    card: "summary_large_image",
    title: "Islamic Prayer Times - Accurate Salah Times",
    description:
      "Get accurate prayer times and forbidden prayer times based on your location.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a5c36" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
