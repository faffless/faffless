// app/security/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security | faffless",
  description: "How faffless handles security for invoice data and site access.",
};

export default function SecurityPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-black tracking-tight text-black/85">Security</h1>

      <p className="mt-4 text-sm font-semibold text-black/55">
        Last updated: <span className="font-bold text-black/70">02 March 2026</span>
      </p>

      <div className="mt-8 rounded-2xl border border-black/10 bg-white/70 p-5 text-sm font-semibold text-black/70 leading-6">
        This page explains the practical steps we take to keep the site secure and reduce the risk of misuse.
        No internet service is 100% secure, but we aim to follow sensible defaults and minimise exposure.
      </div>

      <section className="mt-10 space-y-10">
        <div>
          <h2 className="text-xl font-black text-black/80">How invoice data is handled</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-black/70">
            <li>
              Invoice drafts are created in your browser. When you click{" "}
              <span className="font-bold">Download e-invoice XML</span> or{" "}
              <span className="font-bold">Download PDF</span>, the invoice data is sent to the server to generate the
              file and return it to your browser.
            </li>
            <li>
              We aim to avoid storing invoice content after generation is complete, except where needed briefly for
              security, troubleshooting, or legal obligations.
            </li>
            <li>
              Avoid entering sensitive information that does not belong on an invoice (for example: passwords, full bank
              login details, or personal ID documents).
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-black text-black/80">Transport security (HTTPS)</h2>
          <p className="mt-2 text-black/70 leading-6">
            The site is served over HTTPS where supported by our hosting provider, which helps protect data in transit
            between your browser and our servers.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-black text-black/80">Access control and abuse prevention</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-black/70">
            <li>We monitor for suspicious activity and may block abusive traffic.</li>
            <li>We may apply rate limits to protect the service from automated misuse.</li>
            <li>We keep software dependencies updated where practical.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-black text-black/80">Data minimisation</h2>
          <p className="mt-2 text-black/70 leading-6">
            We try to collect and retain as little data as possible. If we add analytics, we aim to use privacy-friendly
            settings and keep data for a limited period.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-black text-black/80">Your role in security</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-black/70">
            <li>Double-check invoice details before sending to customers.</li>
            <li>Use a trusted device and keep your browser updated.</li>
            <li>
              Be careful when sharing PDFs/XML files (they may include addresses, VAT numbers, and payment details).
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-black text-black/80">Reporting a security issue</h2>
          <p className="mt-2 text-black/70 leading-6">
            If you think you’ve found a security issue, please email{" "}
            <a className="underline" href="mailto:hello@fafflessvat.co.uk">
              hello@fafflessvat.co.uk
            </a>{" "}
            with details (what you saw, steps to reproduce, and screenshots if helpful). We appreciate responsible
            disclosure and will investigate as quickly as possible.
          </p>

          <div className="mt-4 rounded-2xl border border-black/10 bg-white/70 p-4 text-sm font-semibold text-black/65 leading-6">
            Please do not include real customer personal data in your report. If possible, use dummy/test details.
          </div>
        </div>

        <div className="pt-2">
          <div className="flex flex-wrap gap-4 text-sm font-bold text-black/60">
            <a className="underline" href="/">
              Home
            </a>
            <a className="underline" href="/privacy">
              Privacy
            </a>
            <a className="underline" href="/terms">
              Terms
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