import React from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { toBengaliDigits, getBengaliUnit } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const pct = Math.abs(product.change?.pct || 0);
  const targetSlug = product.slug || product.id;

  return (
    <Link
      href={`/product/${targetSlug}`}
      className="group flex flex-col bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-500/50 shadow-xs hover:shadow-md transition-all duration-200 relative overflow-hidden"
    >
      {/* Top row: Emoji/Image & Change Badge */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-emerald-50 transition-all duration-200 shadow-inner">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        {/* Price Change Badge */}
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
            isUp
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : isDown
              ? "bg-rose-50 text-rose-700 border border-rose-200"
              : "bg-slate-100 text-slate-600 border border-slate-200"
          }`}
        >
          <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
          <span>{toBengaliDigits(pct)}%</span>
        </span>
      </div>

      {/* Product Title */}
      <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 mb-1">
        {product.nameBn}
      </h3>

      {/* Category & Unit Information */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
        <span className="bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-600">
          {product.categoryNameBn || product.category}
        </span>
        <span>•</span>
        <span>{getBengaliUnit(product.unit)}</span>
      </div>

      {/* Bottom row: Today's Price */}
      <div className="mt-auto pt-3 border-t border-slate-100 flex items-baseline justify-between">
        <span className="text-xs font-semibold text-slate-500">আজকের দাম</span>
        <div className="text-right">
          <span className="text-xl font-extrabold text-emerald-800 tracking-tight">
            {toBengaliDigits(product.today)}
          </span>
          <span className="text-xs font-semibold text-slate-600 ml-1">টাকা</span>
        </div>
      </div>
    </Link>
  );
}
