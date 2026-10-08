"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (name: string, email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signInWithSocial: (provider: "google" | "github") => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (data: { name?: string; image?: string }) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = "bazardor_user_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load session on initial mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading stored user session:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save session when user changes
  const saveSession = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
  };

  // Sign in handler
  const signIn = async (email: string, password?: string) => {
    if (!email) {
      toast.error("ইমেইল প্রদান করুন");
      return { success: false, error: "ইমেইল প্রদান করুন" };
    }

    // Default username from email if not stored
    const existingName = email.split("@")[0] || "ব্যবহারকারী";
    const loggedInUser: User = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name: existingName.charAt(0).toUpperCase() + existingName.slice(1),
      email: email,
      createdAt: new Date().toISOString(),
    };

    saveSession(loggedInUser);
    toast.success("সফলভাবে সাইন ইন হয়েছে!");
    return { success: true };
  };

  // Sign up handler
  const signUp = async (name: string, email: string, password?: string) => {
    if (!name || !email) {
      toast.error("নাম ও ইমেইল আবশ্যক");
      return { success: false, error: "নাম ও ইমেইল আবশ্যক" };
    }

    const newUser: User = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name: name,
      email: email,
      createdAt: new Date().toISOString(),
    };

    // Store in session and allow signing in
    saveSession(newUser);
    toast.success("রেজিস্ট্রেশন সফল হয়েছে! অনুগ্রহ করে সাইন ইন করুন।");
    return { success: true };
  };

  // Social login handler (Google / GitHub)
  const signInWithSocial = async (provider: "google" | "github") => {
    const providerName = provider === "google" ? "Google" : "GitHub";
    const mockUser: User = {
      id: `usr_${provider}_` + Math.random().toString(36).substring(2, 9),
      name: `${providerName} User`,
      email: `${provider.toLowerCase()}.user@example.com`,
      image: provider === "google" ? "https://lh3.googleusercontent.com/a/default-user" : undefined,
      createdAt: new Date().toISOString(),
    };

    saveSession(mockUser);
    toast.success(`${providerName} এর মাধ্যমে সফলভাবে সাইন ইন হয়েছে!`);
  };

  // Sign out handler
  const signOut = async () => {
    saveSession(null);
    toast.success("সফলভাবে সাইন আউট হয়েছে");
  };

  // Update user information (Challenge C3)
  const updateUser = async (data: { name?: string; image?: string }) => {
    if (!user) {
      toast.error("কোনো লগইন সেশন পাওয়া যায়নি");
      return { success: false, error: "লগইন প্রয়োজন" };
    }

    const updatedUser: User = {
      ...user,
      name: data.name?.trim() || user.name,
      image: data.image !== undefined ? data.image : user.image,
    };

    saveSession(updatedUser);
    toast.success("তথ্য সফলভাবে আপডেট করা হয়েছে!");
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signInWithSocial,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
