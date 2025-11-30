// utils/cartUtils.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddProductPayload } from '@/types/models/shop/addProductPayload';
import { CartItem } from '@/types/models/shop/cartItem';

const CART_KEY = '@user_cart';

// Get cart from storage
export const getCart = async (): Promise<CartItem[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(CART_KEY);
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error fetching cart', e);
    return [];
  }
};

// Add product to cart (or increase quantity if it already exists)
export const addToCart = async (product: AddProductPayload, qty: number = 1): Promise<void> => {
  try {
    const currentCart = await getCart();
    const existingIndex = currentCart.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
      // Product exists, increase quantity
      currentCart[existingIndex].quantity += qty;
    } else {
      // Add new product with quantity
      const newCartItem: CartItem = { ...product, quantity: qty };
      currentCart.push(newCartItem);
    }

    await AsyncStorage.setItem(CART_KEY, JSON.stringify(currentCart));
  } catch (e) {
    console.error('Error adding product to cart', e);
  }
};

// Decrease quantity of a product (or remove if quantity <= 1)
export const decreaseQuantity = async (productId: string, qty: number = 1): Promise<void> => {
  try {
    const currentCart = await getCart();
    const existingIndex = currentCart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
      if (currentCart[existingIndex].quantity > qty) {
        currentCart[existingIndex].quantity -= qty;
      } else {
        // Remove product if quantity drops to 0 or less
        currentCart.splice(existingIndex, 1);
      }
      await AsyncStorage.setItem(CART_KEY, JSON.stringify(currentCart));
    }
  } catch (e) {
    console.error('Error decreasing product quantity', e);
  }
};

//update cart quantity 
export const updateCartItemQuantity = async (productId: string, quantity: number) => {
  try {
    const currentCart = await getCart();
    const updatedCart = currentCart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  } catch (e) {
    console.error('Error updating quantity', e);
  }
};


// Remove product completely from cart
export const removeFromCart = async (productId: string): Promise<void> => {
  try {
    const currentCart = await getCart();
    const updatedCart = currentCart.filter(item => item.id !== productId);
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  } catch (e) {
    console.error('Error removing product from cart', e);
  }
};

// Clear entire cart
export const clearCart = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(CART_KEY);
  } catch (e) {
    console.error('Error clearing cart', e);
  }
};
export { CartItem };

