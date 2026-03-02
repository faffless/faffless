// app/terms/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | faffless",
  description: "Terms of use for the faffless e-invoice generator.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-black tracking-tight text-black/85">Terms of Use</h1>

      <p className="mt-4 text-sm font-semibold text-black/55">
        Last updated: <span className="font-bold text-black/70">02 March 2026</span>
      </p>

      <div className="mt-8 rounded-2xl border border-black/10 bg-white/70 p-5 text-sm font-semibold text-black/70 leading-6">
        These terms explain how you may use the faffless website and e-invoice generator (the “Service”).
        By using the Service, you agree to these Terms.
      </div>

      <section className="mt-10 space-y-10">
        <div>
          <h2 className="text-xl font-black text-black/80">1) Who we are</h2>
          <p className="mt-2 text-black/70 leading-6">
            The Service is operated by <span className="font-bold">YOUR LEGAL NAME / BUSINESS NAME</span> (“we”, “us”).
            <br />
            Contact:{" "}
            <a className="underline" href="mailto:hello@fafflessvat.co.uk">
              hello@fafflessvat.co.uk
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-black text-black/80">2) What the Service does</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-black/70">
            <li>
              Lets you enter invoice details and generate output files such as{" "}
              <span className="font-bold">e-invoice XML</span> and an optional{" "}
              <span className="font-bold">PDF</span>.
            </li>
            <li>
              The preview page is a{" "}
              <span className="font-bold">visual draft</span> to help you check your data.
            </li>
            <li>
              Any “Transmit e-invoice” messaging is{" "}
              <span className="font-bold">not a live sending feature</span> unless clearly stated on the site.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-black text-black/80">3) Your responsibilities</h2>
          <p className="mt-2 text-black/70 leading-6">
            You are responsible for the accuracy of any invoice you create using the Service.
            Before sending an invoice to a customer, you should check:
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-black/70">
            <li>Names, addresses, invoice numbers and dates</li>
            <li>Amounts, VAT rates, VAT amounts and totals</li>
            <li>Payment details and references</li>
            <li>Whether your customer requires a specific invoice format or delivery method</li>
          </ul>

          <div className="mt-4 rounded-2xl border border-black/10 bg-white/70 p-4 text-sm font-semibold text-black/65 leading-6">
            <span className="font-bold text-black/75">Important:</span> This Service provides general tools and
            educational information. It is not accounting, tax, or legal advice.
          </div>
        </div>

        <div>
          <h2 className="text-xl font-black text-black/80">4) Acceptable use</h2>
          <p className="mt-2 text-black/70 leading-6">
            You must not misuse the Service. For example, you must not:
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-black/70">
            <li>Use it for unlawful, fraudulent, or misleading activity</li>
            <li>Attempt to break, overload, scrape, or reverse engineer the site</li>
            <li>Upload or enter content you do not have the right to use</li>
            <li>Send malware or attempt to access systems you do not own</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-black text-black/80">5) Availability and changes</h2>
          <p className="mt-2 text-black/70 leading-6">
            We may update, change, suspend, or stop the Service at any time. We do not guarantee
            that the Service will be available at all times or that it will always be error-free.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-black text-black/80">6) Privacy</h2>
          <p className="mt-2 text-black/70 leading-6">
            Our{" "}
            <a className="underline" href="/privacy">
              Privacy Notice
            </a>{" "}
            explains how we handle personal data when you use the Service.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-black text-black/80">7) Intellectual property</h2>
          <p className="mt-2 text-black/70 leading-6">
            We own the website and branding, and you must not copy or reuse them without permission.
            You keep ownership of the invoice content you enter.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-black text-black/80">8) Liability</h2>
          <p className="mt-2 text-black/70 leading-6">
            We provide the Service “as is”. To the fullest extent permitted by law, we are not liable
            for losses or damages arising from your use of the Service, including (for example) sending
            incorrect invoices, VAT mistakes, missed payments, or lost profits.
          </p>

          <div className="mt-4 rounded-2xl border border-black/10 bg-white/70 p-4 text-sm font-semibold text-black/65 leading-6">
            Nothing in these Terms limits liability where it would be unlawful to do so (for example,
            for fraud or for death/personal injury caused by negligence).
          </div>
        </div>

        <div>
          <h2 className="text-xl font-black text-black/80">9) Governing law</h2>
          <p className="mt-2 text-black/70 leading-6">
            These Terms are governed by the laws of <span className="font-bold">England and Wales</span>,
            and the courts of England and Wales have exclusive jurisdiction.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-black text-black/80">10) Contact</h2>
          <p className="mt-2 text-black/70 leading-6">
            Questions about these Terms? Email{" "}
            <a className="underline" href="mailto:hello@fafflessvat.co.uk">
              hello@fafflessvat.co.uk
            </a>
            .
          </p>
        </div>

        <div className="pt-2">
          <div className="flex flex-wrap gap-4 text-sm font-bold text-black/60">
            <a className="underline" href="/">
              Home
            </a>
            <a className="underline" href="/privacy">
              Privacy
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