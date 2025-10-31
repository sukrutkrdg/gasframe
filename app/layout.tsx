// app/layout.tsx (DÜZELTİLMİŞ - Geist fontları kaldırıldı)

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "/onchain-lab Gas Tracker",
  description: "Farcaster Frame for tracking gas prices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}