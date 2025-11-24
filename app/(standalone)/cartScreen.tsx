// CartScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { getCart, removeFromCart, CartItem, updateCartItemQuantity } from '@/utils/cartUtils';
import CartCard from '@/components/cards/CartCard';
import SearchEmptyState from '@/components/empty/SearchEmptyState';
import Empty from "../../assets/images/Empty.gif";
import CustomButton from '@/components/buttons/CustomButton';
import { useRouter } from 'expo-router';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  const loadCart = async () => {
    const items = await getCart();
    setCartItems(items);
  };

  useEffect(() => {
    loadCart();
  }, []);

const handleRemove = async (id: string) => {
  try {
    await removeFromCart(id);  // remove from storage
    await loadCart();          // reload cart to reset UI state
  } catch (error) {
    console.error('Error removing item:', error);
  }
};



  const handleQuantityChange = async (id: string, newQuantity: number) => {
    await updateCartItemQuantity(id, newQuantity);
    loadCart();
  };

  const handleShopNow = () => {
    router.replace("../../(tabs)/store");
  };

  const handleCheckout = () => {
    router.push({
      pathname: '../../(tabs)/checkout',
      params: { cart: JSON.stringify(cartItems) }, // pass cart data
    });
  };

  // Calculate total
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <SearchEmptyState
            message="Your cart is empty. Start adding products!"
            imageSource={Empty}
          />
          <CustomButton
            label="Shop Now"
            onPress={handleShopNow}
          />
        </View>
      ) : (
        <>
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
            contentContainerStyle={{ paddingBottom: 120 }}
          />

          {/* --- Checkout Bottom Bar --- */}
          <View style={styles.checkoutBar}>
            <CustomButton
              label={`Checkout: GHC ${totalAmount.toFixed(2)}`}
              onPress={handleCheckout}
             
            />
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  checkoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
