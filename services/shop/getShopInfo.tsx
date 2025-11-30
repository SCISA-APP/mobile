// /services/shop/getShopInfo.ts
import { supabase } from "@/supabaseConfig";

export const getShopInfo = async (userId: string) => {
  console.log('🔍 Querying shop_application for user_id:', userId);
  
  const { data, error } = await supabase
    .from('shop_application')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    console.error('❌ Supabase shop query error:', error);
    return null;
  }

  console.log('✅ Shop query result:', data);
  console.log('📊 Data exists:', !!data);
  
  return data || null;
};