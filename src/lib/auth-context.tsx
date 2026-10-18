"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// user data type
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  createdAt?: string;
}

// auth context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (
    name: string,
    email: string,
    password?: string,
    confirmPassword?: string
  ) => Promise<{ success: boolean; error?: string }>;
  signInWithSocial: (provider: "google" | "github") => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (data: { name?: string; image?: string }) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// local storage keys
const USERS_DB_KEY = "bazardor_all_users";
const CURRENT_USER_KEY = "bazardor_current_user";

// default demo users so teachers or testers can test easily
const defaultUsersList: User[] = [
  {
    id: "usr_101",
    name: "মো: রহিম আহমেদ",
    email: "user@gmail.com",
    password: "password123", // default 8+ char password
    createdAt: "১০ অক্টোবর ২০২৬",
  },
  {
    id: "usr_102",
    name: "বাজার দর এডমিন",
    email: "admin@bazardor.com",
    password: "adminpassword",
    createdAt: "১ অক্টোবর ২০২৬",
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // load user from local storage when page loads
  useEffect(() => {
    try {
      // first check if users db exists in localStorage, if not initialize with default demo users
      const storedUsers = localStorage.getItem(USERS_DB_KEY);
      if (!storedUsers) {
        localStorage.setItem(USERS_DB_KEY, JSON.stringify(defaultUsersList));
      }

      // now check if any user is already logged in
      const savedUser = localStorage.getItem(CURRENT_USER_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.log("Error loading user from local storage:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // helper to get all registered users list
  const getAllUsers = (): User[] => {
    try {
      const data = localStorage.getItem(USERS_DB_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.log("Error getting users:", e);
    }
    return defaultUsersList;
  };

  // sign in function
  const signIn = async (email: string, password?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password || "";

    // simple validations
    if (!cleanEmail) {
      toast.error("অনুগ্রহ করে ইমেইল লিখুন!");
      return { success: false, error: "ইমেইল লিখুন!" };
    }

    if (!cleanPassword) {
      toast.error("অনুগ্রহ করে পাসওয়ার্ড লিখুন!");
      return { success: false, error: "পাসওয়ার্ড লিখুন!" };
    }

    // find user from registered users in localStorage
    const allUsers = getAllUsers();
    const foundUser = allUsers.find(
      (u) => u.email.toLowerCase() === cleanEmail
    );

    if (!foundUser) {
      toast.error("এই ইমেইলে কোনো অ্যাকাউন্ট পাওয়া যায়নি! অনুগ্রহ করে সাইন আপ করুন।");
      return {
        success: false,
        error: "কোনো অ্যাকাউন্ট পাওয়া যায়নি। সাইন আপ করুন।",
      };
    }

    // check password match
    if (foundUser.password && foundUser.password !== cleanPassword) {
      toast.error("ভুল পাসওয়ার্ড দিয়েছেন! অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন।");
      return {
        success: false,
        error: "ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।",
      };
    }

    // login successful - save session
    const loggedInUser: User = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      image: foundUser.image,
      createdAt: foundUser.createdAt,
    };

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    toast.success(`স্বাগতম ${loggedInUser.name}! সফলভাবে লগইন হয়েছে।`);
    return { success: true };
  };

  // sign up function with strong checks (at least 8 chars password, confirm password, email regex)
  const signUp = async (
    name: string,
    email: string,
    password?: string,
    confirmPassword?: string
  ) => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password || "";

    // 1. name validation
    if (!cleanName) {
      toast.error("আপনার নাম লিখুন!");
      return { success: false, error: "নাম আবশ্যক" };
    }
    if (cleanName.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে!");
      return { success: false, error: "নাম কমপক্ষে ২ অক্ষরের হতে হবে!" };
    }

    // 2. email validation (must contain @ and .)
    if (!cleanEmail) {
      toast.error("আপনার ইমেইল লিখুন!");
      return { success: false, error: "ইমেইল আবশ্যক" };
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(cleanEmail)) {
      toast.error("একটি সঠিক ইমেইল ঠিকানা দিন (যেমন: user@example.com)");
      return { success: false, error: "সঠিক ইমেইল ফরম্যাট দিন" };
    }

    // 3. password validation - at least 8 characters!
    if (!cleanPassword) {
      toast.error("পাসওয়ার্ড প্রদান করুন!");
      return { success: false, error: "পাসওয়ার্ড আবশ্যক" };
    }
    if (cleanPassword.length < 8) {
      toast.error("পাসওয়ার্ড অবশ্যই কমপক্ষে ৮ অক্ষরের হতে হবে!");
      return {
        success: false,
        error: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে!",
      };
    }

    // 4. confirm password matching check
    if (confirmPassword !== undefined && cleanPassword !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না! অনুগ্রহ করে পুনরায় চেক করুন।");
      return { success: false, error: "পাসওয়ার্ড দুটি মিলছে না!" };
    }

    // 5. check if email already registered in our list
    const allUsers = getAllUsers();
    const alreadyExists = allUsers.some(
      (u) => u.email.toLowerCase() === cleanEmail
    );

    if (alreadyExists) {
      toast.error("এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে! সরাসরি সাইন ইন করুন।");
      return {
        success: false,
        error: "এই ইমেইল ইতিমধ্যে ব্যবহৃত হয়েছে।",
      };
    }

    // 6. create new user object
    const newUser: User = {
      id: "usr_" + Date.now(),
      name: cleanName,
      email: cleanEmail,
      password: cleanPassword, // saved for authentication verification
      createdAt: new Date().toLocaleDateString("bn-BD"),
    };

    // 7. add to users list in localStorage
    const updatedUsersList = [...allUsers, newUser];
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(updatedUsersList));

    toast.success("রেজিস্ট্রেশন সফল হয়েছে! এখন লগইন করুন।");
    return { success: true };
  };

  // social login function (Google or GitHub)
  const signInWithSocial = async (provider: "google" | "github") => {
    const providerName = provider === "google" ? "Google" : "GitHub";
    const socialEmail = `${provider}.student@bazardor.com`;

    const allUsers = getAllUsers();
    let existingSocialUser = allUsers.find(
      (u) => u.email.toLowerCase() === socialEmail
    );

    if (!existingSocialUser) {
      existingSocialUser = {
        id: `usr_${provider}_${Date.now()}`,
        name: `${providerName} ইউজার`,
        email: socialEmail,
        password: "social-login-user-pass",
        image: provider === "google" ? "https://lh3.googleusercontent.com/a/default-user" : undefined,
        createdAt: new Date().toLocaleDateString("bn-BD"),
      };
      const updatedList = [...allUsers, existingSocialUser];
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(updatedList));
    }

    const sessionUser: User = {
      id: existingSocialUser.id,
      name: existingSocialUser.name,
      email: existingSocialUser.email,
      image: existingSocialUser.image,
      createdAt: existingSocialUser.createdAt,
    };

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
    toast.success(`${providerName} দিয়ে সফলভাবে লগইন হয়েছে!`);
  };

  // logout function
  const signOut = async () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
    toast.success("সফলভাবে লগআউট হয়েছে!");
  };

  // update user profile name
  const updateUser = async (data: { name?: string; image?: string }) => {
    if (!user) {
      toast.error("লগইন করা নেই!");
      return { success: false, error: "লগইন প্রয়োজন" };
    }

    const newName = data.name?.trim() || user.name;
    const updatedUser: User = {
      ...user,
      name: newName,
      image: data.image !== undefined ? data.image : user.image,
    };

    // update current user in local storage
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    setUser(updatedUser);

    // also update user inside all users list
    try {
      const allUsers = getAllUsers();
      const newUsersList = allUsers.map((u) => {
        if (u.id === user.id || u.email === user.email) {
          return {
            ...u,
            name: newName,
            image: data.image !== undefined ? data.image : u.image,
          };
        }
        return u;
      });
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(newUsersList));
    } catch (e) {
      console.log("Error updating users db:", e);
    }

    toast.success("প্রোফাইল নাম সফলভাবে পরিবর্তন হয়েছে!");
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

// custom hook to use auth
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
