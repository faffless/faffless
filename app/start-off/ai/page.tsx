"use client";

import Image from "next/image";
import { useState } from "react";

export default function AIStartPage() {
  const [pasteText, setPasteText] = useState("");
  const [status, setStatus] = useState("");

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const count = e.target.files?.length || 0;
    if (!count) {
      setStatus("");
      return;
    }
    setStatus(`${count} file${count > 1 ? "s" : ""} selected. AI drafting will be the next step.`);
  }

  function handleContinue() {
    setStatus(
      "This is the right page structure for the AI route. The actual AI drafting logic is the next thing we should build."
    );
  }

  return (
    <main className="ff-shell">
      <div className="ff-container">
        <header className="-mt-4 sm:-mt-6 pt-0">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/brand/faffless-lockup5.png"
              alt="FAFFLESS"
              width={1200}
              height={400}
              priority
              className="h-auto w-[280px] sm:w-[380px] md:w-[460px] drop-shadow-[0_10px_22px_rgba(0,0,0,0.14)]"
            />

            <div className="-mt-1 max-w-3xl">
              <h1 className="ff-heroText text-[26px] sm:text-[34px] md:text-[40px] font-black tracking-tight text-black/80 leading-tight">
                Draft with AI
              </h1>

              <p className="ff-heroText mt-2 text-[15px] sm:text-[18px] font-semibold text-black/65 leading-snug">
                Upload your source material or paste notes, and we’ll turn it into a draft invoice
                for you.
              </p>
            </div>
          </div>
        </header>

        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-5 sm:gap-6">
          <section className="ff-panel-warm p-5 sm:p-6">
            <div className="ff-title">Upload files or paste text</div>

            <div className="mt-4 grid grid-cols-1 gap-4">
              <label className="block">
                <div className="ff-label mb-2">Upload files</div>
                <div className="rounded-2xl border border-dashed border-black/20 bg-white/65 p-4 sm:p-5">
                  <input
                    type="file"
                    multiple
                    onChange={handleFiles}
                    className="block w-full text-sm text-black/70 file:mr-4 file:rounded-xl file:border-0 file:bg-black file:px-4 file:py-2 file:font-bold file:text-white hover:file:opacity-95"
                  />
                  <div className="mt-3 text-xs text-black/55 leading-5">
                    Good examples: previous invoice, quote, email, job notes or plain text.
                  </div>
                </div>
              </label>

              <label className="block">
                <div className="ff-label mb-2">Paste anything helpful</div>
                <textarea
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                  rows={10}
                  placeholder="Example: 'Invoice Acme Ltd for website design work completed in February, £1,200 net, due in 14 days...'"
                  className="ff-input"
                />
              </label>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button onClick={handleContinue} className="ff-btn-primary">
                Continue to AI draft
              </button>

              <button
                onClick={() => (window.location.href = "/start/manual")}
                className="ff-btn-secondary"
              >
                Use the easy builder instead
              </button>
            </div>

            <div className="mt-3 text-center text-xs text-black/70">{status}</div>
          </section>

          <section className="ff-card p-5 sm:p-6">
            <div className="ff-title">How this route works</div>

            <div className="mt-4 grid grid-cols-1 gap-4">
              <div className="rounded-2xl bg-white/70 border border-black/10 p-4">
                <div className="text-sm font-black text-black/80">1. Give us source material</div>
                <p className="mt-2 text-sm leading-6 text-black/65">
                  Upload a file or paste the rough details of what the invoice should say.
                </p>
              </div>

              <div className="rounded-2xl bg-white/70 border border-black/10 p-4">
                <div className="text-sm font-black text-black/80">2. We draft the invoice</div>
                <p className="mt-2 text-sm leading-6 text-black/65">
                  The AI route will turn that into invoice details you can check and edit.
                </p>
              </div>

              <div className="rounded-2xl bg-white/70 border border-black/10 p-4">
                <div className="text-sm font-black text-black/80">3. You review the preview</div>
                <p className="mt-2 text-sm leading-6 text-black/65">
                  Nothing should be final until you approve it on the preview page.
                </p>
              </div>
            </div>

            <div className="mt-5 text-xs leading-5 text-black/55">
              This page sets up the AI route properly in the product flow. The actual AI parsing and
              extraction logic is the next build step.
            </div>
          </section>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => (window.location.href = "/")}
            className="rounded-2xl bg-white/75 px-5 py-3 font-extrabold transition border border-black/20 hover:bg-white/90 active:bg-white/75"
          >
            Back
          </button>
        </div>
      </div>

      <style jsx global>{`
        .ff-heroText {
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.92),
            0 10px 28px rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </main>
  );
}