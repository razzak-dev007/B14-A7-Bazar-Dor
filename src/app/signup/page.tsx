"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserPlus, User, Mail, Lock, Eye, EyeOff, Check, X, ShieldCheck } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, signInWithSocial } = useAuth();

  // form input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  // show or hide password states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // loading and error state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // check password conditions for live feedback
  const isEightChars = password.length >= 8;
  const isPasswordMatching = password.length > 0 && password === confirmPassword;

  // handle registration form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // check if terms checkbox is checked
    if (!agreeTerms) {
      setErrorMsg("অনুগ্রহ করে ব্যবহারের শর্তাবলীতে সম্মতি দিন।");
      return;
    }

    // check empty inputs
    if (!name.trim()) {
      setErrorMsg("অনুগ্রহ করে আপনার পুরো নাম লিখুন।");
      return;
    }
    if (!email.trim()) {
      setErrorMsg("অনুগ্রহ করে আপনার ইমেইল ঠিকানা লিখুন।");
      return;
    }

    // password length check - at least 8 characters
    if (password.length < 8) {
      setErrorMsg("পাসওয়ার্ড অবশ্যই কমপক্ষে ৮ অক্ষরের হতে হবে!");
      return;
    }

    // password match check
    if (password !== confirmPassword) {
      setErrorMsg("পাসওয়ার্ড ও নিশ্চিতকরণ পাসওয়ার্ড মিলছে না!");
      return;
    }

    setLoading(true);

    try {
      // call signup from auth context
      const result = await signUp(name, email, password, confirmPassword);
      if (result.success) {
        // redirect to signin page after successful signup
        router.push("/signin");
      } else if (result.error) {
        setErrorMsg(result.error);
      }
    } catch (err) {
      console.log("Signup error:", err);
      setErrorMsg("রেজিস্ট্রেশনে কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // handle social login with google or github
  const handleSocialLogin = async (provider: "google" | "github") => {
    setLoading(true);
    try {
      await signInWithSocial(provider);
      router.push("/");
    } catch (err) {
      console.log("Social login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-center py-10">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          
          {/* Top Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-2 text-2xl shadow-inner">
              ✨
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              নতুন অ্যাকাউন্ট তৈরি
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              বাজার দর প্ল্যাটফর্মে সদস্য হতে আপনার সঠিক তথ্য দিন।
            </p>
          </div>

          {/* Show error alert if any error */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
              <span className="font-bold text-sm">⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                আপনার পুরো নাম <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: মোঃ করিম ইসলাম"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                ইমেইল ঠিকানা <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                পাসওয়ার্ড (কমপক্ষে ৮ অক্ষর) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                পাসওয়ার্ড নিশ্চিত করুন <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="পুনরায় একই পাসওয়ার্ড দিন"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Real-time Password Checklist Helper */}
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 space-y-1 text-xs">
              <div className="flex items-center gap-2">
                {isEightChars ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                ) : (
                  <X className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span className={isEightChars ? "text-emerald-700 font-semibold" : "text-slate-500"}>
                  কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isPasswordMatching ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                ) : (
                  <X className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span className={isPasswordMatching ? "text-emerald-700 font-semibold" : "text-slate-500"}>
                  পাসওয়ার্ড দুটি মিল আছে
                </span>
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="checkbox checkbox-xs checkbox-primary rounded"
              />
              <label htmlFor="terms" className="text-xs text-slate-600 cursor-pointer select-none">
                আমি প্ল্যাটফর্মের নিয়মাবলী ও শর্তাবলীতে সম্মতি জানাচ্ছি।
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>অ্যাকাউন্ট তৈরি করুন (Sign Up)</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative bg-white px-3 text-xs text-slate-400 uppercase font-semibold">
              অথবা সোশ্যাল লগইন
            </span>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-2xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin("github")}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-2xs"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* Footer Link to Sign In */}
          <div className="mt-6 text-center text-xs sm:text-sm text-slate-500">
            <span>আগে থেকেই অ্যাকাউন্ট আছে? </span>
            <Link
              href="/signin"
              className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
