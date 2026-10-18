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

  // check if user is not logged in, if so redirect to signin
  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন!");
      router.push("/signin?redirect=/profile");
    }
  }, [user, isLoading, router]);

  // show loading state
  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
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

  // if not user yet, return null
  if (!user) {
    return null;
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 flex items-center justify-center w-full">
        <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm relative">
          
          {/* User Avatar & Name */}
          <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100">
            <div className="w-20 h-20 rounded-full bg-emerald-700 text-white flex items-center justify-center text-3xl font-black mb-3 shadow-md ring-4 ring-emerald-50">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              {user.name}
            </h1>
            <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5 mt-1">
              <Mail className="w-4 h-4 text-emerald-600" />
              <span>{user.email}</span>
            </p>
          </div>

          {/* User Details List */}
          <div className="py-5 space-y-3">
            
            {/* User Name item */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-emerald-700 border border-slate-200 shadow-2xs">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">ব্যবহারকারীর নাম</span>
                  <p className="text-sm font-bold text-slate-800">{user.name}</p>
                </div>
              </div>
            </div>

            {/* Email item */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-emerald-700 border border-slate-200 shadow-2xs">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">ইমেইল ঠিকানা</span>
                  <p className="text-sm font-bold text-slate-800">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Account Status item */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-emerald-700 border border-slate-200 shadow-2xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">অ্যাকাউন্ট স্ট্যাটাস</span>
                  <p className="text-sm font-bold text-emerald-700">ভেরিফায়েড সদস্য (Active)</p>
                </div>
              </div>
            </div>

            {/* Member Since / Created Date item */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-emerald-700 border border-slate-200 shadow-2xs">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">যোগদানের তারিখ</span>
                  <p className="text-sm font-bold text-slate-800">{user.createdAt || "১০ অক্টোবর ২০২৬"}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Buttons: Update Profile and Sign Out */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2.5">
            <Link
              href="/profile/update"
              className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>নাম পরিবর্তন করুন</span>
            </Link>

            <button
              onClick={() => signOut()}
              className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
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
