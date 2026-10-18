import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// helper function to join classnames cleanly
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// english to bengali numbers dictionary
const bengaliNumbersMap: { [key: string]: string } = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

// bengali to english numbers dictionary
const englishNumbersMap: { [key: string]: string } = {
  "০": "0",
  "১": "1",
  "২": "2",
  "৩": "3",
  "৪": "4",
  "৫": "5",
  "৬": "6",
  "৭": "7",
  "৮": "8",
  "৯": "9",
};

// function to convert normal numbers into bengali numbers
export function toBengaliDigits(input: number | string | undefined | null): string {
  if (input === undefined || input === null) {
    return "০";
  }

  let textNumber = "";
  if (typeof input === "number") {
    // check if number has decimal or not
    const hasDecimal = !Number.isInteger(input);
    if (hasDecimal) {
      textNumber = input.toFixed(1);
    } else {
      textNumber = input.toLocaleString("en-US");
    }
  } else {
    textNumber = String(input);
  }

  // replace every english digit with bengali digit
  return textNumber.replace(/[0-9]/g, (char) => bengaliNumbersMap[char] || char);
}

// function to convert bengali number back to english number for sorting
export function bengaliToNumber(bengaliStr: string | number): number {
  if (typeof bengaliStr === "number") {
    return bengaliStr;
  }
  if (!bengaliStr) {
    return 0;
  }

  // clean commas and whitespace
  const cleaned = String(bengaliStr).replace(/,/g, "").trim();
  const englishStr = cleaned.replace(/[০-৯]/g, (char) => englishNumbersMap[char] || char);
  const result = parseFloat(englishStr);
  return isNaN(result) ? 0 : result;
}

// get current date in bengali language
export function getBengaliDate(date: Date = new Date()): string {
  const days = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];

  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  const currentDay = days[date.getDay()];
  const currentDate = toBengaliDigits(date.getDate());
  const currentMonth = months[date.getMonth()];
  const currentYear = toBengaliDigits(date.getFullYear());

  return `${currentDay}, ${currentDate} ${currentMonth} ${currentYear}`;
}

// helper to get bengali unit name
export function getBengaliUnit(unit?: string): string {
  if (!unit) {
    return "প্রতি একক";
  }
  const cleanUnit = unit.toLowerCase();
  if (cleanUnit === "kg" || cleanUnit.includes("কেজি")) {
    return "প্রতি কেজি";
  }
  if (cleanUnit === "litre" || cleanUnit === "liter" || cleanUnit.includes("লিটার")) {
    return "প্রতি লিটার";
  }
  if (cleanUnit === "dozen" || cleanUnit.includes("ডজন")) {
    return "প্রতি ডজন";
  }
  if (cleanUnit === "piece" || cleanUnit.includes("পিস")) {
    return "প্রতি পিস";
  }
  return `প্রতি ${unit}`;
}
