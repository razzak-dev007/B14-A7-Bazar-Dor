"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { toBengaliDigits, getBengaliUnit } from "@/lib/utils";

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({ products }: PriceTickerProps) {
  if (!products || products.length === 0) return null;

  // Duplicate list to create a seamless infinite loop
  const tickerItems = [...products, ...products];

  return (
    <div className="w-full bg-slate-900 text-white border-b border-slate-800 overflow-hidden py-2.5 select-none marquee-container shadow-inner">
      <div className="flex w-max animate-marquee marquee-content items-center">
        {tickerItems.map((item, index) => {
          const isUp = item.change?.dir === "up";
          const isDown = item.change?.dir === "down";
          const pct = Math.abs(item.change?.pct || 0);

          return (
            <Link
              href={`/product/${item.slug || item.id}`}
              key={`${item.id}-${index}`}
              className="inline-flex items-center gap-2 mx-4 px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700/80 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap cursor-pointer group"
            >
              <span className="text-base leading-none group-hover:scale-110 transition-transform">
                {item.image || item.categoryIcon || "🛒"}
              </span>
              <span className="text-slate-200 font-semibold">{item.nameBn}</span>
              <span className="text-amber-400 font-bold">
                {toBengaliDigits(item.today)} টাকা/{item.unit === "kg" ? "কেজি" : item.unit === "litre" ? "লিটার" : item.unit === "dozen" ? "ডজন" : item.unit === "piece" ? "পিস" : item.unit}
              </span>
              <span
                className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-bold ${
                  isUp
                    ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/50"
                    : isDown
                    ? "bg-rose-950/80 text-rose-400 border border-rose-800/50"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"} {toBengaliDigits(pct)}%
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
