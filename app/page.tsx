import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-[100svh] w-full">
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col items-center px-6 pb-16 pt-10 text-center sm:pt-12 md:pt-14">
        {/* Hero */}
        <div className="w-full max-w-3xl">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/branding/faffless-lockup26.png"
              alt="FAFFLESSVAT"
              width={1200}
              height={400}
              priority
              className="h-auto w-[300px] drop-shadow-[0_10px_22px_rgba(0,0,0,0.14)] sm:w-[420px] md:w-[520px]"
            />
          </div>

          <h1 className="mt-2 text-[22px] font-black leading-[1.2] tracking-tight text-black/82 sm:text-[28px] md:text-[40px]">
            Free E-invoice Generator
          </h1>

          <p className="mt-4 text-[12px] font-semibold leading-snug text-black/66 sm:text-[15px] md:text-[17px]">
            UK mandatory e-invoicing arrives for all VAT-registered businesses in April 2029.
            <br />
            Easily create one for sending via peppol/endpoint using fafflessVAT.co.uk
          </p>

          {/* Small “chips” row */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {[
              "Free",
              "XML (structured)",
              "PDF optional",
              "Peppol-ready",
              "Made for UK VAT",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border border-black/10 bg-white/60 px-3 py-1 text-[11px] font-extrabold text-black/60 shadow-[0_6px_18px_rgba(0,0,0,0.05)]"
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          {/* CTAs */}
<div className="mt-6 flex flex-col items-center gap-3">
  <a
    href="/create"
    className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-4 text-sm font-extrabold tracking-wide text-white shadow-[0_14px_40px_rgba(0,0,0,0.18)] transition hover:opacity-95 active:opacity-90 sm:text-base"
  >
    Try it out →
  </a>
</div>

          <p className="mt-3 text-[11px] font-semibold text-black/55">
            No signup. Just generate and export.
          </p>
        </div>

        {/* Educational accordion */}
        <section className="mt-8 w-full max-w-3xl text-left">
          <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <div className="px-6 py-5 text-center">
              <h2 className="text-sm font-extrabold tracking-tight text-black/80 sm:text-base">
                UK E-invoicing in a nutshell:
              </h2>
              <p className="mt-1 text-xs font-semibold text-black/60 sm:text-sm">
                (Official Guidance but in Plain-English)
              </p>
            </div>

            <div className="border-t border-black/10">
              {/* Row 1 */}
              <details className="group">
                <summary className="relative cursor-pointer list-none px-6 py-5 font-extrabold text-black/80 transition hover:bg-white/30">
                  <span className="block w-full text-center">What is e-invoicing?</span>
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-black/40 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="px-6 pb-6 -mt-2 text-sm font-semibold text-black/65 leading-relaxed">
                  <p className="mt-3">
                    An <strong>e-invoice</strong> is an invoice in a{" "}
                    <strong>structured</strong> format that software can read automatically
                    (often XML). The point is: less re-typing, fewer errors, faster processing.
                  </p>

                  <div className="mt-4 rounded-2xl border border-black/10 bg-white/60 p-4">
                    <p className="text-xs font-semibold text-black/60 sm:text-sm">
                      Important: A PDF or Word invoice is mainly for humans. It’s useful, but it’s
                      not the same thing as an e-invoice in a structured format.
                    </p>
                  </div>

                  <h3 className="mt-5 font-extrabold text-black/75">Why “structured” matters</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    <li>Software can validate totals and VAT calculations automatically.</li>
                    <li>Buyers can process invoices faster (less back-and-forth).</li>
                    <li>Cleaner records: line items, VAT rates, and dates are machine-readable.</li>
                  </ul>
                </div>
              </details>

              <div className="border-t border-black/10" />

              {/* Row 2 */}
              <details className="group">
                <summary className="relative cursor-pointer list-none px-6 py-5 font-extrabold text-black/80 transition hover:bg-white/30">
                  <span className="block w-full text-center">What the UK government is saying</span>
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-black/40 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="px-6 pb-6 -mt-2 text-sm font-semibold text-black/65 leading-relaxed">
                  <p className="mt-3">
                    The government has published a response about promoting e-invoicing across UK
                    businesses and the public sector. The themes are pretty consistent:
                  </p>

                  <ul className="mt-3 list-disc space-y-1 pl-5">
                    <li>E-invoicing is seen as a way to improve efficiency and reduce errors.</li>
                    <li>Interoperability matters: systems should “talk” to each other.</li>
                    <li>Direction of travel is toward wider adoption across supply chains.</li>
                    <li>Support, education, and clear standards for SMEs are highlighted.</li>
                  </ul>

                  <div className="mt-5 rounded-2xl border border-black/10 bg-white/60 p-4">
                    <p className="text-xs font-semibold text-black/60 sm:text-sm">
                      Official page (recommended reading):{" "}
                      <a
                        className="underline"
                        href="https://www.gov.uk/government/consultations/promoting-electronic-invoicing-across-uk-businesses-and-the-public-sector/outcome/promoting-electronic-invoicing-across-uk-businesses-and-the-public-sector-consultation-response"
                        target="_blank"
                        rel="noreferrer"
                      >
                        GOV.UK — consultation response on promoting electronic invoicing
                      </a>
                    </p>
                  </div>
                </div>
              </details>

              <div className="border-t border-black/10" />

              {/* Row 3 */}
              <details className="group">
                <summary className="relative cursor-pointer list-none px-6 py-5 font-extrabold text-black/80 transition hover:bg-white/30">
                  <span className="block w-full text-center">
                    What this means for small businesses (practical)
                  </span>
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-black/40 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="px-6 pb-6 -mt-2 text-sm font-semibold text-black/65 leading-relaxed">
                  <p className="mt-3">
                    You don’t need to become an XML expert. The useful bit is getting your invoice
                    info consistent and “software-friendly”.
                  </p>

                  <h3 className="mt-5 font-extrabold text-black/75">A quick prep checklist</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    <li>Use a <strong>unique invoice number</strong> every time.</li>
                    <li>Store <strong>customer details</strong> properly (name, address, VAT no.).</li>
                    <li>Keep <strong>line items</strong> clean: description, qty, unit price, totals.</li>
                    <li>Track <strong>VAT per line</strong> (rate + VAT amount), not just one total.</li>
                    <li>Capture key dates: <strong>invoice date</strong> (and tax point if different).</li>
                    <li>If you sell B2G/B2B: ask if they accept structured invoices / Peppol.</li>
                  </ul>

                  <div className="mt-5 rounded-2xl border border-black/10 bg-white/60 p-4">
                    <p className="text-xs font-semibold text-black/60 sm:text-sm">
                      Real-world example: builders, restaurants, trades, consultants — everyone
                      benefits from cleaner invoice data because it reduces “Can you resend it?”
                      emails and speeds up approvals.
                    </p>
                  </div>
                </div>
              </details>

              <div className="border-t border-black/10" />

              {/* Row 4 */}
              <details className="group">
                <summary className="relative cursor-pointer list-none px-6 py-5 font-extrabold text-black/80 transition hover:bg-white/30">
                  <span className="block w-full text-center">FAQ</span>
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-black/40 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="px-6 pb-6 -mt-2 text-sm font-semibold text-black/65 leading-relaxed">
                  <div className="mt-3 space-y-4">
                    <div>
                      <p className="font-extrabold text-black/75">Is a PDF an e-invoice?</p>
                      <p>
                        No. A PDF is readable by humans. E-invoicing normally means a{" "}
                        <strong>structured</strong> invoice that accounting systems can process automatically.
                      </p>
                    </div>

                    <div>
                      <p className="font-extrabold text-black/75">What is “invoice XML”?</p>
                      <p>
                        XML is one common way to store structured invoice data. Think of it like “labels”
                        around each piece of info so software can pick it up reliably.
                      </p>
                    </div>

                    <div>
                      <p className="font-extrabold text-black/75">Do I need Peppol?</p>
                      <p>
                        Not always. Some organisations use networks like Peppol to exchange e-invoices.
                        Others accept structured files via portals or imports.
                      </p>
                    </div>

                    <div>
                      <p className="font-extrabold text-black/75">Is the UK changing how invoicing works?</p>
                      <p>
                        The UK is moving toward wider e-invoicing adoption, with standards and guidance.
                        If your invoice data is tidy, you’re already ahead.
                      </p>
                    </div>
                  </div>
                </div>
              </details>

              <div className="border-t border-black/10" />

              {/* About */}
              <details className="group">
                <summary className="relative cursor-pointer list-none px-6 py-5 font-extrabold text-black/80 transition hover:bg-white/30">
                  <span className="block w-full text-center">About</span>
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-black/40 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="px-6 pb-6 -mt-2 text-sm font-semibold text-black/65 leading-relaxed">
                  <p className="mt-3">
                    fafflessVAT.co.uk and nofaffVAT.co.uk is a UK-focused{" "}
                    <strong>e-invoicing</strong> and <strong>invoice XML</strong> education page that will soon provide a free{" "}
                    <strong>e-invoice XML generator</strong>.
                  </p>

                  <div className="mt-5 rounded-2xl border border-black/10 bg-white/60 p-4">
                    <p className="text-xs font-semibold text-black/60 sm:text-sm">
                      Note: This page is educational and general guidance — it isn’t tax advice.
                    </p>
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-black/55">
                    <li>UK e-invoice XML</li>
                    <li>Invoice XML generator</li>
                    <li>Electronic invoicing UK</li>
                    <li>Peppol invoice UK</li>
                    <li>UBL invoice XML</li>
                    <li>Public sector e-invoicing</li>
                    <li>NHS invoicing</li>
                    <li>VAT invoice UK</li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* Contact */}
        <p className="mt-7 text-xs font-semibold text-black/55">
          Contact:{" "}
          <a className="underline" href="mailto:hello@fafflessvat.co.uk">
            hello@fafflessvat.co.uk
          </a>
        </p>
      </div>
    </main>
  );
}