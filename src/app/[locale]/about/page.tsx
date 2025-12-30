"use client";

export default function AboutUs() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 text-emerald-950 dark:text-emerald-100">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">About Us</h1>

      <section className="space-y-6 text-sm leading-relaxed">
        <p>
          Welcome to <strong>Namaz Times</strong>, a dedicated platform created
          to help Muslims around the world easily access accurate and reliable
          Islamic prayer times.
        </p>

        <p>
          Our mission is to provide a simple, clean, and trustworthy solution
          for daily Salah timing, Islamic calendars, Qibla direction, and
          related worship tools that support Muslims in fulfilling their daily
          religious obligations.
        </p>

        <h2 className="text-lg font-semibold">Our Purpose</h2>
        <p>
          Namaz Times was built with the intention of serving the Ummah by
          offering prayer time information that is easy to understand and
          accessible from any device.
        </p>
        <p>
          We aim to reduce confusion around prayer timings by using established
          Islamic calculation methods and modern technology while respecting
          local practices.
        </p>

        <h2 className="text-lg font-semibold">What We Offer</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Daily, weekly, and monthly Islamic prayer times</li>
          <li>Hijri (Islamic) calendar</li>
          <li>Forbidden prayer times (sunrise, zawal, sunset)</li>
          <li>Qibla direction based on your location</li>
          <li>Multi-language support for global accessibility</li>
        </ul>

        <h2 className="text-lg font-semibold">Accuracy & Responsibility</h2>
        <p>
          Prayer times are calculated using trusted Islamic calculation methods
          and location-based data. While we strive for accuracy, users are
          encouraged to verify prayer times with local mosques or Islamic
          authorities when absolute precision is required.
        </p>

        <h2 className="text-lg font-semibold">Our Commitment</h2>
        <p>
          We are committed to maintaining a respectful, ad-safe, and family-
          friendly environment. All advertisements displayed on Namaz Times
          comply with Google AdSense policies and do not interfere with
          religious content or user experience.
        </p>

        <h2 className="text-lg font-semibold">Transparency</h2>
        <p>
          Namaz Times is an independent informational website. We do not claim
          affiliation with any mosque, Islamic authority, or organization unless
          explicitly stated.
        </p>

        <h2 className="text-lg font-semibold">Contact Us</h2>
        <p>
          If you have questions, feedback, or suggestions, we would love to hear
          from you.
        </p>
        <p>
          📧 Email:{" "}
          <a
            href="mailto:contact@yourdomain.com"
            className="text-emerald-700 underline hover:text-emerald-900 dark:text-emerald-300"
          >
            contact@yourdomain.com
          </a>
        </p>
      </section>
    </main>
  );
}
