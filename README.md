# 🛒 বাজার দর — BazarDor (Next.js Bengali Market Price Application)

> **Programming Hero Batch 14 — Assignment 07**  
> নিত্যপণ্যের আজকের সঠিক বাজার দর, দামের পরিবর্তন, বিভাগীয় বাজারের তথ্য এবং ব্যবহারকারী প্রোফাইল ব্যবস্থাপনা।

---

## 🌟 লাইভ ডেমো ও লিংক (Live Links)
- **Live Deployment:** [https://bazardor.vercel.app](https://bazardor.vercel.app) *(Deploy on Vercel)*
- **GitHub Repository:** [https://github.com/razzak-dev007/B14-A7-Bazar-Dor](https://github.com/razzak-dev007/B14-A7-Bazar-Dor)

---

## 📖 প্রজেক্টের সংক্ষিপ্ত বিবরণ (Project Overview)
**বাজার দর (Bazar Dor)** হলো একটি আধুনিক, পূর্ণাঙ্গ রেসপনসিভ বাংলা নিত্যপণ্যের বাজারদর ওয়েব অ্যাপ্লিকেশন। এর মাধ্যমে ব্যবহারকারীরা চাল, ডাল, তেল, সবজি, মাছ, মাংস ও মসলাসহ নিত্যপ্রয়োজনীয় পণ্যের প্রতিদিনের হালনাগাদ দর, দামের ওঠানামা (বৃদ্ধি বা হ্রাস), গড়/সর্বনিম্ন/সর্বোচ্চ দাম এবং সারা দেশের বিভিন্ন বিভাগীয় বাজারের মূল্য পরিস্থিতি এক নজরে দেখতে পারবেন।

---

## 🛠️ ব্যবহৃত প্রযুক্তিসমূহ (Technologies Used)
- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Components & Dynamic Routes)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **Authentication:** [Better Auth](https://better-auth.com/) (Email/Password, Google & GitHub OAuth)
- **Notifications:** [react-hot-toast](https://react-hot-toast.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **API:** REST API (Workers Cloudflare API with fallback support)
- **Deployment:** [Vercel](https://vercel.com/)

---

## ✨ প্রধান বৈশিষ্ট্যসমূহ (Key Features)

1. **🔴 লাইভ প্রাইস টিকার (Infinite Horizontal Marquee Ticker):**
   - নেভবারের ঠিক নিচে বাংলা সংখ্যা ও দিক নির্দেশক প্রতীকসহ (▲ ২.১%, ▼ ২.৯%, — ০.০%) পণ্যের স্বয়ংক্রিয় স্ক্রলিং টিকার।
   - হোভার করলে টিকার পজ হয় এবং সহজে ক্লিক করে পণ্যের বিস্তারিত পাতায় যাওয়া যায়।

2. **📊 হোম পেজ এনালাইসিস সেকশন (Top Risers, Fallers & All Products):**
   - **আজ দাম বেড়েছে ▲:** বাজারে সর্বোচ্চ দাম বৃদ্ধি পাওয়া শীর্ষ ৬টি পণ্য।
   - **আজ দাম কমেছে ▼:** বাজারে সবচেয়ে বেশি দাম কমা শীর্ষ ৬টি পণ্য।
   - **সব পণ্য (#সব-পণ্য):** সকল পণ্যের রেসপনসিভ গ্রিড কার্ড এবং ব্যানার থেকে স্মুথ স্ক্রোলিং সি.টি.এ বাটন।

3. **🔢 ক্যাটাগরি পেজ এবং বাংলা নিউমেরিক শর্টিং (Category & Numeric Sorting):**
   - ডাইনামিক ক্যাটাগরি রুট (`/category/[slug]`)।
   - **সাজান ফিল্টার:** `ডিফল্ট`, `দাম: কম থেকে বেশি` এবং `দাম: বেশি থেকে কম` (বাংলা সংখ্যা ও কমাযুক্ত মান সঠিকভাবে সংখ্যায় রূপান্তর করে নিখুঁত সর্টিং)।
   - ক্যাটাগরি খালি বা অনুপস্থিত থাকলে কাস্টম এম্পটি স্টেট।

4. **🔒 সুরক্ষিত প্রোডাক্ট ডিটেইলস পেজ (Protected Product Details - `/product/[slug]`):**
   - শুধুমাত্র অথেনটিকেটেড ব্যবহারকারীদের জন্য অ্যাক্সেসযোগ্য রুট। অননুমোদিত প্রবেশে টোস্ট অ্যালার্ট ও সাইন-ইন রিডাইরেক্ট।
   - **মূল্য সংক্ষিপ্তসার:** সর্বনিম্ন দাম (Min), সর্বোচ্চ দাম (Max) এবং গড় দাম (Average) ক্যালকুলেশন।
   - **মূল্য পরিবর্তনের ইতিহাস:** আজকের দর, গতকালের দর, গত সপ্তাহের দর এবং গত মাসের দরের তুলনা।
   - **বাজারভিত্তিক আজকের দাম:** কারওয়ান বাজার, মিরপুর, চট্টগ্রাম, রাজশাহী ইত্যাদি বাজারের বিভাগ ও রেঞ্জ তালিকা।

5. **🔐 নিরাপদ অথেনটিকেশন ও প্রোফাইল আপডেট (Auth & Profile Update - Challenge C3):**
   - সাইন ইন (`/signin`) এবং সাইন আপ (`/signup`) ফর্ম ভ্যালিডেশন এবং টোস্ট নোটিফিকেশন।
   - গুগল ও গিটহাব সোশ্যাল লগইন সমর্থন।
   - প্রোফাইল তথ্য প্রদর্শন (`/profile`) এবং ইউজারের নাম পরিবর্তনের সুবিধা (`/profile/update`)।

6. **📱 সম্পূর্ণ রেসপনসিভ ও আধুনিক ডিজাইন (100% Responsive Design):**
   - মোবাইল, ট্যাবলেট ও ডেস্কটপ ডিভাইসের জন্য পারফেক্ট গ্রিড ও ফন্ট স্কেলিং।
   - শিমার এনিমেশনসহ লোডিং স্কেলিটন (`ProductSkeleton`) এবং কাস্টম বাংলা ৪০৪ পেজ (`not-found.tsx`)।

---

## 💻 লোকাল সেটআপ ও ইন্সটলেশন (Installation & Setup)

১. **রিপোজিটরি ক্লোন করুন:**
```bash
git clone https://github.com/razzak-dev007/B14-A7-Bazar-Dor.git
cd B14-A7-Bazar-Dor
```

২. **প্রয়োজনীয় প্যাকেজ ইন্সটল করুন:**
```bash
npm install
```

৩. **এনভায়রনমেন্ট ভেরিয়েবল সেটআপ করুন:**
`.env.example` ফাইলটির অনুকরণে একটি `.env.local` ফাইল তৈরি করুন:
```env
BETTER_AUTH_SECRET=your_super_secret_key_here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

৪. **ডেভেলপমেন্ট সার্ভার চালু করুন:**
```bash
npm run dev
```
ব্রাউজারে [http://localhost:3000](http://localhost:3000) ঠিকানায় প্রবেশ করুন।

---

## 🚀 ভার্সেল ডিপ্লয়মেন্ট গাইড (Vercel Deployment)

১. গিটহাবে আপনার কোড পুশ করুন:
```bash
git add .
git commit -m "feat: complete bazar dor assignment"
git push origin main
```
২. [Vercel](https://vercel.com) ড্যাশবোর্ডে গিয়ে `Add New Project` সিলেক্ট করুন।
৩. গিটহাব রিপোজিটরিটি (`razzak-dev007/B14-A7-Bazar-Dor`) ইমপোর্ট করুন এবং Environment Variables-এ `BETTER_AUTH_SECRET` ও `BETTER_AUTH_URL` যুক্ত করে **Deploy** বাটনে ক্লিক করুন।
৪. ডিপ্লয় শেষ হলে ডাইনামিক রুটগুলো যেমন `/category/chal`, `/product/1` ইত্যাদি ব্রাউজারে রিফ্রেশ করে চেক করুন।

---

## 👨‍💻 বিকাশকারী (Author)
- **বিকাশকারী:** [Md Abdur Razzak](https://github.com/razzak-dev007)
- **প্রজেক্ট:** বাজার দর (Bazar Dor) — অ্যাসাইনমেন্ট ০৭ (Programming Hero Batch 14)

