import type { Metadata } from "next";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "বাজার দর (Bazar Dor) — আজকের বাজার দর জানুন এক নজরে",
  description:
    "নিত্যপণ্যের আজকের বাজার দর, দামের পরিবর্তন, বিভাগীয় বাজারের তালিকা এবং তুলনা। বাজার দর বাংলাদেশের অন্যতম নির্ভরযোগ্য নিত্যপণ্য বাজার পোর্টাল।",
  keywords: ["বাজার দর", "Bazar Dor", "নিত্যপণ্য", "বাজারদর", "চাল", "ডাল", "তেল", "সবজি", "মাছ"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" data-theme="bazardor">
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <AuthProvider>
          <ToastProvider />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
