import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/supabaseConfig';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system/legacy';
import type { ShopFormData } from '@/types/models/shop/formData';

/**
 * Uploads an image to Supabase Storage using NEW Expo File API
 */
const uploadImageToSupabase = async (uri: string, path: string): Promise<string> => {
  try {

    // --- NEW EXPO FILE API FIX ---
    // Get file info
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) throw new Error("File does not exist: " + uri);

    // Read file as base64
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const ext = uri.split('.').pop()?.toLowerCase() || "jpg";
    const contentType = ext === "png" ? "image/png" : "image/jpeg";

    // Convert to ArrayBuffer
    const arrayBuffer = decode(base64);

    // Upload
    const { error } = await supabase.storage
      .from("shop-documents")
      .upload(path, arrayBuffer, {
        contentType,
        upsert: true,
      });

    if (error) throw error;

    // Retrieve URL
    const { data: urlData } = supabase.storage
      .from("shop-documents")
      .getPublicUrl(path);

    if (!urlData) throw new Error("Unable to generate public URL");

    console.log("✅ Upload successful:", urlData.publicUrl);
    return urlData.publicUrl;
  } catch (err) {
    console.error("❌ uploadImageToSupabase error:", err);
    throw err;
  }
};

/**
 * Submits a shop application
 */
export const submitShopApplication = async (formData: ShopFormData) => {
  try {
    const userJson = await AsyncStorage.getItem('@student_user');
    if (!userJson) throw new Error('User not logged in');

    const user = JSON.parse(userJson);
    const uid = user.uid;
     console.log("🟦 User submitting application:", uid);

    console.log("🚀 Starting upload for user:", uid);

    const ts = Date.now();

    // Upload both images
    const studentIdUrl = await uploadImageToSupabase(
      formData.studentIdUri,
      `${uid}/student_id_${ts}.jpg`
    );

    const nationalIdUrl = await uploadImageToSupabase(
      formData.nationalIdUri,
      `${uid}/national_id_${ts}.jpg`
    );

    // Insert into shop_application
    const { error: insertError } = await supabase
      .from('shop_application')
      .insert({
        user_id: uid,
        store_name: formData.storeName,
        shop_description: formData.shopDescription,
        student_id_url: studentIdUrl,
        national_id_url: nationalIdUrl,
        payment_type: formData.paymentType,
        bank_name: formData.bankName ?? null,
        mobile_provider: formData.mobileProvider ?? null,
        account_number: formData.accountNumber,
        account_name: formData.accountName,
        status: 'pending',
        product_count: 0,
      });

    if (insertError) throw insertError;

    // Update profile
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ isShopApplicationAccepted: false })
      .eq('id', uid);

    if (updateError) throw updateError;

    // Update local cached user
    await AsyncStorage.mergeItem(
      '@student_user',
      JSON.stringify({ isShopApplicationAccepted: false })
    );

    console.log("✅ Shop application submitted successfully");
    return { success: true };
  } catch (err: any) {
    console.error("❌ Error submitting shop application:", err.message || err);
    return { success: false, error: err.message || err };
  }
};
