// app/layout.tsx (DÜZELTİLMİŞ)

import type { Metadata } from "next";
import "./globals.css"; // globals.css dosyasını hala kullanıyoruz

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
      {/* Geist fontlarını ve karmaşık className'leri kaldırdık. 
        Frame'imiz zaten Arial fontu kullandığı için bu bir sorun değil.
      */}
      <body>
        {children}
      </body>
    </html>
  );
}