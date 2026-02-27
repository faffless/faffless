import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen w-full">
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Background */}
        <Image
          src="/branding/faffless-bg.png"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/35" />

        {/* Content */}
        <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center px-6 pb-16 pt-10 text-center sm:pt-12 md:pt-14">
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

            {/* Primary CTA */}
            <div className="mt-6 flex flex-col items-center gap-3">
              <a
                href="mailto:hello@fafflessvat.co.uk?subject=FAFFLESSVAT%20Early%20Access&body=Hi%2C%20please%20add%20me%20to%20early%20access.%0A%0AName%3A%0ABusiness%3A%0AWhat%20are%20you%20trying%20to%20do%3F%20(e.g.%20send%20to%20public%20sector%2C%20export%20XML%2C%20reduce%20admin)%0A"
                className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-4 text-sm font-extrabold tracking-wide text-white shadow-[0_14px_40px_rgba(0,0,0,0.18)] transition hover:opacity-95 active:opacity-90 sm:text-base"
              >
                Launching soon. Join our mailing list.
              </a>
            </div>
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
                  <summary className="relative cursor-pointer list-none px-6 py-5 font-extrabold text-black/80 hover:bg-white/30 transition">
                    <span className="block w-full text-center">
                      What is e-invoicing?
                    </span>
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-black/40 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <div className="px-6 pb-6 -mt-2 text-sm font-semibold text-black/65 leading-relaxed">
                    <p className="mt-3">
                      An <strong>e-invoice</strong> is an invoice in a <strong>structured</strong> format that software can
                      read automatically (often XML). The point is: less re-typing, fewer errors, faster processing.
                    </p>

                    <div className="mt-4 rounded-2xl border border-black/10 bg-white/60 p-4">
                      <p className="text-xs sm:text-sm font-semibold text-black/60">
                        Important: A PDF or Word invoice is mainly for humans. It’s useful, but it’s not the same thing as
                        an e-invoice in a structured format.
                      </p>
                    </div>

                    <h3 className="mt-5 font-extrabold text-black/75">Why “structured” matters</h3>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      <li>Software can validate totals and VAT calculations automatically.</li>
                      <li>Buyers can process invoices faster (less back-and-forth).</li>
                      <li>Cleaner records: line items, VAT rates, and dates are machine-readable.</li>
                    </ul>
                  </div>
                </details>

                <div className="border-t border-black/10" />

                {/* Row 2 */}
                <details className="group">
                  <summary className="relative cursor-pointer list-none px-6 py-5 font-extrabold text-black/80 hover:bg-white/30 transition">
                    <span className="block w-full text-center">
                      What the UK government is saying
                    </span>
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-black/40 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <div className="px-6 pb-6 -mt-2 text-sm font-semibold text-black/65 leading-relaxed">
                    <p className="mt-3">
                      The government has published a response about promoting e-invoicing across UK businesses and the
                      public sector. The themes are pretty consistent:
                    </p>

                    <ul className="mt-3 list-disc pl-5 space-y-1">
                      <li>
                        E-invoicing is seen as a way to improve efficiency, reduce manual work, and reduce errors.
                      </li>
                      <li>
                        Interoperability matters: e-invoicing works best when systems can “talk” to each other.
                      </li>
                      <li>
                        The direction of travel is toward wider adoption across supply chains, especially where VAT invoices
                        are common (B2B / B2G).
                      </li>
                      <li>
                        Support, education, and clear standards are repeatedly highlighted as important for SMEs.
                      </li>
                    </ul>

                    <div className="mt-5 rounded-2xl border border-black/10 bg-white/60 p-4">
                      <p className="text-xs sm:text-sm font-semibold text-black/60">
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
                  <summary className="relative cursor-pointer list-none px-6 py-5 font-extrabold text-black/80 hover:bg-white/30 transition">
                    <span className="block w-full text-center">
                      What this means for small businesses (practical)
                    </span>
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-black/40 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <div className="px-6 pb-6 -mt-2 text-sm font-semibold text-black/65 leading-relaxed">
                    <p className="mt-3">
                      You don’t need to become an XML expert. The useful bit is getting your invoice info consistent and
                      “software-friendly”.
                    </p>

                    <h3 className="mt-5 font-extrabold text-black/75">A quick prep checklist</h3>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      <li>
                        Use a <strong>unique invoice number</strong> every time.
                      </li>
                      <li>
                        Store your <strong>customer details</strong> properly (name, address, VAT number if applicable).
                      </li>
                      <li>
                        Keep <strong>line items</strong> clean: description, quantity, unit price, line total.
                      </li>
                      <li>
                        Track <strong>VAT per line</strong> (rate + VAT amount), not just a single VAT total at the end.
                      </li>
                      <li>
                        Capture key dates: <strong>invoice date</strong> (and supply/tax point date if different).
                      </li>
                      <li>
                        If you sell to bigger organisations or public sector, ask: “Do you accept structured e-invoices or
                        Peppol?”
                      </li>
                    </ul>

                    <div className="mt-5 rounded-2xl border border-black/10 bg-white/60 p-4">
                      <p className="text-xs sm:text-sm font-semibold text-black/60">
                        Real-world example: builders, restaurants, trades, consultants — everyone benefits from cleaner
                        invoice data because it reduces “Can you resend it?” emails and speeds up approvals.
                      </p>
                    </div>
                  </div>
                </details>

                <div className="border-t border-black/10" />

                {/* Row 4 */}
                <details className="group">
                  <summary className="relative cursor-pointer list-none px-6 py-5 font-extrabold text-black/80 hover:bg-white/30 transition">
                    <span className="block w-full text-center">
                      FAQ
                    </span>
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-black/40 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <div className="px-6 pb-6 -mt-2 text-sm font-semibold text-black/65 leading-relaxed">
                    <div className="mt-3 space-y-4">
                      <div>
                        <p className="font-extrabold text-black/75">Is a PDF an e-invoice?</p>
                        <p>
                          No. A PDF is readable by humans. E-invoicing normally means a <strong>structured</strong>{" "}
                          invoice that accounting systems can process automatically.
                        </p>
                      </div>

                      <div>
                        <p className="font-extrabold text-black/75">What is “invoice XML”?</p>
                        <p>
                          XML is one common way to store structured invoice data. Think of it like “labels” around each
                          piece of info: customer name, VAT rate, totals, line items — so software can pick it up reliably.
                        </p>
                      </div>

                      <div>
                        <p className="font-extrabold text-black/75">Do I need Peppol?</p>
                        <p>
                          Not always. Some organisations (especially in public sector supply chains) use networks like
                          Peppol to exchange e-invoices. Others may accept a structured file via portal or software import.
                        </p>
                      </div>

                      <div>
                        <p className="font-extrabold text-black/75">Is the UK changing how invoicing works?</p>
                        <p>
                          The UK is clearly moving toward wider e-invoicing adoption, with work on standards, interoperability,
                          and guidance. If you’re keeping your invoice data tidy, you’re already ahead.
                        </p>
                      </div>
                    </div>
                  </div>
                </details>

                <div className="border-t border-black/10" />

                {/* SEO/About */}
                <details className="group">
                  <summary className="relative cursor-pointer list-none px-6 py-5 font-extrabold text-black/80 hover:bg-white/30 transition">
                    <span className="block w-full text-center">About</span>
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-black/40 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <div className="px-6 pb-6 -mt-2 text-sm font-semibold text-black/65 leading-relaxed">
                    <p className="mt-3">
                      fafflessVAT.co.uk and nofaffVAT.co.uk is a UK-focused <strong>e-invoicing</strong> and <strong>invoice XML</strong> education
                      page that will soon be able to provide a free <strong>e-invoice XML generator</strong> for all businesses, contractors,
                      sole traders, and growing teams. If you need help with{" "}
                      <strong>UK e-invoicing</strong>, <strong>an invoice XML generator</strong>, <strong>Peppol invoicing UK</strong>,
                      or <strong>electronic invoicing</strong>, you’re in the right place.
                    </p>

                    <h3 className="mt-5 font-extrabold text-black/75">How fafflessVAT is helping users:</h3>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      <li>e-invoicing UK</li>
                      <li>electronic invoicing UK</li>
                      <li>invoice XML generator</li>
                      <li>UK invoice XML</li>
                      <li>Peppol invoice UK</li>
                      <li>UBL invoice / UBL XML invoice</li>
                      <li>BIS Billing 3.0 invoice</li>
                      <li>NHS e-invoicing / public sector e-invoice</li>
                      <li>send e-invoice to government / B2G e-invoicing</li>
                      <li>reduce late payments invoicing</li>
                      <li>builder invoice UK / construction invoice / CIS invoice</li>
                      <li>restaurant invoice template / hospitality invoicing</li>
                      <li>plumber invoice / electrician invoice / trades invoice</li>
                      <li>consultant invoice / freelancer VAT invoice</li>
                      <li>invoice data format / structured invoice data</li>
                    </ul>

                    <h3 className="mt-5 font-extrabold text-black/75">Mini FAQ</h3>
                    <div className="mt-2 space-y-3">
                      <p>
                        <strong>What is an e-invoice?</strong> A structured invoice that software can read automatically (often
                        XML), so the buyer can process it without manual typing.
                      </p>
                      <p>
                        <strong>What is Peppol?</strong> A network/spec used for exchanging structured procurement documents,
                        including e-invoices, used widely in public sector supply chains.
                      </p>
                      <p>
                        <strong>What’s the difference between invoice XML and PDF?</strong> PDF is visual; XML is structured
                        data for systems.
                      </p>
                      <p>
                        <strong>Who is this relevant for?</strong> Everyone who invoices: builders, restaurants, trades,
                        agencies, consultants, and any VAT-registered business doing B2B or B2G work.
                      </p>
                    </div>

                    <div className="mt-5 rounded-2xl border border-black/10 bg-white/60 p-4">
                      <p className="text-xs sm:text-sm font-semibold text-black/60">
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
      </div>
    </main>
  );
}