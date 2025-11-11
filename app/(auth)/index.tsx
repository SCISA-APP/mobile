import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import colors from '../../constants/colors';
import Logo from '../../assets/images/logo.jpeg';

const WelcomeScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const checkUserState = async () => {
      try {
        // Simulate splash delay (2 seconds)
        await new Promise(resolve => setTimeout(resolve, 2000));

        const hasOpenedBefore = await AsyncStorage.getItem('hasOpenedBefore');
        const user = await AsyncStorage.getItem('user');

        if (user) {
          router.replace('/(tabs)/home'); // ✅ Logged in
        } else if (!hasOpenedBefore) {
          await AsyncStorage.setItem('hasOpenedBefore', 'true');
          router.replace('/(auth)/welcome'); // 🆕 First time
        } else {
          router.replace('/(auth)/login'); // 🔐 Not signed in
        }
      } catch (error) {
        console.error('Error checking user state:', error);
      }
    };

    checkUserState();
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  subText: {
    marginTop: 10,
    color: colors.muted,
    fontSize: 14,
  },
});
