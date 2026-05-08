import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Caladea } from 'next/font/google';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caladea = Caladea({
  variable: "--font-caladea",
  subsets: ["latin"],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "DocVerify - Kurumsal Belge Doğrulama Sistemi",
  description: "PDF belgeleriniz için QR kod tabanlı kurumsal doğrulama sistemi. Güvenli, izlenebilir ve profesyonel.",
  keywords: ["belge doğrulama", "PDF", "QR kod", "kurumsal", "güvenlik", "hash", "SHA-256"],
  authors: [{ name: "DocVerify" }],
  openGraph: {
    title: "DocVerify - Kurumsal Belge Doğrulama Sistemi",
    description: "PDF belgeleriniz için QR kod tabanlı kurumsal doğrulama sistemi.",
    type: "website",
    locale: "tr_TR",
    siteName: "DocVerify",
  },
  twitter: {
    card: "summary_large_image",
    title: "DocVerify - Kurumsal Belge Doğrulama Sistemi",
    description: "PDF belgeleriniz için QR kod tabanlı kurumsal doğrulama sistemi.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} ${caladea.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#1a3a5f" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
