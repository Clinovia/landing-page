// app/layout.tsx
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Clinovia | AI-Powered Clinical Decision Support",
  description: "Advanced AI solutions for CRO and Pharma organizations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white antialiased">
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <Navbar />
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="bg-gray-50 border-t border-gray-200">
            <Footer />
          </footer>
        </div>
      </body>
    </html>
  );
}