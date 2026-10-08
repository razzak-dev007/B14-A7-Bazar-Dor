import React from "react";

interface ProductSkeletonProps {
  count?: number;
}

export default function ProductSkeleton({ count = 6 }: ProductSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col animate-pulse"
        >
          {/* Top row */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-slate-200 rounded-xl" />
            <div className="w-16 h-6 bg-slate-200 rounded-full" />
          </div>

          {/* Title skeleton */}
          <div className="h-5 bg-slate-200 rounded w-3/4 mb-2" />

          {/* Unit skeleton */}
          <div className="h-4 bg-slate-100 rounded w-1/2 mb-6" />

          {/* Bottom price */}
          <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="h-4 bg-slate-100 rounded w-1/4" />
            <div className="h-6 bg-slate-200 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
