import { StructuredData } from "@/components/seo/structured-data";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Noscere - Demystifying Blockchain for Enterprise",
  description: "We partner with enterprise clients to demystify blockchain technology and unlock its strategic value, turning emerging possibilities into competitive advantage.",
  keywords: ["blockchain", "blockchain", "enterprise", "consultancy", "cryptocurrency", "training"],
  authors: [{ name: "Noscere" }],
  creator: "Noscere",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://noscere.com",
    title: "Noscere - Demystifying Blockchain for Enterprise",
    description: "We partner with enterprise clients to demystify blockchain technology and unlock its strategic value.",
    siteName: "Noscere",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noscere - Demystifying Blockchain for Enterprise",
    description: "We partner with enterprise clients to demystify blockchain technology and unlock its strategic value.",
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
    <html lang="en" className={inter.variable}>
      <head>
        <StructuredData type="Organization" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
