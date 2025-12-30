"use client";

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 text-emerald-950 dark:text-emerald-100">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Privacy Policy</h1>

      <p className="mb-8 text-sm text-emerald-700 dark:text-emerald-300">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="space-y-6 text-sm leading-relaxed">
        <p>
          Welcome to <strong>Namaz Times</strong>. Your privacy is important to
          us. This Privacy Policy document explains what information is
          collected and recorded by Namaz Times and how we use it.
        </p>

        <p>
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.
        </p>

        <h2 className="text-lg font-semibold">1. Information We Collect</h2>
        <p>
          Namaz Times does not require users to register or provide personal
          information to use our services.
        </p>
        <p>
          However, we may collect non-personal information automatically,
          including IP address, browser type, device information, pages visited,
          and date and time of visits. This information is used only for website
          analytics, performance monitoring, and improving user experience.
        </p>

        <h2 className="text-lg font-semibold">2. Cookies and Web Beacons</h2>
        <p>
          Namaz Times uses cookies to store visitor preferences and to optimize
          the user experience by customizing our web page content based on
          visitors’ browser type or other information.
        </p>
        <p>
          You can choose to disable cookies through your individual browser
          options. More detailed information about cookie management is
          available in your browser’s help section.
        </p>

        <h2 className="text-lg font-semibold">
          3. Google AdSense & Third-Party Advertising
        </h2>
        <p>
          We use <strong>Google AdSense</strong> to display advertisements.
          Google, as a third-party vendor, uses cookies (including the
          DoubleClick cookie) to serve ads to users based on their visit to our
          website and other websites on the internet.
        </p>
        <p>
          Google’s use of the DoubleClick cookie enables it and its partners to
          serve ads to users based on their visit to Namaz Times and/or other
          websites.
        </p>
        <p>
          Users may opt out of personalized advertising by visiting:
          <br />
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 underline hover:text-emerald-900 dark:text-emerald-300"
          >
            https://adssettings.google.com
          </a>
        </p>

        <h2 className="text-lg font-semibold">
          4. Third-Party Privacy Policies
        </h2>
        <p>
          Namaz Times’s Privacy Policy does not apply to other advertisers or
          websites. We advise you to consult the respective Privacy Policies of
          these third-party ad servers or websites for more detailed information
          about their practices and instructions on how to opt out of certain
          options.
        </p>

        <h2 className="text-lg font-semibold">5. Children’s Information</h2>
        <p>
          Namaz Times does not knowingly collect any Personal Identifiable
          Information from children under the age of 13.
        </p>
        <p>
          If you believe that your child provided this kind of information on
          our website, please contact us immediately and we will do our best to
          promptly remove such information from our records.
        </p>

        <h2 className="text-lg font-semibold">
          6. Location & Prayer Time Accuracy
        </h2>
        <p>
          Namaz Times may use approximate location data (such as browser-based
          location permission or IP-based estimation) to calculate accurate
          prayer times.
        </p>
        <p>
          We do not permanently store precise location data. Prayer times are
          calculated using trusted Islamic calculation methods; however, users
          are encouraged to verify times with local authorities when needed.
        </p>

        <h2 className="text-lg font-semibold">7. Consent</h2>
        <p>
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.
        </p>

        <h2 className="text-lg font-semibold">
          8. Updates to This Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page, and the updated date will be revised above.
        </p>

        <h2 className="text-lg font-semibold">9. Contact Us</h2>
        <p>
          If you have any questions or suggestions about our Privacy Policy,
          please contact us:
        </p>
        <p>
          📧 Email:{" "}
          <a
            href="mailto:mdshahin.dev99@gmail.com"
            className="text-emerald-700 underline hover:text-emerald-900 dark:text-emerald-300"
          >
            mdshahin.dev99@gmail.com
          </a>
        </p>
      </section>
    </main>
  );
}
