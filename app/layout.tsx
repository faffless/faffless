import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FAFFLESS — Free and Simple E-invoicing",
  description:
    "Free and simple e-invoicing for businesses and the self-employed. PDF optional. Built for future compliance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="antialiased">
        {/* Fixed background, independent of content height */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <Image
            src="/branding/faffless-bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-white/35" />
        </div>

        {children}
      </body>
    </html>
  );
}