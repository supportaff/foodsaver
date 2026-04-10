export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Disclaimer</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: April 2026</p>

      <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 mb-10 flex gap-3">
        <span className="text-2xl shrink-0">⚠️</span>
        <p className="text-amber-800 text-sm leading-relaxed">
          <strong>Important:</strong> GiveSaver is a coordination platform only. We do not
          physically handle, inspect, transport, or guarantee any donated items. Please read
          this disclaimer carefully before using the platform.
        </p>
      </div>

      <div className="space-y-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">No Warranty on Donations</h2>
          <p>
            GiveSaver makes no representations or warranties regarding the quality, safety,
            condition, or fitness of any donated items listed on the platform. All items are
            donated &quot;as-is&quot; and recipients accept full responsibility upon collection.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Food Safety</h2>
          <p>
            GiveSaver does not verify the safety, hygiene, or freshness of food donations.
            Recipients must independently assess food quality before consumption or distribution.
            GiveSaver is not responsible for illness, injury, or harm resulting from food donations.
            Always check expiry dates, storage conditions, and packaging before accepting food.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Clothing &amp; Books</h2>
          <p>
            While donors are expected to donate clean and usable items, GiveSaver does not inspect
            clothing or books. Recipients should inspect items upon receipt. Damaged or unsuitable
            items should be reported to GiveSaver support.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">No Transportation Service</h2>
          <p>
            GiveSaver does not provide pickup, delivery, or logistics services. All coordination
            for item collection is directly between the donor and the recipient. GiveSaver is not
            a party to these arrangements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Third-Party Users</h2>
          <p>
            GiveSaver does not conduct background checks or verification of all donors and
            recipients. Users should exercise reasonable caution during pickup interactions.
            Meet in public or accessible locations where possible.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Accuracy of Listings</h2>
          <p>
            GiveSaver does not independently verify the accuracy of donation listings. Descriptions,
            quantities, and expiry information are provided by donors. Recipients should confirm
            details with the donor before making a trip for pickup.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, GiveSaver and its team shall not
            be held liable for any loss, damage, illness, or injury arising from the use of this
            platform or from donated items. Your use of GiveSaver is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Contact Us</h2>
          <p>
            If you have concerns about a listing or experience any issue,
            contact us at{' '}
            <a href="mailto:support@givesaver.in" className="text-green-600 underline">support@givesaver.in</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
