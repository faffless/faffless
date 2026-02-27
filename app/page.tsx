"use client";

import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen w-full">
      {/* Background */}
      <div className="relative min-h-screen w-full overflow-hidden">
        <Image
          src="/brand/faffless-bg.png"
          alt=""
          fill
          priority
          className="object-cover"
        />

        {/* Soft overlay so text reads nicely */}
        <div className="absolute inset-0 bg-white/35" />

        {/* Content */}
        <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6 text-center">
          <div className="-mt-6 sm:-mt-10">
            <Image
              src="/brand/faffless-lockup10n.png"
              alt="FAFFLESS"
              width={900}
              height={300}
              priority
              className="h-auto w-[280px] sm:w-[420px] md:w-[520px] drop-shadow-[0_10px_22px_rgba(0,0,0,0.14)]"
            />
          </div>

          <h1 className="mt-4 text-[20px] sm:text-[28px] md:text-[36px] font-black tracking-tight text-black/80">
            E-invoicing for UK businesses, without the faff.
          </h1>

          <p className="mt-3 max-w-2xl text-[14px] sm:text-[16px] md:text-[18px] font-semibold text-black/60 leading-relaxed">
            Coming soon. A simple tool to create invoice drafts and generate e-invoice files,
            with an AI-assisted “drop in your paperwork” option later.
          </p>

          <div className="mt-6 rounded-2xl border border-black/10 bg-white/70 px-5 py-3 text-sm font-bold text-black/70 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            Live MVP in progress — check back soon.
          </div>
        </div>
      </div>
    </main>
  );
}