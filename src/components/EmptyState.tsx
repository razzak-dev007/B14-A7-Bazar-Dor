import React from "react";
import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
}

// empty state placeholder component if no items found
export default function EmptyState({
  title = "কোনো তথ্য পাওয়া যায়নি",
  description = "দুঃখিত, আপনি যে পণ্য বা ক্যাটাগরিটি খুঁজছেন তা এই মুহূর্তে বিদ্যমান নেই।",
  buttonText = "হোম পেজে ফিরে যান",
  href = "/",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-3xl border border-slate-200 shadow-xs max-w-lg mx-auto my-10">
      <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 shadow-inner">
        <SearchX className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-500 mb-5 max-w-sm">{description}</p>
      <Link
        href={href}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{buttonText}</span>
      </Link>
    </div>
  );
}
