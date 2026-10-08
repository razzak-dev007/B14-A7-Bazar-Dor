import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-center py-16">
        <div className="flex flex-col items-center justify-center text-center max-w-md bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-20 h-20 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-3xl mb-6 shadow-inner">
            🧭
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100/70 px-3 py-1 rounded-full mb-3">
            ৪০৪ — পৃষ্ঠাটি পাওয়া যায়নি
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-3">
            দুঃখিত, কোনো তথ্য মেলেনি!
          </h1>
          <p className="text-sm text-slate-600 mb-8 leading-relaxed">
            আপনি যে পাতা বা পণ্যটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ভুল ঠিকানায় প্রবেশ করেছেন।
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
