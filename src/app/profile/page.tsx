"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, Mail, Calendar, Edit3, LogOut, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { user, signOut, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন");
      router.push("/signin?redirect=/profile");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 flex items-center justify-center">
          <div className="w-full max-w-lg bg-white p-8 rounded-3xl border border-slate-200 animate-pulse space-y-4">
            <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto" />
            <div className="h-6 bg-slate-200 rounded w-1/2 mx-auto" />
            <div className="h-4 bg-slate-100 rounded w-1/3 mx-auto" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 flex items-center justify-center w-full">
        <div className="w-full max-w-xl bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
          {/* Header Banner */}
          <div className="flex flex-col items-center text-center pb-8 border-b border-slate-100">
            <div className="w-24 h-24 rounded-full bg-emerald-700 text-white flex items-center justify-center text-3xl font-black mb-4 shadow-md ring-4 ring-emerald-50">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {user.name}
            </h1>
            <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5 mt-1">
              <Mail className="w-4 h-4 text-emerald-600" />
              <span>{user.email}</span>
            </p>
          </div>

          {/* User Details Grid */}
          <div className="py-6 space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-emerald-700 border border-slate-200 shadow-2xs">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">ব্যবহারকারীর নাম</span>
                  <p className="text-sm font-bold text-slate-800">{user.name}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-emerald-700 border border-slate-200 shadow-2xs">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">ইমেইল ঠিকানা</span>
                  <p className="text-sm font-bold text-slate-800">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-emerald-700 border border-slate-200 shadow-2xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">অ্যাকাউন্ট স্ট্যাটাস</span>
                  <p className="text-sm font-bold text-emerald-700">সক্রিয় সদস্য (Active)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions: Update Information & Sign Out */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/profile/update"
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>তথ্য পরিবর্তন করুন (Update)</span>
            </Link>

            <button
              onClick={() => signOut()}
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 font-bold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>সাইন আউট</span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
