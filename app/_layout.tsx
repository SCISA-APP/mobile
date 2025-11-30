import React from 'react';
import colors from '@/constants/colors';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { ShopProvider } from "@/context/ShopContext";

export default function RootLayout() {
  return (
    <> 
           <ShopProvider>
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
        {/* This is the entry point */}
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false }} 
        />
        
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
          name="category" 
          options={{
            headerBackVisible: false,
            headerBackTitle: ' ',
            headerShown: false,
            gestureEnabled: false,
          }} 
        />

        <Stack.Screen 
          name="product" 
          options={{
            headerBackVisible: false,
            headerBackTitle: ' ',
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
        
        <Stack.Screen 
          name="category/filter" 
          options={{
            headerBackVisible: false,
            headerBackTitle: ' ',
            headerShown: true,
            gestureEnabled: false,
          }} 
        />
      </Stack>
      </ShopProvider>
    </> 
  );
}