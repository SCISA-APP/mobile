import { Rating } from "./rating";

export type Product = {
  id: string;
  sellerId: string;
  title: string;
  image: string;              // Primary image
  images?: string[];          // Optional additional images
  currentPrice: number;          // Average rating (computed from ratings array)
  ratings?: Rating[];         // Array of individual Rating entries
  discount?: number;          // Optional discount percentage
  originalPrice?: number;     // Optional original price
};