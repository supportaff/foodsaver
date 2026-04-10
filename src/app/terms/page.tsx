export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Terms &amp; Conditions</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: April 2026</p>

      <div className="space-y-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using GiveSaver (&quot;Platform&quot;), you agree to be bound by these Terms &amp; Conditions.
            If you do not agree to these terms, please do not use the Platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">2. Nature of the Platform</h2>
          <p>
            GiveSaver is a discovery and coordination platform that facilitates connections between
            donors and recipients of surplus goods. GiveSaver does not take possession of, own,
            transport, or guarantee any donated items. All transactions are between donors and
            recipients directly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">3. Donor Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Donors must ensure all donated items are safe, hygienic, and fit for the intended use.</li>
            <li>Food donations must be fresh, properly stored, and within their safe consumption window.</li>
            <li>Clothing donations must be clean and in wearable condition.</li>
            <li>Books and educational materials must be complete and in usable condition.</li>
            <li>Donors must provide accurate descriptions, quantities, and pickup information.</li>
            <li>Donors are responsible for any harm caused by unsafe or misrepresented donations.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">4. Recipient Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Recipients (NGOs, volunteers, individuals) must verify item condition before accepting.</li>
            <li>Recipients should not claim donations they cannot collect within a reasonable timeframe.</li>
            <li>Recipients must coordinate pickup respectfully and professionally with donors.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">5. Prohibited Conduct</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Posting fake, misleading, or fraudulent donations.</li>
            <li>Donating expired, unsafe, or prohibited items.</li>
            <li>Using the platform for commercial resale of donated goods.</li>
            <li>Harassing, threatening, or misrepresenting to other users.</li>
            <li>Attempting to circumvent the platform for personal financial gain.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">6. Limitation of Liability</h2>
          <p>
            GiveSaver and its operators shall not be liable for any direct, indirect, incidental,
            or consequential damages arising from use of the Platform, including but not limited to
            illness from donated food, injury from donated goods, or disputes between donors and
            recipients.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">7. Intellectual Property</h2>
          <p>
            All content, branding, and design on GiveSaver is the property of GiveSaver and may
            not be reproduced without explicit permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">8. Modifications</h2>
          <p>
            GiveSaver reserves the right to modify these Terms at any time. Continued use of the
            Platform after changes constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">9. Governing Law</h2>
          <p>
            These Terms are governed by the laws of India. Any disputes shall be resolved in the
            courts of Chennai, Tamil Nadu.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">10. Contact</h2>
          <p>
            For questions regarding these Terms, please contact us at{' '}
            <a href="mailto:legal@givesaver.in" className="text-green-600 underline">legal@givesaver.in</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
