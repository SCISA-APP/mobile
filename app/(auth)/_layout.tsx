import React from 'react';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors[colorScheme ?? 'light'].tint },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '600' },
        contentStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: 'Welcome', headerShown: false }}
      />
      <Stack.Screen
        name="login"
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name="signup"
        options={{ title: 'Sign Up' }}
      />
            <Stack.Screen
        name="forgotPassword"
        options={{ title: 'Sign Up' }}
      />
    </Stack>
  );
}
