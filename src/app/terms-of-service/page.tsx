"use client";

export default function TermsOfService() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 text-emerald-950 dark:text-emerald-100">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">
        Terms of Service
      </h1>

      <p className="mb-8 text-sm text-emerald-700 dark:text-emerald-300">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="space-y-6 text-sm leading-relaxed">
        <p>
          Welcome to <strong>Namaz Times</strong>. By accessing and using this
          website, you accept and agree to be bound by the terms and conditions
          outlined in this Terms of Service agreement.
        </p>

        <p>
          If you do not agree with any part of these terms, you must not use our
          website.
        </p>

        <h2 className="text-lg font-semibold">1. Use of the Website</h2>
        <p>
          Namaz Times provides Islamic prayer times, calendars, Qibla direction,
          and related informational content for general guidance purposes only.
        </p>
        <p>
          You agree to use this website only for lawful purposes and in a way
          that does not infringe the rights of others or restrict their use of
          the website.
        </p>

        <h2 className="text-lg font-semibold">2. Accuracy of Information</h2>
        <p>
          Prayer times are calculated using established Islamic calculation
          methods and location-based data. While we strive for accuracy, Namaz
          Times does not guarantee that all information provided is error-free
          or always up to date.
        </p>
        <p>
          Users are encouraged to verify prayer times with local mosques or
          Islamic authorities when precision is required.
        </p>

        <h2 className="text-lg font-semibold">3. Intellectual Property</h2>
        <p>
          All content on Namaz Times, including text, design, logos, graphics,
          and code, is the property of Namaz Times unless otherwise stated.
        </p>
        <p>
          You may not copy, reproduce, distribute, or modify any content from
          this website without prior written permission.
        </p>

        <h2 className="text-lg font-semibold">4. Third-Party Services</h2>
        <p>
          Namaz Times may use third-party services such as analytics tools and
          advertising platforms, including Google AdSense.
        </p>
        <p>
          We are not responsible for the content, privacy policies, or practices
          of any third-party websites or services.
        </p>

        <h2 className="text-lg font-semibold">5. Advertisements</h2>
        <p>
          Advertisements displayed on this website are served by third-party ad
          networks. Namaz Times does not endorse or guarantee the products or
          services advertised.
        </p>

        <h2 className="text-lg font-semibold">6. Limitation of Liability</h2>
        <p>
          Namaz Times shall not be held liable for any direct, indirect,
          incidental, or consequential damages arising from the use of this
          website or reliance on any information provided herein.
        </p>

        <h2 className="text-lg font-semibold">7. User Responsibilities</h2>
        <p>
          Users are responsible for ensuring that their use of this website
          complies with applicable local laws and regulations.
        </p>

        <h2 className="text-lg font-semibold">8. Changes to the Terms</h2>
        <p>
          Namaz Times reserves the right to update or change these Terms of
          Service at any time without prior notice.
        </p>
        <p>
          Continued use of the website after changes are posted constitutes
          acceptance of those changes.
        </p>

        <h2 className="text-lg font-semibold">9. Governing Law</h2>
        <p>
          These Terms shall be governed and interpreted in accordance with the
          laws applicable in your jurisdiction, without regard to its conflict
          of law provisions.
        </p>

        <h2 className="text-lg font-semibold">10. Contact Information</h2>
        <p>
          If you have any questions about these Terms of Service, please contact
          us:
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
