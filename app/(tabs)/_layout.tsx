import { HapticTab } from '@/components/haptic-tab';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000000",
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: 'rgba(0, 0, 0, 0.1)',
          height: Platform.OS === 'ios' ? 88 : 72,
          paddingBottom: Platform.OS === 'ios' ? 24 : 16,
          paddingTop: 8,
          paddingHorizontal: 0,
          marginBottom: Platform.OS === 'android' ? 10 : 0,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600", // default weight for all tabs
          letterSpacing: -0.1,
          marginTop: 4,
        },
        tabBarButton: HapticTab,
        headerShown: true,
        headerTransparent: true,
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerTitleStyle: {
          fontSize: 34,
          fontWeight: "700",
          color: "#000000",
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
headerShown:false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={24} 
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="academics/index"
        options={{
          title: 'Academics',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "school" : "school-outline"}
              size={24}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="welfare"
        options={{
          title: 'Welfare',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 
              name="hands-helping" 
              size={20} 
              color={color}
            />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="store/index"
        options={{
          title: 'Store',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "cart" : "cart-outline"} 
              size={24} 
              color={color}
            />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"} 
              size={24} 
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
