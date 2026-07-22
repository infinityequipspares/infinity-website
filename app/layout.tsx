import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import ScrollToTop from "@/components/ScrollToTop";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Infinity Equipments And Spares",
  description:
    "India's trusted supplier of Genuine & Aftermarket Spare Parts for Boom Lifts, Scissor Lifts, Telehandlers, Spider Lifts, Cranes and Material Handling Equipment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-white font-sans">

        <ScrollToTop />

        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />

        <FloatingWhatsApp />

      </body>
    </html>
  );
}