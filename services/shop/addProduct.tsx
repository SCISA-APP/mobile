// services/shop/addProduct.ts
import { supabase } from '@/supabaseConfig';
import type { AddProductPayload } from '@/types/models/shop/addProductPayload';

export const addProduct = async (payload: AddProductPayload) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          shop_id: payload.shop_id,
          name: payload.name,
          description: payload.description,
          category: payload.category,
          price: payload.price,
          discount: payload.discount || 0,
          stock: payload.stock,
          status: payload.status,
          front_image: payload.front_image,
          additional_images: payload.additional_images || [],
          sizes: payload.sizes || [],
          colors: payload.colors || [],
          tags: payload.tags || [],
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;

    return data;
  } catch (err) {
    console.error('❌ Failed to add product:', err);
    throw err;
  }
};
