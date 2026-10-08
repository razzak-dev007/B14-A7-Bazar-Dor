import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="text-xl">🛒</span>
          <p className="text-sm font-semibold text-slate-800">
            বাজার দর <span className="font-normal text-slate-500">— প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
          </p>
        </div>
        <p className="text-xs text-slate-500 italic max-w-md">
          “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
        <p>© {new Date().getFullYear()} বাজার দর (Bazar Dor). সর্বস্বত্ব সংরক্ষিত।</p>
        <p>ব্যাচ ১৪ — অ্যাসাইনমেন্ট ০৭ (Programming Hero)</p>
      </div>
    </footer>
  );
}
