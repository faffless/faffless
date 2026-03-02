// app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Notice | faffless",
  description: "Privacy notice for faffless (e-invoice generator).",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-black tracking-tight text-black/85">Privacy Notice</h1>

      <p className="mt-4 text-sm font-semibold text-black/55">
        Last updated: <span className="font-bold text-black/70">02 March 2026</span>
      </p>

      <div className="mt-8 rounded-2xl border border-black/10 bg-white/70 p-5 text-sm font-semibold text-black/70 leading-6">
        This notice explains how we handle personal data when you use the faffless website and
        e-invoice generator.
      </div>

      <section className="mt-10 space-y-10">
        {/* Who we are */}
        <div>
          <h2 className="text-xl font-black text-black/80">Who we are</h2>
          <p className="mt-2 text-black/70 leading-6">
            This website is operated by <span className="font-bold">fafflessvat.co.uk / fafflessvat.co.uk</span>{" "}
            (“we”, “us”, “our”).
          </p>

          <ul className="mt-4 list-disc pl-6 space-y-2 text-black/70">
            <li>
              Email:{" "}
              <a className="underline" href="mailto:hello@fafflessvat.co.uk">
                hello@fafflessvat.co.uk
              </a>
            </li>
            <li>
              Address: <span className="font-bold">fafflessvat.co.uk</span>
            </li>
            </ul>
        </div>

        {/* What we collect */}
        <div>
          <h2 className="text-xl font-black text-black/80">What data we collect</h2>
          <p className="mt-2 text-black/70 leading-6">
            The data we collect depends on how you use the site. It may include:
          </p>

          <ul className="mt-4 list-disc pl-6 space-y-2 text-black/70">
            <li>
              <span className="font-bold">Invoice details you enter</span> (for example: business/customer
              name, address, VAT number, invoice number, line items, totals).
            </li>
            <li>
              <span className="font-bold">Technical data</span> such as IP address and browser/device
              information (used for security and basic performance).
            </li>
            <li>
              <span className="font-bold">Support emails</span> if you contact us.
            </li>
          </ul>
        </div>

        {/* What we do with it */}
        <div>
          <h2 className="text-xl font-black text-black/80">How we use your data</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 text-black/70">
            <li>To provide the tool and generate the XML/PDF outputs you request.</li>
            <li>To keep the website secure and prevent abuse.</li>
            <li>To respond to enquiries and provide support.</li>
            <li>
              To improve the service (for example, understanding which pages are used most){" "}
              <span className="text-black/55">(only if we run analytics).</span>
            </li>
          </ul>
        </div>

        {/* Lawful basis */}
        <div>
          <h2 className="text-xl font-black text-black/80">Lawful basis (UK GDPR)</h2>
          <p className="mt-2 text-black/70 leading-6">
            We process personal data under one or more of the following lawful bases (as applicable):
          </p>

          <ul className="mt-4 list-disc pl-6 space-y-2 text-black/70">
            <li>
              <span className="font-bold">Performance of a contract</span> — to provide the service you request.
            </li>
            <li>
              <span className="font-bold">Legitimate interests</span> — to operate, secure, and improve the website.
            </li>
            <li>
              <span className="font-bold">Legal obligation</span> — if we must keep certain records by law (if applicable).
            </li>
          </ul>
        </div>

        {/* Invoice data processing */}
        <div>
          <h2 className="text-xl font-black text-black/80">Invoice data processing</h2>

          <div className="mt-3 rounded-2xl border border-black/10 bg-white/70 p-5 text-black/70 leading-6">
            <p className="font-bold text-black/80">How your invoice data is used</p>
            <p className="mt-2">
              When you click <span className="font-bold">Download e-invoice XML</span> or{" "}
              <span className="font-bold">Download PDF</span>, the invoice details you entered are sent to our servers
              to generate the file and return it to your browser.
            </p>

            <p className="mt-3">
              <span className="font-bold">Retention:</span>{" "}
              We do not store invoice content after file generation is complete, except where needed briefly for
              security, troubleshooting, or to comply with legal obligations.
            </p>

            <p className="mt-3 text-sm text-black/55">
              If you decide to store invoice drafts in the future (for example, user accounts or saved drafts), this
              notice will be updated to reflect the retention period and purpose.
            </p>
          </div>
        </div>

        {/* Sharing / processors */}
        <div>
          <h2 className="text-xl font-black text-black/80">Sharing and service providers</h2>
          <p className="mt-2 text-black/70 leading-6">
            We may use trusted service providers (processors) to run the site (for example hosting and email). They only
            process data on our instructions.
          </p>

          <ul className="mt-4 list-disc pl-6 space-y-2 text-black/70">
            <li>
              Hosting provider: <span className="font-bold">Vercel</span>
            </li>
            <li>
              Email provider: <span className="font-bold">fafflessvat.co.uk</span>
            </li>
            <li>
              Analytics (if used): <span className="font-bold">fafflessvat.co.uk</span>
            </li>
          </ul>

          <p className="mt-3 text-black/70 leading-6">
            We do <span className="font-bold">not</span> sell personal data.
          </p>
        </div>

        {/* International transfers */}
        <div>
          <h2 className="text-xl font-black text-black/80">International transfers</h2>
          <p className="mt-2 text-black/70 leading-6">
            Some providers may process data outside the UK. Where required, we use appropriate safeguards (such as UK
            adequacy regulations or standard contractual clauses).
          </p>
        </div>

        {/* Security */}
        <div>
          <h2 className="text-xl font-black text-black/80">Security</h2>
          <p className="mt-2 text-black/70 leading-6">
            We take reasonable technical and organisational measures to protect personal data. No internet service is
            completely secure, but we aim to minimise risk and prevent misuse.
          </p>
        </div>

        {/* Cookies */}
        <div>
          <h2 className="text-xl font-black text-black/80">Cookies</h2>
          <p className="mt-2 text-black/70 leading-6">
            We do not use cookies
          </p>
        </div>

        {/* Rights */}
        <div>
          <h2 className="text-xl font-black text-black/80">Your rights</h2>
          <p className="mt-2 text-black/70 leading-6">
            You may have rights to access, correct, delete, restrict or object to processing of your personal data, and
            to data portability (where applicable).
          </p>

          <p className="mt-2 text-black/70 leading-6">
            To exercise your rights, email{" "}
            <a className="underline" href="mailto:hello@fafflessvat.co.uk">
              hello@fafflessvat.co.uk
            </a>
            .
          </p>

          <p className="mt-2 text-black/70 leading-6">
            You can also complain to the UK Information Commissioner’s Office (ICO).
          </p>
        </div>

        {/* Changes */}
        <div>
          <h2 className="text-xl font-black text-black/80">Changes to this notice</h2>
          <p className="mt-2 text-black/70 leading-6">
            We may update this notice from time to time. The latest version will always be posted on this page.
          </p>
        </div>

        {/* Back links */}
        <div className="pt-2">
          <div className="flex flex-wrap gap-4 text-sm font-bold text-black/60">
            <a className="underline" href="/">
              Home
            </a>
            <a className="underline" href="/terms">
              Terms
            </a>
            <a className="underline" href="/security">
              Security
            </a>
            <a className="underline" href="/contact">
              Contact
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}