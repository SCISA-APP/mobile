import React from 'react';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  //layout routing for auth screen 
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
        options={{ headerShown: false }}
      />
            <Stack.Screen
        name="welcome"
        options={{  headerShown: false }}
      />
      <Stack.Screen
        name="login"
        options={{ headerShown:false }}
      />
      <Stack.Screen
        name="signup"
        options={{ title: 'Sign Up' }}
      />
            <Stack.Screen
        name="forgotPassword"
        options={{ headerShown:false }}
      />
    </Stack>
  );
}
