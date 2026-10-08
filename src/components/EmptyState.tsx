import React from "react";
import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
}

export default function EmptyState({
  title = "কোনো তথ্য পাওয়া যায়নি",
  description = "দুঃখিত, আপনি যে পণ্য বা ক্যাটাগরিটি খুঁজছেন তা এই মুহূর্তে বিদ্যমান নেই।",
  buttonText = "হোম পেজে ফিরে যান",
  href = "/",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white rounded-3xl border border-slate-200 shadow-xs max-w-lg mx-auto my-12">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 shadow-inner">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-6 max-w-sm">{description}</p>
      <Link
        href={href}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm hover:shadow transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{buttonText}</span>
      </Link>
    </div>
  );
}
