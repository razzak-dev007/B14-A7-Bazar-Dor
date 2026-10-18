"use client";

import React, { useState, useMemo } from "react";
import { Product, Category, SortOption } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";
import { SlidersHorizontal } from "lucide-react";
import { toBengaliDigits } from "@/lib/utils";

interface CategoryViewProps {
  category: Category | null;
  initialProducts: Product[];
  slug: string;
}

export default function CategoryView({
  category,
  initialProducts,
  slug,
}: CategoryViewProps) {
  // sort state: default, price-asc, price-desc
  const [sortBy, setSortBy] = useState<SortOption>("default");

  // sort products list based on selected sort option
  const sortedProducts = useMemo(() => {
    const list = [...initialProducts];
    if (sortBy === "price-asc") {
      // sort by price low to high
      return list.sort((a, b) => Number(a.today) - Number(b.today));
    }
    if (sortBy === "price-desc") {
      // sort by price high to low
      return list.sort((a, b) => Number(b.today) - Number(a.today));
    }
    return list; // default original order
  }, [initialProducts, sortBy]);

  // show empty state if category does not exist and has no products
  if (!category && initialProducts.length === 0) {
    return (
      <EmptyState
        title="ক্যাটাগরি পাওয়া যায়নি"
        description={`'${slug}' নামের কোনো পণ্য ক্যাটাগরি এই মুহূর্তে পাওয়া যায়নি।`}
        buttonText="হোম পেজে ফিরে যান"
        href="/"
      />
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Category Header with Title, Icon and Sort Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl shadow-inner">
            {category?.icon || "🛍️"}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {category?.nameBn || slug}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              মোট {toBengaliDigits(initialProducts.length)} টি পণ্য পাওয়া গেছে
            </p>
          </div>
        </div>

        {/* Price sort dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
          <label htmlFor="sort-select" className="text-xs font-bold text-slate-600 pl-2 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-700" />
            <span>সাজান:</span>
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="select select-sm select-bordered bg-white font-medium text-xs sm:text-sm rounded-xl focus:ring-2 focus:ring-emerald-500 border-slate-300 text-slate-800"
          >
            <option value="default">ডিফল্ট ক্রম</option>
            <option value="price-asc">দাম: কম থেকে বেশি</option>
            <option value="price-desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Product List Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="এই ক্যাটাগরিতে কোনো পণ্য নেই"
          description="এই ক্যাটাগরির অধীনে এই মুহূর্তে কোনো পণ্য তালিকাভুক্ত নেই।"
          buttonText="হোম পেজে ফিরে যান"
          href="/"
        />
      )}
    </div>
  );
}
