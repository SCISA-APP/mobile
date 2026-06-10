import colors from '@/constants/colors';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

/**
 * Watches auth state and redirects to the correct route group.
 * Lives inside AuthProvider so it can read context.
 */
function AuthGuard() {
  const { firebaseUser, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Wait until Firebase has resolved

    const inAuthGroup = segments[0] === '(auth)';

    if (!firebaseUser && !inAuthGroup) {
      // Signed out but trying to access a protected screen
      router.replace('/(auth)/login');
    } else if (firebaseUser && inAuthGroup) {
      // Signed in but sitting on an auth screen
      router.replace('/(tabs)/home');
    }
  }, [firebaseUser, isLoading, segments]);

  return null;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGuard />
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.text.primary,
          headerTitleStyle: {
            fontWeight: '600',
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="(standalone)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
