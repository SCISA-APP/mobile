import { Product } from "@/types/models/shop/product";
import { Timestamp } from "firebase/firestore";

export const exampleProducts: Product[] = [
  {
    id: "p001",
    sellerId: "seller001",
    title: "Wireless Headphones",
    description: "Experience high-fidelity sound with these wireless headphones, designed for comfort and long-lasting battery life.",
    category: "Electronics",
    image: "https://images.pexels.com/photos/776998/pexels-photo-776998.jpeg",
    images: [
      "https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg",
      "https://images.pexels.com/photos/1030971/pexels-photo-1030971.jpeg",
      "https://assets.bucketlistly.blog/sites/5adf778b6eabcc00190b75b1/content_entry5adf77af6eabcc00190b75b6/6075185986d092000b192d0a/files/best-free-travel-images-main-image-hd-op.webp"
    ],
    price: 149.99,
    discount: 15,
    ratings: [
      { id: "r1", name: "Alice", rateDate: "2025-10-25T15:30:00Z", rateText: "Great sound quality!", value: 5 },
      { id: "r2", name: "Bob", rateDate: "2025-10-26T12:15:00Z", rateText: "Comfortable but a bit pricey.", value: 2 }
    ],
    createdAt: Timestamp.fromDate(new Date("2025-10-25T10:00:00Z")),
    updatedAt: Timestamp.fromDate(new Date("2025-10-26T12:15:00Z")),
  },
  {
    id: "p002",
    sellerId: "seller002",
    title: "Bluetooth Speaker",
    description: "Compact yet powerful Bluetooth speaker, delivering crisp sound and deep bass for your favorite music.",
    category: "Electronics",
    image: "https://images.pexels.com/photos/1648530/pexels-photo-1648530.jpeg",
    images: [
      "https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg",
      "https://images.pexels.com/photos/1648531/pexels-photo-1648531.jpeg"
    ],
    price: 89.99,
    discount: 2,
    ratings: [
      { id: "r3", name: "Charlie", rateDate: "2025-10-27T10:00:00Z", rateText: "Amazing bass!", value: 4 }
    ],
    createdAt: Timestamp.fromDate(new Date("2025-10-27T09:00:00Z")),
    updatedAt: Timestamp.fromDate(new Date("2025-10-27T10:00:00Z")),
  },
  {
    id: "p003",
    sellerId: "seller003",
    title: "Smart Fitness Watch",
    description: "Track your workouts, heart rate, and sleep patterns with this sleek smart fitness watch designed for active lifestyles.",
    category: "Wearables",
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
    images: [
      "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg",
      "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg",
      "https://images.pexels.com/photos/4038791/pexels-photo-4038791.jpeg"
    ],
    price: 199.99,
    discount: 10,
    ratings: [
      { id: "r4", name: "Daniel", rateDate: "2025-11-01T08:00:00Z", rateText: "Excellent fitness tracking and battery life.", value: 5 },
      { id: "r5", name: "Ella", rateDate: "2025-11-02T14:45:00Z", rateText: "Love the design and easy setup!", value: 4 }
    ],
    createdAt: Timestamp.fromDate(new Date("2025-11-01T07:00:00Z")),
    updatedAt: Timestamp.fromDate(new Date("2025-11-02T14:45:00Z")),
  }
];
