"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, ArrowLeft, Save } from "lucide-react";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { user, updateUser, isLoading } = useAuth();

  // state for name input and saving
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  // redirect to sign in if user not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("প্রোফাইল আপডেট করতে আগে লগইন করুন!");
      router.push("/signin?redirect=/profile/update");
    } else if (user) {
      setName(user.name || "");
    }
  }, [user, isLoading, router]);

  // handle update form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("অনুগ্রহ করে আপনার নাম লিখুন!");
      return;
    }
    if (name.trim().length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে!");
      return;
    }

    setSaving(true);
    try {
      const res = await updateUser({ name: name.trim() });
      if (res.success) {
        // go back to profile page
        router.push("/profile");
      }
    } catch (err) {
      console.log("Error updating profile:", err);
    } finally {
      setSaving(false);
    }
  };

  // loading state
  if (isLoading || !user) {
    return (
      <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
        <Navbar />
        <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 flex items-center justify-center">
          <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-slate-200 animate-pulse space-y-4">
            <div className="h-6 bg-slate-200 rounded w-1/2 mx-auto" />
            <div className="h-10 bg-slate-100 rounded" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 flex items-center justify-center w-full">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm relative">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-2 text-2xl shadow-inner">
              ✏️
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              তথ্য পরিবর্তন করুন
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              আপনার অ্যাকাউন্টের প্রোফাইল নাম আপডেট করুন
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                আপনার নাম (Full Name) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার পরিবর্তিত নাম লিখুন"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800"
                />
              </div>
            </div>

            {/* Read-only email address */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                ইমেইল ঠিকানা (পরিবর্তনযোগ্য নয়)
              </label>
              <input
                type="text"
                disabled
                value={user.email}
                className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed font-medium"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {saving ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>তথ্য সংরক্ষণ করুন</span>
                  </>
                )}
              </button>

              <Link
                href="/profile"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>প্রোফাইলে ফিরে যান</span>
              </Link>
            </div>
          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
}
