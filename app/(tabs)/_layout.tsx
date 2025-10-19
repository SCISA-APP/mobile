import React from 'react';
import { Tabs } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { HapticTab } from '@/components/haptic-tab';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          borderTopWidth: 0,
          elevation: 10,
          height: 60,
          paddingBottom: 8,
        },
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{ title: 'Home', tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="academics/index"
        options={{ title: 'Academics', tabBarIcon: ({ color, size }) => <MaterialIcons name="school" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="welfare/index"
        options={{ title: 'Welfare', tabBarIcon: ({ color, size }) => <FontAwesome5 name="hands-helping" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="store/index"
        options={{ title: 'Store', tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{ title: 'Profile', tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} /> }}
      />
    </Tabs>
  );
}
