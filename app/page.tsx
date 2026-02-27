"use client";

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
        <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6 text-center">
          {/* Logo */}
          <Image
            src="/branding/faffless-lockup16.png"
            alt="FAFFLESS"
            width={1200}
            height={400}
            priority
            className="h-auto w-[300px] sm:w-[420px] md:w-[520px] drop-shadow-[0_10px_22px_rgba(0,0,0,0.14)]"
          />

          {/* Your original “Free E-invoice Creator” */}
          <h1 className="-mt-1 text-[22px] sm:text-[28px] md:text-[40px] font-black tracking-tight text-black/82 leading-[1.25]">
            Free E-Invoice XML Generator (UK)
          </h1>

          {/* Your original explainer line (kept) */}
          <p className="mt-5 text-[12px] sm:text-[15px] md:text-[17px] font-semibold text-black/66 leading-snug max-w-3xl">
            Create structured invoice XML you can upload or email today.
            <br />
            Peppol/endpoint sending is coming — join early access.
          </p>

          {/* Coming soon badge */}
          <div className="mt-6 rounded-2xl border border-black/10 bg-white/70 px-5 py-3 text-sm font-bold text-black/70 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            Coming soon — live MVP in progress.
          </div>
        </div>
      </div>
    </main>
  );
}