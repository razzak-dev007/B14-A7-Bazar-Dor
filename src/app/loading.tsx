import React from "react";
import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-8 w-full animate-pulse">
      {/* Skeleton Header */}
      <div className="space-y-3">
        <div className="h-8 bg-slate-200 rounded-lg w-1/3" />
        <div className="h-4 bg-slate-100 rounded-md w-1/2" />
      </div>

      {/* Skeleton Grid */}
      <ProductSkeleton count={8} />
    </div>
  );
}
