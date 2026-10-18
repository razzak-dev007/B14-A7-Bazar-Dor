"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Product } from "@/types/product";
import { useAuth } from "@/lib/auth-context";
import { toBengaliDigits, getBengaliUnit } from "@/lib/utils";
import toast from "react-hot-toast";
import {
  TrendingUp,
  Store,
  MapPin,
  ArrowLeft,
  DollarSign,
  Tag,
  Scale,
} from "lucide-react";

interface ProductDetailsClientProps {
  product: Product | null;
  slug: string;
}

export default function ProductDetailsClient({
  product,
  slug,
}: ProductDetailsClientProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  // check if user is logged in, if not redirect to sign in
  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("পণ্যের বিস্তারিত তথ্য দেখতে অনুগ্রহ করে প্রথমে সাইন ইন করুন!");
      router.push(`/signin?redirect=/product/${encodeURIComponent(slug)}`);
    }
  }, [user, isLoading, router, slug]);

  // show skeleton while checking login state
  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-40 bg-white rounded-3xl border border-slate-200 p-6" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="h-28 bg-white rounded-2xl border border-slate-200" />
          <div className="h-28 bg-white rounded-2xl border border-slate-200" />
          <div className="h-28 bg-white rounded-2xl border border-slate-200" />
        </div>
        <div className="h-64 bg-white rounded-3xl border border-slate-200" />
      </div>
    );
  }

  // if user is not logged in, show login prompt
  if (!user) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 text-2xl">
          🔒
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">লগইন প্রয়োজন</h2>
        <p className="text-sm text-slate-500 mb-6">
          পণ্যের বিস্তারিত দেখতে অনুগ্রহ করে সাইন ইন করুন।
        </p>
        <Link
          href={`/signin?redirect=/product/${encodeURIComponent(slug)}`}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm inline-flex items-center gap-2 hover:bg-emerald-700 transition-colors"
        >
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  // if product not found
  if (!product) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 text-2xl">
          ⚠️
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">পণ্যটি পাওয়া যায়নি</h2>
        <p className="text-sm text-slate-500 mb-6">
          অনুরোধকৃত পণ্যের কোনো তথ্য খুঁজে পাওয়া যায়নি।
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    );
  }

  // calculate min price, max price, and average price from all markets
  const markets = product.markets || [];
  let minPrice = product.today;
  let maxPrice = product.today;
  let avgPrice = product.today;

  if (markets.length > 0) {
    const minValues: number[] = [];
    const maxValues: number[] = [];
    let totalPriceSum = 0;

    for (let i = 0; i < markets.length; i++) {
      const minVal = Number(markets[i].min);
      const maxVal = Number(markets[i].max);
      if (!isNaN(minVal)) minValues.push(minVal);
      if (!isNaN(maxVal)) maxValues.push(maxVal);

      // calculate midpoint for this market
      const mid = (minVal + maxVal) / 2;
      totalPriceSum += mid;
    }

    if (minValues.length > 0) minPrice = Math.min(...minValues);
    if (maxValues.length > 0) maxPrice = Math.max(...maxValues);
    avgPrice = Math.round(totalPriceSum / markets.length);
  }

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const pct = Math.abs(product.change?.pct || 0);

  return (
    <div className="space-y-6">
      
      {/* Back button link */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>সকল পণ্যের তালিকায় ফিরে যান</span>
        </Link>
      </div>

      {/* Main product summary banner */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Left Side: Product icon, name, category, unit */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-4xl sm:text-5xl shadow-inner shrink-0">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/category/${product.category}`}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  <Tag className="w-3 h-3 text-emerald-700" />
                  <span>{product.categoryNameBn || product.category}</span>
                </Link>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                  <Scale className="w-3 h-3 text-emerald-700" />
                  <span>{getBengaliUnit(product.unit)}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {product.nameBn}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                মানসম্মত {product.nameBn}-এর আজকের হালনাগাদ বাজার পরিস্থিতি ও সারা দেশের বিভিন্ন পাইকারি ও খুচরা বাজারের নির্ভরযোগ্য দর।
              </p>
            </div>
          </div>

          {/* Right Side: Today's Price */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 flex flex-row md:flex-col items-center md:items-end justify-between gap-2 shrink-0">
            <div className="text-left md:text-right">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                আজকের নির্ধারিত দর
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-emerald-800">
                  {toBengaliDigits(product.today)}
                </span>
                <span className="text-sm font-bold text-slate-600">টাকা</span>
              </div>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                isUp
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : isDown
                  ? "bg-rose-100 text-rose-800 border border-rose-300"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              <span>{isUp ? "▲ বৃদ্ধি" : isDown ? "▼ হ্রাস" : "— অপরিবর্তিত"}</span>
              <span>{toBengaliDigits(pct)}%</span>
            </span>
          </div>

        </div>
      </section>

      {/* Price Summary: Min, Avg, Max */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-600" />
          <span>মূল্য সংক্ষিপ্তসার</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Min Price */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                সর্বনিম্ন দাম (Min)
              </span>
              <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">
                📉
              </span>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-800">
                {toBengaliDigits(minPrice)}{" "}
                <span className="text-xs font-semibold text-slate-500">টাকা</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">সব বাজারের সর্বনিম্ন দর</p>
            </div>
          </div>

          {/* Average Price */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                গড় দাম (Average)
              </span>
              <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm">
                ⚖️
              </span>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-800">
                {toBengaliDigits(avgPrice)}{" "}
                <span className="text-xs font-semibold text-slate-500">টাকা</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">সম্ভাব্য গড় দর</p>
            </div>
          </div>

          {/* Max Price */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                সর্বোচ্চ দাম (Max)
              </span>
              <span className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-sm">
                📈
              </span>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-800">
                {toBengaliDigits(maxPrice)}{" "}
                <span className="text-xs font-semibold text-slate-500">টাকা</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">সব বাজারের সর্বোচ্চ দর</p>
            </div>
          </div>

        </div>
      </section>

      {/* Historical Price Compare */}
      {(product.yesterday || product.lastWeek || product.lastMonth) && (
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span>মূল্য পরিবর্তনের ইতিহাস</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs text-center">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">আজকের দর</span>
              <span className="text-base sm:text-lg font-extrabold text-emerald-800">
                {toBengaliDigits(product.today)} টাকা
              </span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs text-center">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">গতকালের দর</span>
              <span className="text-base sm:text-lg font-bold text-slate-700">
                {toBengaliDigits(product.yesterday || product.today)} টাকা
              </span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs text-center">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">গত সপ্তাহের দর</span>
              <span className="text-base sm:text-lg font-bold text-slate-700">
                {toBengaliDigits(product.lastWeek || product.today)} টাকা
              </span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs text-center">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">গত মাসের দর</span>
              <span className="text-base sm:text-lg font-bold text-slate-700">
                {toBengaliDigits(product.lastMonth || product.today)} টাকা
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Market wise price list */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-600" />
            <span>বাজারভিত্তিক আজকের দাম</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            মোট {toBengaliDigits(markets.length)} টি বাজার
          </span>
        </div>

        {markets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {markets.map((m, idx) => (
              <div
                key={`${m.market}-${idx}`}
                className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                      <Store className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">
                        {m.market}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>বিভাগ: {m.division}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100">
                    {m.division}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">মূল্য পরিসীমা:</span>
                  <span className="font-bold text-slate-900">
                    {toBengaliDigits(m.min)} - {toBengaliDigits(m.max)} টাকা
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
            এই পণ্যের জন্য আলাদা বাজারভিত্তিক তথ্য এই মুহূর্তে পাওয়া যায়নি।
          </div>
        )}
      </section>

    </div>
  );
}
