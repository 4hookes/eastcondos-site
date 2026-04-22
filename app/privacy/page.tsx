import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy – eastcondos.sg",
  description:
    "Privacy policy for EastCondos.sg. Learn how we collect, use, and protect your personal data.",
};

export default function PrivacyPage() {
  return (
    <div>
      <div className="bg-charcoal py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Privacy Policy
        </h1>
        <p className="text-gray-300 mt-3 text-lg">
          Last updated: February 2026
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-charcoal [&_h2]:text-2xl [&_h2]:font-serif [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:text-gray-600 [&_li]:mb-2 [&_a]:text-amber [&_a]:underline max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">
              1. Who We Are
            </h2>
            <p>
              EastCondos.sg is operated by Elfi Bin Abdullah, a licensed
              property agent registered with the Council for Estate Agencies
              (CEA), Singapore. When this policy refers to &ldquo;we&rdquo;,
              &ldquo;us&rdquo;, or &ldquo;our&rdquo;, it means EastCondos.sg
              and its team.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">
              2. What We Collect
            </h2>
            <p>We may collect the following personal data when you:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                Fill in the Strategy Session form (name, age, citizenship,
                income, property details, contact information)
              </li>
              <li>Contact us via phone, WhatsApp, or email</li>
              <li>Browse our website (cookies and analytics data)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">
              3. How We Use Your Data
            </h2>
            <p>Your personal data is used to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                Prepare your personalised property upgrade strategy and video
                consultation
              </li>
              <li>
                Calculate loan eligibility, CPF usage, and affordability
                estimates
              </li>
              <li>
                Communicate with you about your property enquiry and provide
                relevant market updates
              </li>
              <li>Improve our website and services</li>
            </ul>
            <p className="mt-3">
              We will never sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">
              4. Data Sharing
            </h2>
            <p>
              We may share your data with trusted service providers who assist in
              delivering our services, including:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                CRM and marketing platforms (for managing your enquiry and
                follow-up communications)
              </li>
              <li>Website hosting and analytics providers</li>
            </ul>
            <p className="mt-3">
              All service providers are required to protect your data in
              accordance with applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">
              5. Data Protection
            </h2>
            <p>
              We take reasonable steps to protect your personal data from
              unauthorised access, use, or disclosure. Our website uses HTTPS
              encryption and we limit access to personal data to team members who
              need it to serve you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">
              6. Your Rights Under PDPA
            </h2>
            <p>
              Under Singapore&apos;s Personal Data Protection Act (PDPA), you
              have the right to:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                Access the personal data we hold about you
              </li>
              <li>
                Request correction of inaccurate data
              </li>
              <li>
                Withdraw consent for us to use your data (this may affect our
                ability to serve you)
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at the details below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">
              7. Cookies
            </h2>
            <p>
              Our website may use cookies and similar technologies to improve
              your browsing experience and analyse website traffic. You can
              control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">
              8. Contact Us
            </h2>
            <p>
              If you have questions about this privacy policy or wish to make a
              data request, please contact:
            </p>
            <div className="mt-3 bg-offwhite border border-gray-200 rounded-lg p-6 not-prose">
              <p className="font-semibold text-charcoal mb-1">Elfi Bin Abdullah</p>
              <p className="text-gray-600 mb-1">EastCondos.sg</p>
              <p className="text-gray-600 mb-1">
                Phone:{" "}
                <a
                  href="tel:+6596667496"
                  className="text-amber underline hover:opacity-80"
                >
                  +65 9666 7496
                </a>
              </p>
              <p className="text-gray-600">
                WhatsApp:{" "}
                <a
                  href="https://wa.me/6596667496"
                  className="text-amber underline hover:opacity-80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  wa.me/6596667496
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
