import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  ListRenderItemInfo,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// --- Icon Setup ---
// Replaced 'react-native-vector-icons' with '@expo/vector-icons'
import IconFeather from '@expo/vector-icons/Feather';
import IconFontAwesome from '@expo/vector-icons/FontAwesome';
import Book from '../../../assets/categoryicon/Department.png';
import Light from '../../../assets/categoryicon/desklamp.png';
import Tshirt from '../../../assets/categoryicon/fashion.png';
import Love from '../../../assets/categoryicon/heart.png';
import Screen from '../../../assets/categoryicon/monitor.png';
import Dumbell from '../../../assets/categoryicon/sports.png';



// --- Type Definitions ---

type Category = {
  id: string;
  name: string;
  icon: ImageSourcePropType; // Image source for category icon
};

type Product = {
  id: string;
  title: string;
  image: string ;
  currentPrice: number;
  rating: number;
  discount?: number; // Optional property
  originalPrice?: number; // Optional property
};

// --- Mock Data ---

const categoryData: Category[] = [
  { id: '1', name: 'Fashion', icon: Tshirt },
  { id: '2', name: 'Home & Kitchen', icon: Light  },
  { id: '3', name: 'Beauty', icon: Love },
  { id: '4', name: 'Sports & Outdoors', icon: Dumbell },
   { id: '5', name: 'Phone & Accessories', icon: Screen  },
   { id: '6', name: 'Department', icon: Book },

];

const featuredProducts: Product[] = [
  {
    id: 'f1',
    title: 'ch Series 7 with EC...',
    image: 'https://images.pexels.com/photos/5054541/pexels-photo-5054541.jpeg' ,
    discount: 20,
    currentPrice: 199.99,
    originalPrice: 249.99,
    rating: 4.5,
  },
  {
    id: 'f2',
    title: 'Noise-Cancelling He...',
    image:  'https://images.pexels.com/photos/776998/pexels-photo-776998.jpeg' ,
    currentPrice: 129.00,
    rating: 4.8,
  },
];

const limitedTimeDeals: Product[] = [
  {
    id: 'l1',
    title: 'ed Smart Kitchen...',
    image:  'https://images.pexels.com/photos/6824660/pexels-photo-6824660.jpeg',
    discount: 25,
    currentPrice: 79.50,
    originalPrice: 99.00,
    rating: 4.2,
  },
  {
    id: 'l2',
    title: 'le Running Sneak...',
    image:  'https://images.pexels.com/photos/28879459/pexels-photo-28879459.jpeg',
    currentPrice: 85.00,
    rating: 4.7,
  },
];

const newArrivals: Product[] = [
  {
    id: 'n1',
    title: 't Automatic Coffee...',
    image:  'https://images.pexels.com/photos/30946799/pexels-photo-30946799.jpeg',
    discount: 17,
    currentPrice: 349.00,
    originalPrice: 420.00,
    rating: 4.6,
  },
  {
    id: 'n2',
    title: 'e Outdoor Travel Ba...',
    image:'https://images.pexels.com/photos/16359255/pexels-photo-16359255.jpeg',
    currentPrice: 59.99,
    rating: 4.3,
  },
];

// --- Reusable Components ---

type RatingProps = {
  rating: number;
};

const Rating = ({ rating }: RatingProps): React.JSX.Element => {
  const stars: React.JSX.Element[] = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <IconFontAwesome key={`full-${i}`} name="star" size={12} color="#ffc107" />,
    );
  }
  if (hasHalfStar) {
    stars.push(
      <IconFontAwesome
        key="half"
        name="star-half-empty"
        size={12}
        color="#ffc107"
      />,
    );
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <IconFontAwesome
        key={`empty-${i}`}
        name="star-o"
        size={12}
        color="#ffc107"
      />,
    );
  }

  return <View style={styles.ratingContainer}>{stars}</View>;
};

type ProductCardProps = {
  product: Product;
};

// Renamed 'index' to 'ProductCard' as it's the standard convention
const ProductCard = ({ product }: ProductCardProps): React.JSX.Element => {
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
    <TouchableOpacity style={styles.productCard} onPress={handlePress}>
      <View style={styles.productImageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        {product.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{product.discount}%</Text>
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={1}>
          {product.title}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>${product.currentPrice.toFixed(2)}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>
              ${product.originalPrice.toFixed(2)}
            </Text>
          )}
        </View>
        <View style={styles.ratingRow}>
          <Rating rating={product.rating} />
          <Text style={styles.ratingText}>({product.rating})</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// --- Main App Screen ---

const App = (): React.JSX.Element => {
  // --- Render Functions for FlatLists ---
  const router = useRouter();

  const renderCategoryItem = ({
      item,
    }: ListRenderItemInfo<Category>): React.JSX.Element => {
        
        //  NAVIGATION HANDLER: Uses router.push() with the dynamic URL
        const handleCategoryPress = () => {
            // Target file: app/category/[name].tsx
            // URL: /category/Fashion, /category/Home & Kitchen, etc.
            router.push(`/category/${item.name}`); 
        };

        return (
            <TouchableOpacity 
                style={styles.categoryItem}
                // 💡 ATTACH HANDLER TO ONPRESS
                onPress={handleCategoryPress}
            >
              <View style={styles.categoryIconCircle}>
                <Image source={item.icon} style={{ width: 20, height: 20 }} />
              </View>
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    const renderProductItem = ({
      item,
    }: ListRenderItemInfo<Product>): React.JSX.Element => (
      <ProductCard product={item} />
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>SCISA Store</Text>
          <View style={styles.headerIcons}>
            <IconFeather name="bell" size={24} color="#333" />
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg' }}
              style={styles.avatar}
            />
          </View>
        </View>

        {/* --- Search Bar --- */}
        <View style={styles.searchContainer}>
          <IconFeather name="search" size={20} color="#8a8a8e" />
          <TextInput
            placeholder="Search products..."
            style={styles.searchInput}
            placeholderTextColor="#8a8a8e"
          />
        </View>

        {/* --- Categories --- */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shop by Category</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={categoryData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderCategoryItem}
            contentContainerStyle={styles.categoryListContent}
          />
        </View>

        {/* --- Featured Products --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <FlatList
            data={featuredProducts}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderProductItem}
            contentContainerStyle={styles.productListContent}
          />
        </View>

        {/* --- Limited Time Deals --- */}
        <View style={[styles.section, styles.dealsSectionBackground]}>
          <Text style={styles.sectionTitle}>Limited Time Deals</Text>
          <FlatList
            data={limitedTimeDeals}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderProductItem}
            contentContainerStyle={styles.productListContent}
          />
        </View>

        {/* --- New Arrivals --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>New Arrivals</Text>
          <FlatList
            data={newArrivals}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderProductItem}
            contentContainerStyle={styles.productListContent}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Styles ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 16,
    backgroundColor: '#eee',
  },
  // Search Bar
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginVertical: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
    padding: 0, // for Android
  },
  // Sections
  section: {
    marginVertical: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  seeAll: {
    fontSize: 14,
    color: '#007aff',
    fontWeight: '500',
  },
  // Categories
  categoryListContent: {
    paddingLeft: 2, // Small padding for shadow/glow if any
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 24,
    width: 70, // To ensure "Home & Kitchen" wraps or is handled
  },
  categoryIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#eef2f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  // Product Lists
  productListContent: {
    paddingTop: 4, // Space for shadows
  },
  dealsSectionBackground: {
    backgroundColor: '#f0f5ff', // Light blue background
    borderRadius: 16,
    padding: 16,
    marginHorizontal: -5, // Slightly extend
  },
  // Product Card
  productCard: {
    width: 150,
    marginRight: 16,
  },
  productImageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#0052cc',
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  discountText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  productInfo: {
    // No specific styles needed, just a container
  },
  productTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  originalPrice: {
    fontSize: 13,
    color: '#8a8a8e',
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    color: '#8a8a8e',
    marginLeft: 4,
    fontWeight: '500',
  },
});

export default App;