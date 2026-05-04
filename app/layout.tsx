import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | TrustShop vente en ligne",
    default: "TrustShop vente en ligne",
  },
  description: "TrustShop vente en ligne, Satisfait ou remboursé."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="font-poppins antialiased">
        <div className="flex flex-col min-h-screen mx-6">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
