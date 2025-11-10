import { Rating } from "./rating";
import { Timestamp } from "firebase/firestore";

export type Product = {
  id: string;
  sellerId: string;
  description: string;
  category: string;
  title: string;
  image: string;          // Primary image
  images?: string[];      // Optional additional images
  price: number;          // Base price
  discount?: number;      // Optional discount percentage
  ratings?: Rating[];     // Array of individual Rating entries
  createdAt: Timestamp;   // Firestore creation timestamp
  updatedAt: Timestamp;   // Firestore last updated timestamp
};
