import { Product } from "@/types/models/shop/product";

export const exampleProduct: Product = {
  id: "p001",
  sellerId: "seller001",
  title: "Wireless Headphones",
  image: "https://images.pexels.com/photos/776998/pexels-photo-776998.jpeg",
  images: [
    "https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg",
    "https://images.pexels.com/photos/1030971/pexels-photo-1030971.jpeg"
  ],
  currentPrice: 129.99,
  discount: 15,
  originalPrice: 149.99,
  ratings: [
    {
      id: "r1",
      name: "Alice",
      rateDate: "2025-10-25T15:30:00Z",
      rateText: "Great sound quality and battery life!",
      value: 5
    },
    {
      id: "r2",
      name: "Bob",
      rateDate: "2025-10-26T12:15:00Z",
      rateText: "Comfortable but a bit pricey.",
      value: 2
    }
  ]
};
