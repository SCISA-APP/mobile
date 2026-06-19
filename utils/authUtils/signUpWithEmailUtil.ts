// /utils/authUtils/signUpWithEmailUtil.ts
import { supabase } from "@/supabaseConfig";

export const signUpWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  if (!data.user) throw new Error('Sign up failed: no user returned.');

  return data.user;
};