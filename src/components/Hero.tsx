import React from "react";
import Image from "next/image";
import { ArrowDown, TrendingUp, ShieldCheck, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-b from-emerald-50/60 via-slate-50 to-slate-50 border-b border-slate-200/70 py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>নিত্যপণ্যের সঠিক ও হালনাগাদ বাজারদর</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-tight mb-4">
              আজকের বাজার দর <br className="hidden sm:inline" />
              <span className="text-emerald-700">জানুন এক নজরে</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-8 max-w-xl">
              প্রতিদিনের চাল, ডাল, তেল, সবজি, মাছ ও মাংসের দামের নির্ভরযোগ্য তথ্য এবং বিভাগীয় বাজারের মূল্য বিশ্লেষণ। স্মার্ট কেনাকাটার জন্য আপনার বিশ্বস্ত সহায়ক।
            </p>

            {/* CTA Button & Highlights */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href="#সব-পণ্য"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-md hover:shadow-lg transition-all transform active:scale-98 text-center"
              >
                <span>সব পণ্য দেখুন</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </a>

              <div className="flex items-center gap-4 text-xs font-medium text-slate-500 justify-center sm:justify-start">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>দৈনিক আপডেট</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>যাচাইকৃত তথ্য</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Illustration/Image */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-4/3 sm:aspect-16/10 rounded-2xl overflow-hidden bg-white/60 p-4 border border-emerald-100 shadow-sm flex items-center justify-center">
              <Image
                src="/bazar-hero.png"
                alt="বাজার দর ইলাস্ট্রেশন"
                width={500}
                height={380}
                priority
                className="object-contain max-h-[300px] w-auto drop-shadow-md hover:scale-102 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
