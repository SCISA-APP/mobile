import { productService } from '@/services/shop/getProducts';
import Rating from '@/components/ratings/Rating';
import IconFontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import ColorSelector from '@/components/inputs/ColorSelector';
import SizeSelector from '@/components/inputs/SizeSelectorOption';
import { colorPalette } from '@/assets/data/shop/colorPalette';
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

  const cachedProducts = productService.getCachedProducts();
  const product = cachedProducts.find(p => p.id === productId);

  console.log("🛍️ Product ID:", productId);
  console.log("🛒 Loaded Product:", product);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: Product not found.</Text>
      </View>
    );
  }

  const combinedImages = [
    ...(product.front_image ? [product.front_image] : []),
    ...(product.additional_images || []),
  ];

  const averageRating =
    product.ratings && product.ratings.length > 0
      ? product.ratings.reduce((sum, r) => sum + r.value, 0) / product.ratings.length
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
        {/* Product Images */}
        <ProductImage images={combinedImages} />

        {/* Product Info */}
        <View style={styles.content}>
          <Text style={styles.brandText}>Product Name</Text>
          <Text style={styles.name}>{product.name}</Text>

          {/* Price Section */}
          <View style={styles.priceRow}>
            <Text style={styles.currentPrice}>
              ₵ {discountedPrice.toFixed(2)}
            </Text>
            {hasDiscount && (
              <Text style={styles.originalPrice}>
                ₵ {product.price.toFixed(2)}
              </Text>
            )}
          </View>

          {/* Rating Summary */}
          <View style={styles.ratingSummary}>
            <Rating rating={averageRating} size={18} />
            <Text style={styles.ratingSummaryText}>
              {averageRating.toFixed(1)} out of 5 stars
            </Text>
          </View>

          {/* Discount Badge */}
          {hasDiscount && (
            <Text style={styles.discountText}>
              Save {product.discount}%!
            </Text>
          )}

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>
        </View>

        {/* Product Details Section */}
        <View style={styles.detailsSection}>
          {/* Colors - only show if available */}
          {product.colors && product.colors.length > 0 && (
            <View style={styles.optionSection}>
              <ColorSelector
                colorsList={product.colors.map((colorName: string) => {
                  const match = colorPalette.find(
                    (c) => c.name.toLowerCase() === colorName.toLowerCase()
                  );
                  return match || { name: colorName, hex: '#888' };
                })}
                selectedColors={[]}
                onSelect={() => {}}
              />
            </View>
          )}

          {/* Sizes - only show if available */}
          {product.sizes && product.sizes.length > 0 && (
            <View style={styles.optionSection}>
              <SizeSelector
                sizes={product.sizes}
                selectedSizes={[]}
                onSelect={() => {}}
              />
            </View>
          )}

          {/* Product Reviews */}
          <ProductReviews
            ratings={product.ratings || []}
            averageRating={averageRating}
          />
        </View>
      </ScrollView>

      {/* Static Footer Button */}
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
  fullScreenContainer: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  container: { 
    flex: 1 
  },
  scrollContent: { 
    paddingBottom: 140 
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    paddingBottom: 20,
  },
  brandText: { 
    fontSize: 14, 
    color: colors.text.secondary, 
    marginBottom: 4 
  },
  name: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: colors.text.primary, 
    marginBottom: 8 
  },
  priceRow: { 
    flexDirection: 'row', 
    alignItems: 'baseline', 
    marginBottom: 5 
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text.primary,
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 18,
    color: colors.text.secondary,
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
    color: colors.text.primary,
  },
  description: { 
    fontSize: 15, 
    lineHeight: 22, 
    color: colors.text.secondary, 
    marginTop: 10 
  },
  detailsSection: { 
    paddingHorizontal: 20, 
    paddingVertical: 10 
  },
  optionSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  accordionTitle: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: colors.text.primary 
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  errorText: { 
    textAlign: 'center', 
    marginTop: 50, 
    fontSize: 18, 
    color: colors.error 
  },
});