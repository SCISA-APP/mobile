import { exampleProducts } from '@/assets/data/shop/product';
import Rating from '@/components/ratings/Rating';
import IconFontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ProductImage from '@/components/carousel/ProductImage';
import ProductReviews from '@/components/ratings/ProductReviews';
import CustomButton from '@/components/buttons/CustomButton';
import { addToCart } from '@/utils/cartUtils';
import FloatingCartButton from '@/components/buttons/FloatingCartButton';
import colors from '@/constants/colors';

export default function ProductDetailScreen() {
  const params = useLocalSearchParams();
  const productId = params.productId as string;

  const product = exampleProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: Product not found.</Text>
      </View>
    );
  }

  const combinedImages = [
    ...(product.image ? [product.image] : []),
    ...(product.images || []),
  ];

  const averageRating =
    product.ratings && product.ratings.length > 0
      ? product.ratings.reduce((sum, r) => sum + r.value, 0) /
        product.ratings.length
      : 0;

  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice = hasDiscount
    ? product.price * (1 - product.discount! / 100)
    : product.price;

  return (
    <View style={styles.fullScreenContainer}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <ProductImage images={combinedImages} />

        <View style={styles.content}>
          <Text style={styles.brandText}>Brand Name</Text>
          <Text style={styles.name}>{product.title}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.currentPrice}>
              ${discountedPrice.toFixed(2)}
            </Text>
            {hasDiscount && (
              <Text style={styles.originalPrice}>
                ${product.price.toFixed(2)}
              </Text>
            )}
          </View>

          <View style={styles.ratingSummary}>
            <Rating rating={averageRating} size={18} />
            <Text style={styles.ratingSummaryText}>
              {averageRating.toFixed(1)} out of 5 stars
            </Text>
          </View>

          {hasDiscount && (
            <Text style={styles.discountText}>
              Save {product.discount}%!
            </Text>
          )}

          <Text style={styles.description}>
            Experience premium quality with this product. Designed for comfort
            and superior performance.
          </Text>
        </View>

        <View style={styles.detailsSection}>
          <TouchableOpacity style={styles.accordionHeader}>
            <Text style={styles.accordionTitle}>Product Specifications</Text>
            <IconFontAwesome name="angle-down" size={20} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.accordionHeader}>
            <Text style={styles.accordionTitle}>Customer Questions</Text>
            <IconFontAwesome name="angle-down" size={20} color="#555" />
          </TouchableOpacity>

          <ProductReviews
            ratings={product.ratings || []}
            averageRating={averageRating}
          />
        </View>
      </ScrollView>

      {/* Footer "Add to Cart" button */}
      <View style={styles.footer}>
        <CustomButton
          label="Add to Cart"
          onPress={async () => {
            await addToCart(product);
            alert('Product added to cart ✅');
          }}
        />
      </View>

      {/* Floating Cart Button */}
      <FloatingCartButton />
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  scrollContent: { paddingBottom: 140 }, // leave space for footer + floating button
  content: {
    paddingHorizontal: 20,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 20,
  },
  brandText: { fontSize: 14, color: '#666', marginBottom: 4 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 5 },
  currentPrice: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 18,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  discountText: {
    color: colors.secondaryDark,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  ratingSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  ratingSummaryText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  description: { fontSize: 15, lineHeight: 22, color: '#555', marginTop: 10 },
  detailsSection: { paddingHorizontal: 20, paddingVertical: 10 },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  accordionTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 80, // above footer
    right: 20,
    zIndex: 10,
  },
  errorText: { textAlign: 'center', marginTop: 50, fontSize: 18, color: 'red' },
});
