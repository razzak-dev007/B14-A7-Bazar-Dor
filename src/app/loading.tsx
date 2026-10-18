import React from "react";
import ProductSkeleton from "@/components/ProductSkeleton";

// default loading skeleton for pages
export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-6 w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-7 bg-slate-200 rounded-lg w-1/3" />
        <div className="h-4 bg-slate-100 rounded-md w-1/2" />
      </div>

      {/* Product Skeleton Grid */}
      <ProductSkeleton count={8} />
    </div>
  );
}
