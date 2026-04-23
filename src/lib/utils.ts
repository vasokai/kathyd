import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fmtPrice(price: string | number, currency = "EUR") {
  const n = typeof price === "string" ? Number(price) : price;
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n);
}
