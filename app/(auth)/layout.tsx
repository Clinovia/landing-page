import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clinovia - Clinical AI Platform",
  description: "AI-powered clinical assessments for cardiology and neurology.",
  keywords: [
    "clinical AI",
    "cardiology",
    "neurology",
    "medical AI",
    "ASCVD",
    "Alzheimer",
  ],
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
}
