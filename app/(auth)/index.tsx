import { useAuth } from '@/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, ImageStyle, StyleSheet, View, ViewStyle } from 'react-native';
import Logo from '../../assets/images/logo.jpeg';
import colors from '../../constants/colors';

const SplashScreen: React.FC = () => {
  const router = useRouter();
  const { session, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return; // Wait for Firebase to resolve auth state

    const navigate = async () => {
      // Brief splash delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (session) {
        // Already signed in — go straight to the app
        router.replace('/(tabs)/home');
        return;
      }

      // First-time launch check
      const hasOpenedBefore = await AsyncStorage.getItem('hasOpenedBefore');
      if (!hasOpenedBefore) {
        await AsyncStorage.setItem('hasOpenedBefore', 'true');
        router.replace('/(auth)/welcome');
      } else {
        router.replace('/(auth)/login');
      }
    };

    navigate();
  }, [isLoading, session]);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create<{
  container: ViewStyle;
  logo: ImageStyle;
}>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});
