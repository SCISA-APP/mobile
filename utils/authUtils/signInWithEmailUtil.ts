// utils/authUtils/signInWithEmailUtil.ts
import { supabase } from '@/supabaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SignInData } from '@/types/auth/signInData';

export const signInUser = async (data: SignInData) => {
  try {
    // 1️⃣ Sign in with Supabase Auth
    const { data: signInData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) throw error;

    const user = signInData.user;
    const session = signInData.session;

    if (!user || !session) {
      throw new Error('Login failed: user or session not returned');
    }

    // 2️⃣ Fetch additional user profile info from 'profiles' table
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) throw profileError;

    // 3️⃣ Store user and session in AsyncStorage
   await AsyncStorage.setItem(
  '@student_user',
  JSON.stringify({
    uid: user.id,
    id: user.id,
    email: user.email,
    full_name: profileData?.full_name ?? '',
    program: profileData?.program ?? '',
    year: profileData?.year ?? 0,
    permission: profileData?.permission ?? 'user',
    expoPushToken: profileData?.expo_push_token ?? null,
    isShopApplicationAccepted: profileData?.isShopApplicationAccepted
  })
);

    // ✅ Return success
    return { user, session, profileData };
  } catch (err: any) {
    console.error('Login error:', err.message);
    return { error: err.message };
  }
};
