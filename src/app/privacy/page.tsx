export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: April 2026</p>

      <div className="space-y-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Information We Collect</h2>
          <p>
            GiveSaver currently operates as a static demonstration platform. In a live version,
            we would collect your name, contact number, address, and donation details solely for
            the purpose of facilitating donation matching.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">How We Use It</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To display your donation listing to potential recipients</li>
            <li>To coordinate pickup communication between donors and recipients</li>
            <li>To improve the platform and prevent abuse</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Data Sharing</h2>
          <p>
            We do not sell your data. Contact information is shared only with verified NGOs and
            volunteers who claim your donation, and only for coordination purposes.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Your Rights</h2>
          <p>
            You may request deletion or correction of your data at any time by contacting
            us at <a href="mailto:privacy@givesaver.in" className="text-green-600 underline">privacy@givesaver.in</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
