import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AddProductPayload } from '@/types/models/shop/addProductPayload';
import { Ionicons } from '@expo/vector-icons';
import colors from '@/constants/colors';

type EditProductCardProps = {
  product: AddProductPayload;
  onEdit: (product: AddProductPayload) => void;
  cardWidth?: number;
};

const EditProductCard = ({ product, onEdit, cardWidth }: EditProductCardProps) => {
  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice = hasDiscount
    ? product.price * (1 - product.discount! / 100)
    : product.price;

  // Stock color logic
let stockColor = colors.green?.[500] || '#28a745'; // fallback to green hex
if (product.stock < 5) stockColor = colors.error?.[500] || '#ff0000';
else if (product.stock <= 20) stockColor = '#FFA500'; // orange

  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <Image source={{ uri: product.front_image }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {product.name}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.currentPrice}>${discountedPrice.toFixed(2)}</Text>
          {hasDiscount && (
            <Text style={styles.originalPrice}>${product.price.toFixed(2)}</Text>
          )}
        </View>

        <Text style={[styles.stock, { color: stockColor }]}>
          Stock: {product.stock}
        </Text>

        <TouchableOpacity onPress={() => onEdit(product)} style={styles.editButton}>
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  infoContainer: {
    padding: 10,
  },
  title: { fontSize: 16, fontWeight: '600', color: '#111', marginBottom: 2 },
  category: { fontSize: 13, color: '#555', marginBottom: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 },
  currentPrice: { fontSize: 16, fontWeight: '700', color: '#111' },
  originalPrice: { fontSize: 13, color: '#8a8a8e', textDecorationLine: 'line-through', marginLeft: 6 },
  stock: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0052cc',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: { color: '#fff', marginLeft: 4, fontWeight: '500', fontSize: 13 },
});
