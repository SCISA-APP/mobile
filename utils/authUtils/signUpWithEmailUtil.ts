import { supabase } from "@/supabaseConfig";
import type { SignUpData } from "@/types/auth/signUpData";

export const signUpUser = async (data: SignUpData) => {
  console.log('=== SIGNUP PROCESS STARTED ===');
  console.log('Email:', data.email);
  console.log('Full Name:', data.fullName);
  console.log('Program:', data.program);
  console.log('Year:', data.year);

  try {
    console.log('Attempting Supabase auth.signUp...');
    
    // Sign up the user with email confirmation required
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    console.log('Supabase signUp response received');
    console.log('SignUp Data:', JSON.stringify(signUpData, null, 2));
    console.log('SignUp Error:', signUpError);

    if (signUpError) {
      console.error('❌ SignUp Error:', signUpError);
      throw signUpError;
    }

    const user = signUpData.user;
    console.log('User object:', user ? 'EXISTS' : 'NULL');
    console.log('User ID:', user?.id);
    console.log('User Email:', user?.email);
    console.log('Session exists:', signUpData.session ? 'YES' : 'NO');

    if (!user) {
      console.error('❌ No user returned from Supabase');
      throw new Error("User not returned from Supabase");
    }

    // Insert profile
    console.log('Attempting to insert profile...');
    const profileData = {
      id: user.id,
      full_name: data.fullName,
      program: data.program,
      year: data.year,
      expo_push_token: data.expoPushToken ?? null,
      isShopApplicationAccepted: null,
    };
    console.log('Profile data to insert:', profileData);

    const { data: insertedProfile, error: profileError } = await supabase
      .from("profiles")
      .insert(profileData)
      .select();

    console.log('Profile insert response:', insertedProfile);
    console.log('Profile insert error:', profileError);

    if (profileError) {
      console.error('❌ Profile creation error:', profileError);
      console.error('Profile error details:', JSON.stringify(profileError, null, 2));
      // Don't throw - auth account was created
    } else {
      console.log('✅ Profile created successfully');
    }

    console.log('=== SIGNUP PROCESS COMPLETED SUCCESSFULLY ===');
    return { 
      user, 
      session: signUpData.session,
      needsEmailConfirmation: !signUpData.session
    };
  } catch (error: any) {
    console.error('=== SIGNUP PROCESS FAILED ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Full error:', JSON.stringify(error, null, 2));
    console.error('Error stack:', error.stack);
    return { error: error.message || "An error occurred during signup" };
  }
};