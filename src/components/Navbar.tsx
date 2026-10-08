"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { getBengaliDate } from "@/lib/utils";
import { Category } from "@/types/product";
import { User, LogOut, ChevronDown, Menu, X } from "lucide-react";

interface NavbarProps {
  categories?: Category[];
}

export default function Navbar({ categories = [] }: NavbarProps) {
  const pathname = usePathname();
  const { user, signOut, isLoading } = useAuth();
  const [bengaliDate, setBengaliDate] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Default fallback categories in case API is loading
  const defaultCategories: Category[] = [
    { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
    { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
    { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
    { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
    { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
    { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
    { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
    { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
  ];

  const categoryList = categories.length > 0 ? categories : defaultCategories;

  useEffect(() => {
    // Generate dynamic Bengali date on mount
    setBengaliDate(getBengaliDate(new Date()));
  }, []);

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Navbar Row */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Left Side: Logo & Dynamic Bengali Date */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex flex-col group focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-1"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl filter drop-shadow-sm group-hover:scale-105 transition-transform">
                🛒
              </span>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-800">
                বাজার দর
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium tracking-wide">
              {bengaliDate || "বৃহস্পতিবার, ৮ অক্টোবর ২০২৬"}
            </span>
          </Link>
        </div>

        {/* Right Side: Auth Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isLoading ? (
            <div className="h-9 w-24 bg-slate-100 animate-pulse rounded-lg" />
          ) : user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/profile"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all ${
                  pathname.startsWith("/profile")
                    ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
                title="প্রোফাইল দেখুন"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="hidden sm:inline max-w-[120px] truncate">{user.name}</span>
              </Link>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-colors"
                title="সাইন আউট"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">সাইন আউট</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/signin"
                className="px-3 sm:px-4 py-1.5 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="px-3 sm:px-4 py-1.5 rounded-lg text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm hover:shadow transition-all"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Second Row: Category Navigation Links */}
      <div className="w-full bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav
            aria-label="Category Navigation"
            className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar scroll-smooth"
          >
            <Link
              href="/"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                pathname === "/"
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
              }`}
            >
              <span>🛍️</span>
              <span>সব পণ্য</span>
            </Link>

            {categoryList.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.id || cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-emerald-700 text-white shadow-sm"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                >
                  <span className="text-sm leading-none">{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
