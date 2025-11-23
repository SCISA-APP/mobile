import React, { useEffect } from 'react';
import { StyleSheet, View, Image, ViewStyle, TextStyle, ImageStyle  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import colors from '../../constants/colors';
import Logo from '../../assets/images/logo.jpeg';

interface StudentUser {
  uid: string;
  fullName: string;
  email: string | null;
  permission: string;
  program: string;
  year: number;
}

const WelcomeScreen: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const checkUserState = async () => {
      try {
        // Simulate splash delay (2 seconds)
        await new Promise(resolve => setTimeout(resolve, 2000));

        const hasOpenedBefore = await AsyncStorage.getItem('hasOpenedBefore');
        const storedUser = await AsyncStorage.getItem('@student_user');

        if (storedUser) {
          const user: StudentUser = JSON.parse(storedUser);
          console.log('Returning user:', user.fullName);
          router.replace('/(tabs)/home'); // ✅ Already logged in
        } else if (!hasOpenedBefore) {
          await AsyncStorage.setItem('hasOpenedBefore', 'true');
          router.replace('/(auth)/welcome'); // 🆕 First time opening the app
        } else {
          router.replace('/(auth)/login'); // Not logged in
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

type Styles = {
  logo: StyleProp<ImageStyle>;
  container: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
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
    color: colors.black,
    fontSize: 14,
  },
});
