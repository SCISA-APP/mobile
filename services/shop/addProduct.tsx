import { supabase } from '@/supabaseConfig';
import type { AddProductPayload } from '@/types/models/shop/addProductPayload';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system/legacy';

/**
 * Upload an image file to Supabase Storage using ArrayBuffer
 */
const uploadImage = async (uri: string, path: string): Promise<string> => {
  try {
    if (!uri) throw new Error("File URI is undefined");
    
    // Get file info
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) throw new Error("File does not exist: " + uri);

    // Read file as base64
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Determine content type from file extension
    const ext = uri.split('.').pop()?.toLowerCase() || 'jpg';
    const contentType = ext === 'png' ? 'image/png' : 'image/jpeg';

    // Convert base64 to ArrayBuffer
    const arrayBuffer = decode(base64);
    
    console.log(`📤 Uploading image to ${path}`);
    
    // Upload to Supabase Storage
    const { error } = await supabase.storage
      .from('products')
      .upload(path, arrayBuffer, { 
        contentType, 
        upsert: true 
      });
    
    if (error) throw error;
    
    // Retrieve public URL
    const { data: urlData } = supabase.storage
      .from('products')
      .getPublicUrl(path);
    
    if (!urlData?.publicUrl) throw new Error("Failed to get public URL");
    
    console.log(`✅ Upload successful: ${urlData.publicUrl}`);
    return urlData.publicUrl;
    
  } catch (err) {
    console.error("❌ uploadImage error:", err);
    throw err;
  }
};

/**
 * Add a product to Supabase with images uploaded
 */
export const addProduct = async (payload: AddProductPayload) => {
  try {
    // Upload front image
    let frontImageUrl: string | null = null;
    if (payload.front_image) {
      frontImageUrl = await uploadImage(
        payload.front_image,
        `shops/${payload.shop_id}/front_${Date.now()}.jpg`
      );
    }

    // Upload additional images
    const validAdditionalImages = (payload.additional_images || []).filter(Boolean);
    const additionalImageUrls: string[] = [];
    for (let i = 0; i < validAdditionalImages.length; i++) {
      additionalImageUrls.push(
        await uploadImage(
          validAdditionalImages[i],
          `shops/${payload.shop_id}/extra_${i}_${Date.now()}.jpg`
        )
      );
    }

    // Insert product record with uploaded image URLs
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
          front_image: frontImageUrl,
          additional_images: additionalImageUrls,
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