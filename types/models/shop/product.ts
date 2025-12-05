import { ReactNode } from "react";
import { Rating } from "./rating";

export type Product = {
  name: ReactNode;
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
  createdAt: Date;        // Creation date
  updatedAt: Date;        // Last updated date
};
