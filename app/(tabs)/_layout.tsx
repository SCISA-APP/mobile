import CustomTabBar from '@/components/navigation/CustomTabBar';
import colors from '@/constants/colors';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray[400],
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
        }}
      />

      <Tabs.Screen
        name="academics/index"
        options={{
          title: 'Academics',
        }}
      />

      <Tabs.Screen
        name="welfare"
        options={{
          title: 'Welfare',
        }}
      />

      <Tabs.Screen
        name="store/index"
        options={{
          title: 'Store',
        }}
      />

      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}
