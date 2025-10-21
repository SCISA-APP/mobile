import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Bell, User } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const userName = "AgyemangDev"

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  }

  return (
    <Tabs
      screenOptions={{
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
        options={{ 
          title: '',
          headerLeft: () => (
            <View style={{ margin: "10"}}>
              <Text style={{ fontSize: 18, color: "gray" }}>{getGreeting()}</Text>
              <Text style={{ fontSize: 14, fontWeight: "200" }}>
                {userName}
              </Text>
            </View>
          ),
          headerStyle:{
            height: 120,
          },
          headerRight: ()=>(
            <View style={{flexDirection: "row", justifyContent: "center", gap: "10"}}>
              <Bell color={'#000'} size={24} />
              <View style={{marginRight: "15"}}>
              <User color={'#000'} size={24} />
              </View>
            </View>
          ),
          tabBarIcon: ({ color, size }) => 
        <Ionicons name="home" size={size} color={color} /> }}
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
