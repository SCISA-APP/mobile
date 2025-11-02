import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Product } from '@/types/models/shop/product';
import Rating from '../ratings/Rating'; // <-- your shared component

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();

  // Compute average rating from ratings array
  const averageRating =
    product.ratings && product.ratings.length > 0
      ? product.ratings.reduce((sum, r) => sum + r.value, 0) / product.ratings.length
      : 0;

const handlePress = () => {
  router.push({
    pathname: '/(standalone)/product/[productId]',
    params: {
        productId: product.id,
      product: JSON.stringify(product),
    },
  });
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
            <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
          )}
        </View>
        <View style={styles.ratingRow}>
          <Rating rating={averageRating} size={12} /> 
          <Text style={styles.ratingText}>({averageRating.toFixed(1)})</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: { width: 150, marginRight: 16 },
  productImageContainer: { position: 'relative', marginBottom: 8 },
  productImage: { width: '100%', height: 150, borderRadius: 12, backgroundColor: '#f0f0f0' },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#0052cc',
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  discountText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  productInfo: {},
  productTitle: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 4 },
  priceContainer: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 },
  currentPrice: { fontSize: 16, fontWeight: '700', color: '#111' },
  originalPrice: { fontSize: 13, color: '#8a8a8e', textDecorationLine: 'line-through', marginLeft: 6 },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontSize: 12, color: '#8a8a8e', marginLeft: 4, fontWeight: '500' },
});

export default ProductCard;
