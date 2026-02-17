import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service – eastcondos.sg",
  description:
    "Terms of service for EastCondos.sg. Review our terms and conditions for using our property advisory services.",
};

export default function TermsPage() {
  return (
    <div>
      <div className="bg-sage-dark py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Terms of Service
        </h1>
        <p className="text-gray-300 mt-3 text-lg">
          Last updated: February 2026
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="prose prose-navy max-w-none space-y-8 text-body leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">
              1. Agreement to Terms
            </h2>
            <p>
              By accessing or using eastcondos.sg (the &ldquo;Site&rdquo;), you
              agree to be bound by these Terms of Service. If you do not agree
              to these terms, please do not use the Site or our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">
              2. Our Services
            </h2>
            <p>
              EastCondos.sg provides property advisory and consultation services
              for individuals looking to upgrade or invest in residential
              properties in East Singapore. Our services include property
              research, market insights, financial planning guidance, and
              personalised strategy sessions.
            </p>
            <p className="mt-3">
              <strong>Important:</strong> The information and recommendations
              provided by EastCondos.sg are general in nature and do not
              constitute financial, legal, or tax advice. All property
              investment decisions carry inherent risks. Clients should seek
              independent professional advice from licensed financial advisors,
              lawyers, or tax consultants before making any property purchase or
              investment decision.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">
              3. Strategy Session & Forms
            </h2>
            <p>
              When you fill in our Strategy Session form or provide information
              through other means, the data you submit is used solely to prepare
              your personalised property upgrade strategy and video
              consultation. We will use this information to calculate loan
              eligibility, CPF usage, and affordability estimates based on
              publicly available guidelines and industry standards.
            </p>
            <p className="mt-3">
              We do not guarantee specific outcomes, property availability,
              loan approvals, or investment returns. Market conditions, bank
              policies, and individual circumstances can change.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">
              4. Intellectual Property
            </h2>
            <p>
              All content on eastcondos.sg, including text, graphics, logos,
              images, videos, and software, is the property of EastCondos.sg or
              its content suppliers and is protected by Singapore and
              international copyright laws.
            </p>
            <p className="mt-3">
              You may not reproduce, distribute, modify, or create derivative
              works from any content on this Site without our prior written
              permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">
              5. Limitation of Liability
            </h2>
            <p>
              EastCondos.sg provides property advisory services on a best-effort
              basis. To the fullest extent permitted by law, we are not liable
              for:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                Investment losses or financial outcomes resulting from property
                decisions
              </li>
              <li>
                Changes in market conditions, interest rates, or government
                policies
              </li>
              <li>
                Actions or omissions by third parties, including developers,
                banks, and other service providers
              </li>
              <li>
                Errors or omissions in information obtained from third-party
                sources
              </li>
            </ul>
            <p className="mt-3">
              Your use of our services and reliance on any information provided
              is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">
              6. Third-Party Links
            </h2>
            <p>
              The Site may contain links to external websites or services,
              including YouTube, WhatsApp, booking platforms, and other tools.
              These links are provided for your convenience only. We do not
              control or endorse the content of third-party sites and are not
              responsible for their privacy practices, terms of service, or
              availability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">
              7. Governing Law
            </h2>
            <p>
              These Terms of Service are governed by and construed in accordance
              with the laws of Singapore. Any disputes arising from these terms
              or your use of the Site shall be subject to the exclusive
              jurisdiction of the courts of Singapore.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">
              8. Contact
            </h2>
            <p>
              If you have questions about these Terms of Service, please contact
              us at:
            </p>
            <div className="mt-3 bg-sage-light rounded-lg p-6">
              <p className="font-semibold text-navy">Elfi Bin Abdullah</p>
              <p>EastCondos.sg</p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+6588415991"
                  className="text-gold hover:text-gold-light"
                >
                  +65 8841 5991
                </a>
              </p>
              <p>
                WhatsApp:{" "}
                <a
                  href="https://wa.me/6588415991"
                  className="text-gold hover:text-gold-light"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  wa.me/6588415991
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
