// context/ShopContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCachedUser } from '@/utils/authUtils/getCachedUser';
import { getShopInfo } from '@/services/shop/getShopInfo';
import { supabase } from '@/supabaseConfig';
import { addProduct } from '@/services/shop/addProduct';
import type { AddProductPayload } from '@/types/models/shop/addProductPayload';
import { getShopProducts } from '@/services/shop/getShopProducts';

interface ShopContextData {
  shop: any | null;
  loading: boolean;
  refreshShop: () => Promise<void>;
  
  addProduct: (payload: Omit<AddProductPayload, 'shop_id'>) => Promise<any>;
}

const ShopContext = createContext<ShopContextData | undefined>(undefined);

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const [shop, setShop] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshShop = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.warn('⚠️ No Supabase session found - RLS will block queries');
      }

      const user = await getCachedUser(); 
      if (!user?.id) {
        console.warn('⚠️ No cached user found.');
        setShop(null);
        return;
      }

      const shopInfo = await getShopInfo(user.id);
      setShop(shopInfo || null);
    } catch (error) {
      console.error('❌ Failed to fetch shop info:', error);
      setShop(null);
    } finally {
      setLoading(false);
    }
  };

  // New function to add product using the current shop ID
  const addProductToShop = async (payload: Omit<AddProductPayload, 'shop_id'>) => {
    if (!shop?.id) throw new Error('No shop available to add product');
    return addProduct({ ...payload, shop_id: shop.id });
  };

    // Fetch products for current shop
  const fetchProductsForShop = async (): Promise<any[]> => {
    if (!shop?.id) return [];
    return getShopProducts(shop.id);
  };

  useEffect(() => {
    refreshShop();
  }, []);

  return (
    <ShopContext.Provider value={{ shop, loading, 
        refreshShop, 
    addProduct: addProductToShop,
    fetchProducts: fetchProductsForShop  }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used inside ShopProvider');
  return ctx;
};
