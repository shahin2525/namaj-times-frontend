import Head from "next/head";
import ForbiddenTimeContent from "@/components/forbidden/ForbiddenTimeContent";
import ForbiddenTimeSection from "@/components/forbidden/ForbiddenTimeSection";

export default function ForbiddenTimePage() {
  // Fallback SEO for Googlebot (SSR)
  const fallbackTitle = "Forbidden namaj Times | Sunrise, Zawal & Sunset";
  const fallbackDesc =
    "Today's forbidden namaj times including sunrise, zawal, and sunset.";

  return (
    <>
      <Head>
        <title>{fallbackTitle}</title>
        <meta name="description" content={fallbackDesc} />

        <meta property="og:title" content={fallbackTitle} />
        <meta property="og:description" content={fallbackDesc} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Islamic Prayer Times" />

        <link rel="canonical" href="https://yourdomain.com/forbidden-time" />
      </Head>
      {/* Google AdSense */}
      <div className="w-full h-24 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-500 mb-6 border border-dashed px-10">
        Google AdSense block
      </div>
      <p className="h-10" />
      <div className="flex justify-center items-center">
        <ForbiddenTimeSection />
      </div>
    </>
  );
}
