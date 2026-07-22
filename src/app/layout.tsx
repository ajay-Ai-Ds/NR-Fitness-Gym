import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NR Gym - Tallarevu, Korangi",
  description: "Transform Your Body. Forge Your Strength. Become Unstoppable. Located in Tallarevu, Korangi, Andhra Pradesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased bg-[var(--color-bg)] text-[var(--color-text-main)]`}
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
