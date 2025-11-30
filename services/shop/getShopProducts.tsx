// services/shop/getShopProducts.ts
import { supabase } from '@/supabaseConfig';

export const getShopProducts = async (shop_id: string) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('shop_id', shop_id)
      .order('created_at', { ascending: false }); // newest first

    if (error) throw error;

    return data;
  } catch (err) {
    console.error('❌ Failed to fetch shop products:', err);
    throw err;
  }
};
