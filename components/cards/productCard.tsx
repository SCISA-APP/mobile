import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Product } from '@/types/models/shop/product';
import Rating from '../ratings/Rating';

type ProductCardProps = {
  product: Product;
  cardWidth?: number; // dynamically set width
};

const ProductCard = ({ product, cardWidth }: ProductCardProps) => {
  const router = useRouter();

  const averageRating =
    product.ratings && product.ratings.length > 0
      ? product.ratings.reduce((sum, r) => sum + r.value, 0) / product.ratings.length
      : 0;

  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice = hasDiscount
    ? product.price * (1 - product.discount! / 100)
    : product.price;

  const handlePress = () => {
    router.push({
      pathname: '/(standalone)/product/[productId]',
      params: { productId: product.id },
    });
  };

  return (
    <TouchableOpacity style={[styles.productCard, { width: cardWidth }]} onPress={handlePress}>
      <View style={styles.productImageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        {hasDiscount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{product.discount?.toString()}%</Text>
          </View>
        )}
      </View>

      <Text style={styles.productTitle} numberOfLines={1}>
        {product.title}
      </Text>

      <View style={styles.priceContainer}>
        <Text style={styles.currentPrice}>${discountedPrice.toFixed(2)}</Text>
        {hasDiscount && (
          <Text style={styles.originalPrice}>${product.price.toFixed(2)}</Text>
        )}
      </View>

      <View style={styles.ratingRow}>
        <Rating rating={averageRating} size={12} />
        <Text style={styles.ratingText}>({averageRating.toFixed(1)})</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: { marginBottom: 12 },
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
  productTitle: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 4 },
  priceContainer: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 },
  currentPrice: { fontSize: 16, fontWeight: '700', color: '#111' },
  originalPrice: { fontSize: 13, color: '#8a8a8e', textDecorationLine: 'line-through', marginLeft: 6 },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontSize: 12, color: '#8a8a8e', marginLeft: 4, fontWeight: '500' },
});

export default ProductCard;
