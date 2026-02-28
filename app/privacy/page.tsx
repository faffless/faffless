// app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Notice | FafflessVAT",
  description: "Privacy notice for fafflessvat.co.uk",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy Notice</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last updated: <span className="font-medium">[DD Month YYYY]</span>
      </p>

      <section className="mt-10 space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Who we are</h2>
          <p className="mt-2">
            This website (<span className="font-medium">fafflessvat.co.uk</span>)
            is operated by <span className="font-medium">[LEGAL BUSINESS NAME]</span>{" "}
            (“we”, “us”).
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>
              Email:{" "}
              <a className="underline" href="mailto:hello@fafflessvat.co.uk">
                hello@fafflessvat.co.uk
              </a>
            </li>
            <li>Address: <span className="font-medium">[GEOGRAPHIC ADDRESS]</span></li>
            <li>
              Company number (if applicable):{" "}
              <span className="font-medium">[COMPANY NUMBER]</span>
            </li>
            <li>
              VAT number (if applicable):{" "}
              <span className="font-medium">[VAT NUMBER]</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">What this notice covers</h2>
          <p className="mt-2">
            This notice explains what personal data we collect, how we use it,
            how long we keep it, and your rights under UK data protection law.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">What data we collect</h2>
          <p className="mt-2">
            The data we collect depends on how you use the site. It may include:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>
              <span className="font-medium">Information you enter into forms</span>{" "}
              (e.g., business/customer details, invoice lines, VAT numbers) to
              generate outputs.
            </li>
            <li>
              <span className="font-medium">Technical data</span> (e.g., IP address,
              device/browser type, pages viewed) used for security and basic
              performance monitoring.
            </li>
            <li>
              <span className="font-medium">Support emails</span> if you contact us.
            </li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            Remove any items above that you do not actually collect.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">How we use your data</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>To provide the tool and generate the files/outputs you request.</li>
            <li>To keep the website secure and prevent abuse.</li>
            <li>To respond to enquiries and provide support.</li>
            <li>
              To improve the service (e.g., understanding which pages are used most).
              <span className="text-sm text-muted-foreground">
                {" "}
                (Only if you use analytics.)
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Lawful basis</h2>
          <p className="mt-2">
            We process personal data under one or more of the following lawful bases
            (as applicable):
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>
              <span className="font-medium">Performance of a contract</span> — to
              provide the service you request.
            </li>
            <li>
              <span className="font-medium">Legitimate interests</span> — to operate,
              secure, and improve the website.
            </li>
            <li>
              <span className="font-medium">Legal obligation</span> — if we must keep
              certain records by law (if applicable).
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Invoice data processing and storage</h2>

          <div className="mt-2 rounded-lg border p-4">
            <p className="font-medium">Choose ONE of these and delete the other:</p>

            <div className="mt-3 space-y-3">
              <div>
                <p className="font-semibold">Option A — processed in-browser / not stored</p>
                <p className="mt-1">
                  Invoice drafts are processed in your browser to generate outputs.
                  We do <span className="font-medium">not</span> store invoice draft
                  content on our servers.
                </p>
              </div>

              <div>
                <p className="font-semibold">Option B — processed on our servers</p>
                <p className="mt-1">
                  Invoice details are sent to our servers to generate outputs.
                  We store invoice content for{" "}
                  <span className="font-medium">[RETENTION PERIOD]</span> and then delete it.
                  We do not sell your data.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            Important: only claim “in-browser / not stored” if it’s truly accurate.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Sharing and processors</h2>
          <p className="mt-2">
            We may use trusted service providers (processors) to run the site (e.g.,
            hosting, email). They only process data on our instructions.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>Hosting provider: <span className="font-medium">[e.g., Vercel / AWS]</span></li>
            <li>Email provider: <span className="font-medium">[e.g., Google Workspace]</span></li>
            <li>Analytics (if used): <span className="font-medium">[e.g., Plausible / GA]</span></li>
          </ul>
          <p className="mt-3">
            We do not sell personal data.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">International transfers</h2>
          <p className="mt-2">
            If any of our providers process data outside the UK, we ensure appropriate
            safeguards are in place (such as adequacy regulations or standard contractual
            clauses), where required.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Retention</h2>
          <p className="mt-2">
            We keep personal data only as long as necessary for the purposes described
            above.{" "}
            <span className="text-sm text-muted-foreground">
              (If you store invoice data, state a specific period.)
            </span>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Your rights</h2>
          <p className="mt-2">
            You may have rights to access, correct, delete, restrict or object to
            processing of your personal data, and to data portability (where applicable).
          </p>
          <p className="mt-2">
            To exercise your rights, email{" "}
            <a className="underline" href="mailto:hello@fafflessvat.co.uk">
              hello@fafflessvat.co.uk
            </a>.
          </p>
          <p className="mt-2">
            You can also complain to the UK Information Commissioner’s Office (ICO).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Cookies</h2>
          <p className="mt-2">
            We use essential cookies required for the site to function.{" "}
            <span className="text-sm text-muted-foreground">
              (If you use analytics or marketing cookies, explain and add consent where required.)
            </span>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Changes to this notice</h2>
          <p className="mt-2">
            We may update this notice from time to time. The latest version will always
            be posted on this page.
          </p>
        </div>
      </section>
    </main>
  );
}