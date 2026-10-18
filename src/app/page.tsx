import React from "react";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { getAllProducts, getCategories } from "@/lib/api";
import { TrendingUp, TrendingDown, LayoutGrid } from "lucide-react";

// revalidate page data every 60 seconds
export const revalidate = 60;

export default async function HomePage() {
  // load all products and categories
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  // filter top 6 products whose price increased today
  const topRisers = [...products]
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  // filter top 6 products whose price decreased today
  const topFallers = [...products]
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => (a.change?.pct || 0) - (b.change?.pct || 0))
    .slice(0, 6);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      {/* Navbar with dynamic category list */}
      <Navbar categories={categories} />

      {/* Marquee price ticker */}
      <PriceTicker products={products} />

      {/* Banner / Hero section */}
      <Hero />

      {/* Main page content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12 w-full">
        
        {/* Section 1: Price Increased Today */}
        {topRisers.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                    আজ দাম বেড়েছে <span className="text-emerald-600 text-lg">▲</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    আজকের বাজারে সবচেয়ে বেশি দাম বৃদ্ধি পাওয়া শীর্ষ পণ্যসমূহ
                  </p>
                </div>
              </div>
            </div>

            {/* Grid for top risers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
              {topRisers.map((product) => (
                <ProductCard key={`riser-${product.id}`} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Section 2: Price Decreased Today */}
        {topFallers.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                    আজ দাম কমেছে <span className="text-rose-600 text-lg">▼</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    আজকের বাজারে সবচেয়ে বেশি দাম কমা শীর্ষ পণ্যসমূহ
                  </p>
                </div>
              </div>
            </div>

            {/* Grid for top fallers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
              {topFallers.map((product) => (
                <ProductCard key={`faller-${product.id}`} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Section 3: All Products */}
        <section id="সব-পণ্য" className="space-y-5 scroll-mt-24">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  সব পণ্য
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  বাংলাদেশের শীর্ষ নিত্যপণ্যের সম্পূর্ণ তালিকা ও আজকের দর
                </p>
              </div>
            </div>
          </div>

          {/* Grid for all products */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={`all-${product.id}`} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-200">
              কোনো পণ্য পাওয়া যায়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।
            </div>
          )}
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
