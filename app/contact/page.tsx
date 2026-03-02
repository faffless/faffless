// app/contact/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | faffless",
  description: "Contact faffless support.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-black tracking-tight text-black/85">Contact</h1>

      <p className="mt-4 text-sm font-semibold text-black/70 leading-6">
        Need help, found a bug, or want to request a feature?
      </p>

      <div className="mt-8 rounded-2xl border border-black/10 bg-white/70 p-5 text-sm font-semibold text-black/70 leading-6">
        Email us at{" "}
        <a className="underline font-bold" href="mailto:hello@fafflessvat.co.uk">
          hello@fafflessvat.co.uk
        </a>
        .
        <div className="mt-3 text-sm text-black/55">
          If you’re reporting an issue, include what you clicked, what you expected, and what happened (a screenshot
          helps).
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-black/10 bg-white/70 p-5">
        <div className="text-sm font-bold text-black/80">Before you send</div>
        <ul className="mt-3 list-disc pl-6 space-y-2 text-sm font-semibold text-black/70">
          <li>Please don’t email real customer personal data if you can avoid it.</li>
          <li>Use dummy/test invoice details when possible.</li>
        </ul>
      </div>

      <div className="mt-10 flex flex-wrap gap-4 text-sm font-bold text-black/60">
        <a className="underline" href="/">
          Home
        </a>
        <a className="underline" href="/privacy">
          Privacy
        </a>
        <a className="underline" href="/terms">
          Terms
        </a>
        <a className="underline" href="/security">
          Security
        </a>
      </div>
    </main>
  );
}