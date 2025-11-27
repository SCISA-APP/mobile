import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import colors from '../../constants/colors';
import Logo from '../../assets/images/logo.jpeg';
import { supabase } from '@/supabaseConfig';

const WelcomeScreen: React.FC = () => {
  const router = useRouter();

useEffect(() => {
  let authListener: any;

  const init = async () => {
    // Splash delay
    await new Promise(res => setTimeout(res, 1500));

    const storedUser = await AsyncStorage.getItem("@student_user");
    const hasOpenedBefore = await AsyncStorage.getItem("hasOpenedBefore");

    console.log("⏳ Waiting for Supabase session to hydrate...");

    // Wait for Supabase to restore the session
    const waitForSession = new Promise((resolve) => {
      authListener = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          console.log("✅ Supabase session restored:", session.user.id);
          resolve(session);
        }
      });

      // Failsafe: after 4 seconds, proceed even if no session
      setTimeout(() => resolve(null), 4000);
    });

    const session: any = await waitForSession;

    if (session) {
      const uid = session.user.id;

      // Fetch latest user info from Supabase
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', uid)
        .single();

      if (error) {
        console.error('❌ Failed to fetch user profile:', error.message);
      } else if (profile) {
        // Update AsyncStorage with latest info
        await AsyncStorage.setItem('@student_user', JSON.stringify(profile));
        console.log('🟢 AsyncStorage refreshed with latest profile:', profile);
      }

      router.replace("/(tabs)/home");
      return;
    }

    if (!hasOpenedBefore) {
      await AsyncStorage.setItem("hasOpenedBefore", "true");
      router.replace("/(auth)/welcome");
      return;
    }

    router.replace("/(auth)/login");
  };

  init();

  return () => authListener?.subscription?.unsubscribe();
}, [router]);


  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});
