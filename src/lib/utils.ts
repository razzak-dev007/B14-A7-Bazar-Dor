import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Map English digits to Bengali digits
const bengaliDigits: { [key: string]: string } = {
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

// Map Bengali digits to English digits
const englishDigits: { [key: string]: string } = {
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

/**
 * Converts numbers/numeric strings into localized Bengali formatted digits.
 * Example: 1850 -> "১,৮৫০", 14.5 -> "১৪.৫"
 */
export function toBengaliDigits(input: number | string | undefined | null): string {
  if (input === undefined || input === null) return "০";

  // If input is a number, format with commas for thousands
  let numStr = "";
  if (typeof input === "number") {
    // Format to 1 decimal place if float, or integer with locale commas
    const isFloat = !Number.isInteger(input);
    if (isFloat) {
      numStr = input.toFixed(1);
    } else {
      numStr = input.toLocaleString("en-US");
    }
  } else {
    numStr = String(input);
  }

  return numStr.replace(/[0-9]/g, (digit) => bengaliDigits[digit] || digit);
}

/**
 * Converts Bengali numeric string back to JavaScript number for sorting/calculations.
 * Example: "১,৮৫০" -> 1850, "৭৫" -> 75
 */
export function bengaliToNumber(bengaliStr: string | number): number {
  if (typeof bengaliStr === "number") return bengaliStr;
  if (!bengaliStr) return 0;

  // Remove commas and whitespace
  const cleanStr = String(bengaliStr).replace(/,/g, "").trim();
  const enDigits = cleanStr.replace(/[০-৯]/g, (char) => englishDigits[char] || char);
  const parsed = parseFloat(enDigits);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Returns Bengali formatted date.
 * Example: "বৃহস্পতিবার, ৮ অক্টোবর ২০২৬"
 */
export function getBengaliDate(date: Date = new Date()): string {
  const bengaliDays = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];

  const bengaliMonths = [
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

  const dayName = bengaliDays[date.getDay()];
  const dayNumber = toBengaliDigits(date.getDate());
  const monthName = bengaliMonths[date.getMonth()];
  const yearNumber = toBengaliDigits(date.getFullYear());

  return `${dayName}, ${dayNumber} ${monthName} ${yearNumber}`;
}

/**
 * Formats unit into standard Bengali representation.
 */
export function getBengaliUnit(unit?: string): string {
  if (!unit) return "প্রতি একক";
  const lower = unit.toLowerCase();
  if (lower === "kg" || lower.includes("কেজি")) return "প্রতি কেজি";
  if (lower === "litre" || lower === "liter" || lower.includes("লিটার")) return "প্রতি লিটার";
  if (lower === "dozen" || lower.includes("ডজন")) return "প্রতি ডজন";
  if (lower === "piece" || lower.includes("পিস")) return "প্রতি পিস";
  return `প্রতি ${unit}`;
}
