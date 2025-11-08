import { Product } from "@/types/models/shop/product";

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
    ]
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
    ]
  }
];
