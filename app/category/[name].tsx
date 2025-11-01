import IconFeather from "@expo/vector-icons/Feather";
import IconFontAwesome from "@expo/vector-icons/FontAwesome";
// 💡 1. Import useRouter
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Get screen width for two-column layout (from previous response)
const { width } = Dimensions.get("window");
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

// --- Mock Data for Demonstration (Products within a category) ---
// This mock data is used just to populate the screen content.
type Product = {
  id: string;
  title: string;
  image: string;
  currentPrice: number;
  rating: number;
  reviewCount: number;
  discount: number;
  originalPrice: number;
};

const categoryProducts: Product[] = [
  {
    id: "p1",
    title: "Modern Stainless Steel Water Bottle -",
    image:
      "https://images.pexels.com/photos/10313467/pexels-photo-10313467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    discount: 34,
    currentPrice: 18.99,
    originalPrice: 24.99,
    rating: 4.5,
    reviewCount: 120,
  },
  {
    id: "p2",
    title: "Ergonomic Desk Chair - Adjustable",
    image:
      "https://images.pexels.com/photos/4597950/pexels-photo-4597950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    discount: 25,
    currentPrice: 149.99,
    originalPrice: 199.99,
    rating: 4.6,
    reviewCount: 88,
  },
  {
    id: "p3",
    title: "Modern Stainless Steel Water Bottle -",
    image:
      "https://images.pexels.com/photos/10313467/pexels-photo-10313467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    discount: 34,
    currentPrice: 18.99,
    originalPrice: 24.99,
    rating: 4.5,
    reviewCount: 120,
  },
  {
    id: "p4",
    title: "Ergonomic Desk Chair - Adjustable",
    image:
      "https://images.pexels.com/photos/4597950/pexels-photo-4597950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    discount: 25,
    currentPrice: 149.99,
    originalPrice: 199.99,
    rating: 4.6,
    reviewCount: 88,
  },
  {
    id: "p5",
    title: "Modern Stainless Steel Water Bottle -",
    image:
      "https://images.pexels.com/photos/10313467/pexels-photo-10313467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    discount: 34,
    currentPrice: 18.99,
    originalPrice: 24.99,
    rating: 4.5,
    reviewCount: 120,
  },
  {
    id: "p6",
    title: "Ergonomic Desk Chair - Adjustable",
    image:
      "https://images.pexels.com/photos/4597950/pexels-photo-4597950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    discount: 25,
    currentPrice: 149.99,
    originalPrice: 199.99,
    rating: 4.6,
    reviewCount: 88,
  },
  // Add more products if needed
];

// --- Reusable Components (From previous code) ---

type RatingProps = {
  rating: number;
};

const Rating = ({ rating }: RatingProps): React.JSX.Element => {
  const stars: React.JSX.Element[] = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  const starSize = 12;
  const starColor = "#ffc107";

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <IconFontAwesome
        key={`full-${i}`}
        name="star"
        size={starSize}
        color={starColor}
      />
    );
  }
  if (hasHalfStar) {
    stars.push(
      <IconFontAwesome
        key="half"
        name="star-half-empty"
        size={starSize}
        color={starColor}
      />
    );
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <IconFontAwesome
        key={`empty-${i}`}
        name="star-o"
        size={starSize}
        color={starColor}
      />
    );
  }

  return <View style={styles.ratingContainer}>{stars}</View>;
};

// 💡 ProductGridCard now accepts the router and is an TouchableOpacity
const ProductGridCard = ({
  product,
}: {
  product: Product;
}): React.JSX.Element => {
  const router = useRouter();

  //  Navigation Handler
  const handlePress = () => {
    // Navigates to app/product/[id].tsx (assuming your dynamic screen is setup there)
    router.push(
      `/product/${product.id}?name=${encodeURIComponent(
        product.title
      )}&id=${encodeURIComponent(product.id)}&price=${
        product.currentPrice
      }&image=${encodeURIComponent(
        product.image
      )}&description=${encodeURIComponent(product.rating || "")}`
    );
  };

  return (
    //  Wrap the entire card in TouchableOpacity and use handlePress
    <TouchableOpacity style={styles.productCard} onPress={handlePress}>
      <View>
        
        {/* This wrapper is for structural clarity now */}
        <View style={styles.productImageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{product.discount}%</Text>
          </View>
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productTitle} numberOfLines={2}>
            {product.title}
          </Text>

          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>
              ${product.currentPrice.toFixed(2)}
            </Text>
            <Text style={styles.originalPrice}>
              ${product.originalPrice.toFixed(2)}
            </Text>
          </View>

          <View style={styles.ratingRow}>
            <Rating rating={product.rating} />
            <Text style={styles.reviewCountText}>({product.reviewCount})</Text>
          </View>
        </View>
      </View>

      {/* The Add to Cart button should likely be an inner TouchableOpacity 
               to prevent it from also triggering navigation. We use event stopPropagation here 
               to make sure only the button's action fires. */}
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={(e) => {
          e.stopPropagation(); // Stop the event from bubbling up to the card's TouchableOpacity
          console.log("Adding to cart:", product.id);
        }}
      >
        <Text style={styles.addToCartText}>Add to cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// ------------------------------------------------------------------
// Dynamic Screen Component
// ------------------------------------------------------------------

const CategoryDetailScreen = (): React.JSX.Element => {
  // 💡 2. Initialize the router
  const router = useRouter();

  // 1. Get the parameter passed from the home screen URL
  const { name } = useLocalSearchParams();
  const categoryName = (name as string) || "All Products";

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 2. Configure the Header (using Stack.Screen inside the component) */}
      <Stack.Screen
        options={{
          // Set the header title dynamically using the passed parameter
          title: categoryName,
          // To remove the previous screen's title text next to the back button

          headerTintColor: "#333",
          headerRight: () => (
            <Image
              source={{
                uri: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
              }}
              style={styles.avatar}
            />
          ),
        }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* --- Search Bar & Filter (Copied from the previous listing screen) --- */}
        <View style={styles.searchContainer}>
          <IconFeather name="search" size={20} color="#8a8a8e" />
          <Text style={styles.searchInputPlaceholder}>Search products...</Text>
        </View>

        <View style={styles.filterBar}>
          <TouchableOpacity style={styles.filterButton} onPress={() => router.push('/category/filter')}>
            <IconFeather name="filter" size={16} color="#333" />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.viewCartButton}>
            <Text style={styles.cartCount}>3</Text>
            <Text style={styles.viewCartText}>View cart</Text>
          </TouchableOpacity>
        </View>

        {/* --- Product Grid --- */}
        <View style={styles.productGrid}>
          {/* In a real app, you'd filter productData based on categoryName */}
          {categoryProducts.map((product) => (
            // 💡 3. Pass the router to the ProductGridCard
            <ProductGridCard key={product.id} product={product} />
          ))}
        </View>

        {/* Filler to show the scroll view working */}
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ------------------------------------------------------------------
// Styles (Styles remain the same as the original code)
// ------------------------------------------------------------------

const styles = StyleSheet.create({
  // ... (Your original styles go here)
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    paddingHorizontal: CARD_MARGIN,
    paddingBottom: 20,
  },
  // Header/Avatar
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#eee",
    marginRight: -5,
  },
  // Search Bar
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginVertical: 10,
    marginHorizontal: 0,
  },
  searchInputPlaceholder: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#8a8a8e",
    padding: 0,
  },
  // Filter Bar Styles
  filterBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  filterText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  viewCartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0052cc",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  cartCount: {
    backgroundColor: "white",
    color: "#0052cc",
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    marginRight: 8,
  },
  viewCartText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  // Product Grid Styles
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    // This is now a TouchableOpacity, not just a View
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: CARD_MARGIN,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  productImageContainer: {
    position: "relative",
    height: CARD_WIDTH,
    marginBottom: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#0052cc",
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  discountText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  productInfo: {
    paddingHorizontal: 10,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    minHeight: 38,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginVertical: 4,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 12,
    color: "#8a8a8e",
    textDecorationLine: "line-through",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 1,
  },
  reviewCountText: {
    fontSize: 11,
    color: "#8a8a8e",
    marginLeft: 4,
  },
  addToCartButton: {
    backgroundColor: "#f8f8f8",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingVertical: 10,
    alignItems: "center",
  },
  addToCartText: {
    color: "#0052cc",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default CategoryDetailScreen;
