import { Rating } from "./rating";

export type Product = {
  id: string;
  sellerId: string;
  title: string;
  image: string;         // Primary image
  images?: string[];     // Optional additional images
  price: number;         // Base price
  discount?: number;     // Optional discount percentage
  ratings?: Rating[];    // Array of individual Rating entries
};