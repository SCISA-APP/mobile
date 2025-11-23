import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { getCart, removeFromCart, CartItem, updateCartItemQuantity } from '@/utils/cartUtils';
import CartCard from '@/components/cards/CartCard';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const loadCart = async () => {
    const items = await getCart();
    setCartItems(items);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = async (id: string) => {
    await removeFromCart(id);
    loadCart();
  };

  const handleQuantityChange = async (id: string, newQuantity: number) => {
    await updateCartItemQuantity(id, newQuantity);
    loadCart();
  };

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CartCard
              product={item}
              initialQuantity={item.quantity ?? 1}
              onRemove={() => handleRemove(item.id)}
              onQuantityChange={(newQty) => handleQuantityChange(item.id, newQty)}
            />
          )}
        />
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#888' },
});
