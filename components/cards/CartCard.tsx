import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { Product } from '@/types/models/shop/product';
import { FontAwesome } from '@expo/vector-icons';

type CartCardProps = {
  product: Product;
  initialQuantity?: number;
  onRemove?: () => void;
  onQuantityChange?: (newQuantity: number) => void;
};

const CartCard = ({ product, initialQuantity = 1, onRemove, onQuantityChange }: CartCardProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  // Update parent when quantity changes
  useEffect(() => {
    onQuantityChange && onQuantityChange(quantity);
  }, [onQuantityChange, quantity]);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // Discount calculations
  const hasDiscount = product.discount && product.discount > 0;
  const pricePerUnit = hasDiscount
    ? product.price * (1 - product.discount! / 100)
    : product.price;
  const totalPrice = (pricePerUnit * quantity).toFixed(2);
  const savedAmount = hasDiscount ? (product.price - pricePerUnit) * quantity : 0;

  // Handle remove with confirmation
  const handleRemove = () => {
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove "${product.title}" from the cart?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: onRemove },
      ]
    );
  };

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: product.image }} style={styles.productImage} />

      <View style={styles.infoContainer}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {product.title}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.priceText}>${totalPrice}</Text>
          {hasDiscount && (
            <Text style={styles.originalPrice}>
              ${(product.price * quantity).toFixed(2)}
            </Text>
          )}
        </View>

        {hasDiscount && (
          <Text style={styles.discountText}>
            You save ${savedAmount.toFixed(2)}!
          </Text>
        )}

        {/* Quantity controls */}
        <View style={styles.quantityRow}>
          <TouchableOpacity style={styles.qtyButton} onPress={decrement}>
            <Text style={styles.qtyButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{quantity}</Text>

          <TouchableOpacity style={styles.qtyButton} onPress={increment}>
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>

          {/* Remove button */}
          {onRemove && (
            <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
              <FontAwesome name="trash" size={20} color="red" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  infoContainer: { flex: 1, justifyContent: 'space-between' },
  productTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginVertical: 6 },
  priceText: { fontSize: 16, fontWeight: '700', color: '#111' },
  originalPrice: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  discountText: {
    color: '#0052cc', // blue color
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonText: { fontSize: 18, fontWeight: '600' },
  quantityText: { marginHorizontal: 12, fontSize: 16, fontWeight: '600' },
  removeButton: { marginLeft: 'auto', paddingHorizontal: 8, paddingVertical: 4 },
});
