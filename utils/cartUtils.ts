import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddProductPayload } from '@/types/models/shop/addProductPayload';
import { CartItem } from '@/types/models/shop/cartItem';

const CART_KEY = '@user_cart';

// Fallback storage for web
const storageAvailable = Platform.OS !== 'web';

const safeGetItem = async (key: string): Promise<string | null> => {
  if (!storageAvailable) return null;
  return AsyncStorage.getItem(key);
};

const safeSetItem = async (key: string, value: string) => {
  if (!storageAvailable) return;
  return AsyncStorage.setItem(key, value);
};

const safeRemoveItem = async (key: string) => {
  if (!storageAvailable) return;
  return AsyncStorage.removeItem(key);
};

// Get cart from storage
export const getCart = async (): Promise<CartItem[]> => {
  try {
    const jsonValue = await safeGetItem(CART_KEY);
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
      currentCart[existingIndex].quantity += qty;
    } else {
      currentCart.push({ ...product, quantity: qty });
    }

    await safeSetItem(CART_KEY, JSON.stringify(currentCart));
  } catch (e) {
    console.error('Error adding product to cart', e);
  }
};

// Decrease quantity of a product
export const decreaseQuantity = async (productId: string, qty: number = 1): Promise<void> => {
  try {
    const currentCart = await getCart();
    const existingIndex = currentCart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
      if (currentCart[existingIndex].quantity > qty) {
        currentCart[existingIndex].quantity -= qty;
      } else {
        currentCart.splice(existingIndex, 1);
      }
      await safeSetItem(CART_KEY, JSON.stringify(currentCart));
    }
  } catch (e) {
    console.error('Error decreasing product quantity', e);
  }
};

// Update cart item quantity
export const updateCartItemQuantity = async (productId: string, quantity: number) => {
  try {
    const currentCart = await getCart();
    const updatedCart = currentCart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    await safeSetItem(CART_KEY, JSON.stringify(updatedCart));
  } catch (e) {
    console.error('Error updating quantity', e);
  }
};

// Remove product completely
export const removeFromCart = async (productId: string): Promise<void> => {
  try {
    const currentCart = await getCart();
    const updatedCart = currentCart.filter(item => item.id !== productId);
    await safeSetItem(CART_KEY, JSON.stringify(updatedCart));
  } catch (e) {
    console.error('Error removing product from cart', e);
  }
};

// Clear cart
export const clearCart = async (): Promise<void> => {
  try {
    await safeRemoveItem(CART_KEY);
  } catch (e) {
    console.error('Error clearing cart', e);
  }
};

export { CartItem };
